# NB-OS: Noble Beacon Operating System

**Version:** 0.1-alpha | **Codename:** Lantern | **License:** GPLv3 (Copyleft, Sovereign)

> "The smallest flame illuminates the deepest dark."

---

## I. Mission Statement

NB-OS is a sovereign Linux distribution designed to run on hardware ranging from the ESP32-S3 microcontroller (512KB SRAM, 8MB PSRAM) to full desktop workstations. It achieves this through a **tiered architecture** with real-time decompression, delivering robust desktop capabilities from the tiniest possible storage footprint. Every component is inspectable, repairable, and transferable — embodying the Noble Beacon's Five Repair Freedoms.

---

## II. Design Principles

| Principle | Implementation |
| :--- | :--- |
| **Sovereignty** | No telemetry, no phoning home, no binary blobs. Every byte is auditable. |
| **Compression-First** | All binaries and assets stored compressed; decompressed on-demand into RAM via EROFS/LZ4. |
| **Tiered Scaling** | Same codebase scales from 4MB (ESP32 headless) to 256MB (full desktop with visualizer). |
| **Mesh-Native** | LoRa/Meshtastic integration at the kernel level, not bolted on as an afterthought. |
| **Org-Mode Native** | Plain-text structured data as the primary interface paradigm. |
| **Repair by Default** | Full source tree ships with the OS. `nb-repair` rebuilds any component from source on-device. |

---

## III. Architecture Overview

### A. The Three Tiers

NB-OS operates in three tiers, each a strict superset of the one below. The build system produces all three from a single configuration tree.

| Tier | Target Hardware | Compressed Size | RAM Required | Interface |
| :--- | :--- | :--- | :--- | :--- |
| **Tier 0: Ember** | ESP32-S3, ESP32-C3 (RISC-V) | 4–8 MB | 512KB–8MB | Serial/UART, LoRa mesh relay, org-mode CLI |
| **Tier 1: Flame** | Raspberry Pi Zero, Pine64, old laptops | 16–32 MB | 64–256MB | Framebuffer console, Sway/Wayland, CAVA visualizer |
| **Tier 2: Beacon** | Desktop/laptop, x86_64/ARM64 | 64–256 MB | 256MB–2GB | Full Wayland desktop, PipeWire audio, CAVA visualizer, mesh dashboard |

### B. Core Stack (All Tiers)

```
┌─────────────────────────────────────────────────────────┐
│                    NB-OS Userspace                        │
│  ┌─────────┐ ┌──────────┐ ┌─────────┐ ┌─────────────┐ │
│  │ BusyBox │ │ Org-Mode │ │  Mesh   │ │   Shade     │ │
│  │  (musl) │ │  Engine  │ │ Daemon  │ │  (Crypto)   │ │
│  └─────────┘ └──────────┘ └─────────┘ └─────────────┘ │
├─────────────────────────────────────────────────────────┤
│              EROFS + LZ4 Real-Time Decompression         │
├─────────────────────────────────────────────────────────┤
│              Linux Kernel (Custom Minimal Config)         │
│              + LoRa Driver + FIDO2 + Crypto               │
├─────────────────────────────────────────────────────────┤
│              Hardware (ESP32 → x86_64/ARM64)              │
└─────────────────────────────────────────────────────────┘
```

---

## IV. Real-Time Decompression Engine

The core innovation of NB-OS is its **compression-first filesystem strategy**. The entire userspace is stored compressed and decompressed on-the-fly as pages are accessed, meaning the OS occupies a fraction of its functional size on disk while performing at near-native speed in RAM.

### A. Filesystem Layer: EROFS + LZ4

**EROFS** (Enhanced Read-Only File System) was chosen over SquashFS for the following reasons [1] [2]:

| Feature | EROFS | SquashFS | CramFS |
| :--- | :--- | :--- | :--- |
| Random access decompression | Fixed-size output blocks | Variable blocks | No |
| Decompression latency | ~2μs per 4KB page (LZ4) | ~8μs per block | N/A |
| Metadata overhead | Minimal (inline xattrs) | Moderate | High |
| Kernel support | Mainline since 4.19 | Mainline | Mainline |
| Android/embedded adoption | Default in Android 12+ | Legacy | Deprecated |

The key advantage is **fixed-size output block decompression** — EROFS decompresses exactly the 4KB page requested, never more. This eliminates the "read amplification" problem that plagues SquashFS on constrained devices.

### B. Compression Algorithm: LZ4 (with ZSTD fallback)

| Algorithm | Decompression Speed | Compression Ratio | CPU Cost |
| :--- | :--- | :--- | :--- |
| **LZ4** (primary) | 4.5 GB/s per core | ~2.1:1 | Negligible |
| **ZSTD** (cold storage) | 1.5 GB/s per core | ~2.8:1 | Low |
| XZ (not used) | 200 MB/s per core | ~3.2:1 | High |

LZ4 is the default for all hot-path data because its decompression speed exceeds typical storage read speeds — meaning decompression is effectively "free" since the CPU finishes before the next I/O request arrives.

### C. Memory Strategy: ZRAM Swap

For Tier 0 (ESP32) and Tier 1 (Pi Zero) devices, physical RAM is supplemented with **ZRAM** — a compressed block device in RAM that acts as swap space. With LZ4 compression, ZRAM typically achieves 2–3x effective memory expansion [3]:

```
Physical RAM: 8MB (ESP32-S3 PSRAM)
ZRAM compressed swap: +16MB effective
Total usable memory: ~24MB effective
```

### D. Overlay Filesystem for Writes

Since EROFS is read-only, NB-OS uses an **OverlayFS** layer for user modifications:

```
┌───────────────────────────┐
│     OverlayFS (merged)    │  ← What the user sees
├───────────────────────────┤
│  Upper: tmpfs or ext4     │  ← User writes (org files, config)
│  Lower: EROFS (compressed)│  ← System (read-only, compressed)
└───────────────────────────┘
```

User data (org-mode files, mesh keys, personal config) lives in the writable upper layer, stored on MicroSD or flash. System binaries remain compressed and immutable — a natural defense against tampering.

---

## V. Tier 0: Ember (ESP32 Target)

### A. How Linux Runs on ESP32

The ESP32-S3 and ESP32-C3 (RISC-V) can run Linux through a **RISC-V emulator** or natively on the C3's RISC-V core [4]. The approach:

1. **ESP32-C3 (native RISC-V)**: Direct Linux kernel boot with custom MMU-less configuration (NOMMU Linux). The kernel is stripped to ~800KB compressed.
2. **ESP32-S3 (Xtensa)**: Runs a lightweight RISC-V emulator that boots a minimal Linux environment. Performance is limited but sufficient for CLI, mesh relay, and org-mode.

### B. Ember Feature Set

| Component | Size (Compressed) | Function |
| :--- | :--- | :--- |
| Linux kernel (NOMMU) | ~800 KB | Process management, networking, LoRa driver |
| BusyBox (musl-linked) | ~400 KB | Shell, coreutils, vi, awk, sed |
| Org-mode engine (C) | ~200 KB | Parse/render/edit .org files |
| Mesh daemon (Lumen) | ~300 KB | LoRa mesh relay, message routing |
| Shade crypto library | ~150 KB | Ed25519 signing, AES-256, FIDO2 challenge |
| EROFS rootfs | ~2 MB | Complete userspace |
| **Total** | **~4 MB** | Full sovereign node |

### C. ESP32 Ember Use Cases

The Ember tier transforms any ESP32 into a sovereign mesh node capable of relaying messages, storing encrypted org-mode notes, authenticating via Shade Key, and operating entirely off-grid on solar power. It is the "seed" that can be planted anywhere.

---

## VI. Tier 1: Flame (Single-Board Computer Target)

### A. Flame Feature Set

Building on Ember, the Flame tier adds a graphical interface via the Linux framebuffer and Wayland:

| Component | Size (Compressed) | Function |
| :--- | :--- | :--- |
| Ember base | ~4 MB | All Tier 0 capabilities |
| Sway (Wayland compositor) | ~3 MB | Tiling window manager, minimal dependencies |
| Foot terminal | ~500 KB | GPU-accelerated Wayland terminal |
| CAVA visualizer | ~200 KB | Real-time audio spectrum visualization |
| PipeWire (minimal) | ~2 MB | Low-latency audio routing |
| Nerd Fonts subset | ~1 MB | Sacred geometry glyphs, org-mode icons |
| Ether Education reader | ~2 MB | Offline curriculum browser |
| E-ink driver (optional) | ~500 KB | Direct framebuffer for E-ink displays |
| **Total** | **~16 MB** | Graphical sovereign workstation |

### B. The Visualizer: CAVA Integration

CAVA (Console Audio Visualizer for ALSA) [5] is integrated as a first-class citizen, not an afterthought. In NB-OS, the visualizer serves a philosophical purpose — it makes the system's "pulse" visible, connecting the Civic Nervous System metaphor to a tangible, living display.

**Configuration:**

```ini
# /etc/nb-os/cava.conf
[general]
framerate = 60
bars = 34                    # Fibonacci number
bar_width = 3
bar_spacing = 1

[color]
gradient = 1
gradient_count = 5
gradient_color_1 = '#1a1205'  # Deep earth
gradient_color_2 = '#3d2b0a'  # Warm amber
gradient_color_3 = '#c6a15b'  # Noble gold (brand color)
gradient_color_4 = '#e8d5a3'  # Light gold
gradient_color_5 = '#ffffff'  # Pure light

[smoothing]
monstercat = 1               # Smooth wave motion
noise_reduction = 77         # Clean signal

[input]
method = pipewire
source = auto
```

The visualizer responds to:
- **Mesh activity**: Incoming LoRa packets trigger visual pulses
- **System health**: CPU/memory mapped to frequency bands
- **Vagus Metronome sync**: Haptic pulse rhythm visualized as a breathing wave
- **Music/audio**: Standard spectrum analysis for any audio source

### C. Sway Window Manager Configuration

Sway is configured with golden ratio proportions for window splits:

```
# /etc/nb-os/sway/config
# Golden ratio split: 61.8% / 38.2%
default_orientation horizontal
for_window [app_id=".*"] split toggle

# Fibonacci spiral layout
set $golden 0.618
gaps inner 8
gaps outer 5

# Noble Beacon keybindings
bindsym $mod+o exec nb-org          # Open org-mode
bindsym $mod+m exec nb-mesh-status  # Mesh dashboard
bindsym $mod+v exec nb-visualizer   # Toggle CAVA
bindsym $mod+s exec nb-shade-lock   # Shade Key lock

# Status bar with mesh node count and visualizer
bar {
    status_command nb-status
    colors {
        background #0d0a05
        statusline #c6a15b
        focused_workspace #c6a15b #1a1205 #c6a15b
    }
}
```

---

## VII. Tier 2: Beacon (Full Desktop Target)

### A. Beacon Feature Set

The full desktop experience, still remarkably small:

| Component | Size (Compressed) | Function |
| :--- | :--- | :--- |
| Flame base | ~16 MB | All Tier 0+1 capabilities |
| Firefox ESR (stripped) | ~80 MB | Web browser (for Source Ledger, Ether Education) |
| LibreOffice Writer (minimal) | ~40 MB | Document editing (org-mode export target) |
| GIMP (minimal) | ~30 MB | Image editing for archive contributions |
| MPV media player | ~5 MB | Video/audio playback |
| NB-Dashboard | ~3 MB | Full mesh network visualization, node map |
| Source Ledger client | ~5 MB | Provenance chain browser and verification |
| Ether Education suite | ~10 MB | Full five-strand curriculum with exercises |
| Development tools (gcc, make) | ~50 MB | Self-hosting capability (repair from source) |
| **Total** | **~250 MB** | Complete sovereign desktop |

### B. Desktop Visualizer: Full-Screen Mode

On Tier 2, the CAVA visualizer can run as a full Wayland surface behind all windows, creating a living, breathing desktop background that responds to system activity and audio:

```
┌─────────────────────────────────────────┐
│  ┌─────────────┐  ┌──────────────────┐  │
│  │  Org-Mode   │  │   Mesh Dashboard │  │
│  │  Editor     │  │   (node map)     │  │
│  │             │  │                  │  │
│  └─────────────┘  └──────────────────┘  │
│  ▁▂▃▅▆▇█▇▆▅▃▂▁▂▃▅▆▇█▇▆▅▃▂▁▂▃▅▆▇█▇▆▅  │  ← CAVA visualizer layer
│  ▁▂▃▄▅▆▇█▇▆▅▄▃▂▁▂▃▄▅▆▇█▇▆▅▄▃▂▁▂▃▄▅▆  │
└─────────────────────────────────────────┘
```

---

## VIII. Org-Mode Engine

### A. Native Implementation

Rather than requiring Emacs (which would violate the minimal footprint goal), NB-OS includes a purpose-built **org-mode engine** written in C, linked against musl libc:

| Feature | Supported | Notes |
| :--- | :--- | :--- |
| Headings (unlimited depth) | Yes | Collapsible in TUI |
| TODO/DONE states | Yes | Custom states: SEED/GROWING/THRIVING/ARCHIVED |
| Tags and properties | Yes | Used for mesh routing metadata |
| Tables | Yes | Aligned, sortable |
| Links (internal/external) | Yes | `[[mesh://node-id/file.org]]` protocol |
| Code blocks | Yes | Syntax highlighting for 12 languages |
| Export (HTML, plain text) | Yes | For Ether Education rendering |
| Agenda/scheduling | Yes | Integrated with system cron |
| Encryption (per-heading) | Yes | AES-256-GCM via Shade module |

### B. Mesh-Aware Org Protocol

NB-OS extends org-mode with a `mesh://` link protocol that resolves files across the LoRa network:

```org
* Archive Seeds
** [[mesh://node-7a3f/seeds/first-lantern.org][First Lantern Seed]]
   :PROPERTIES:
   :AUTHOR: Re'Kai
   :SIGNED: ed25519:a7b3c9...
   :PROVENANCE: source-ledger://tx/0x4f2a...
   :END:

** TODO Propagate to 3 nearest nodes
   SCHEDULED: <2026-07-20 Mon>
   - [ ] Node Alpha (2.3km, signal: -87dBm)
   - [ ] Node Beta (4.1km, signal: -92dBm)
   - [ ] Node Gamma (6.7km, signal: -101dBm)
```

---

## IX. Mesh Networking (Lumen Daemon)

### A. Architecture

The Lumen daemon handles all LoRa mesh communication, compatible with Meshtastic protocol [6] but extended with Noble Beacon-specific features:

```
┌─────────────────────────────────┐
│         Application Layer        │
│  (Org sync, Ether Ed, Chat)     │
├─────────────────────────────────┤
│         Lumen Protocol           │
│  (Routing, Encryption, Sync)    │
├─────────────────────────────────┤
│         LoRa Physical Layer      │
│  (SX1262/SX1276 via SPI)       │
└─────────────────────────────────┘
```

### B. Mesh Features

| Feature | Description |
| :--- | :--- |
| **Store-and-forward** | Nodes cache messages for offline peers |
| **Org-file sync** | Replicate org headings tagged `:mesh-share:` across network |
| **Seed propagation** | Archive seeds auto-replicate to nearest N nodes |
| **Emergency broadcast** | Panic Protocol triggers network-wide alert |
| **Node discovery** | Automatic peer detection with signal strength mapping |
| **Encrypted channels** | Per-channel AES-256 keys, rotated via Shade module |

---

## X. Shade Security Module

### A. FIDO2 Physical Key Integration

The Shade Key (a 3D-printable FIDO2 authenticator) integrates at the kernel level:

| Function | Implementation |
| :--- | :--- |
| Boot authentication | Kernel checks Shade Key presence before mounting upper OverlayFS |
| Session lock/unlock | Sway locks when key is removed, unlocks on reinsert |
| Mesh identity | Ed25519 keypair stored on key's secure element |
| Panic Protocol | Triple-press triggers immediate ZRAM wipe + OverlayFS destruction |
| PC Station unlock | Shade Key + PIN unlocks shared community workstations |

### B. The Panic Protocol (Hardware Implementation)

```
Triple-press Shade Key button (within 2 seconds):
  1. ZRAM swap immediately zeroed (all decompressed pages lost)
  2. OverlayFS upper layer (user data) overwritten with random bytes
  3. Mesh daemon broadcasts "node-dark" signal to peers
  4. System halts with blank screen
  5. Next boot: clean Ember state, no trace of previous session
```

---

## XI. Build System

### A. Buildroot Configuration

NB-OS uses **Buildroot** [7] as its build system, with custom packages for Noble Beacon components:

```
nb-os/
├── buildroot/                    # Buildroot submodule
├── configs/
│   ├── nb_ember_esp32c3_defconfig   # Tier 0: ESP32-C3
│   ├── nb_ember_esp32s3_defconfig   # Tier 0: ESP32-S3 (emulated)
│   ├── nb_flame_rpi0_defconfig      # Tier 1: Raspberry Pi Zero
│   ├── nb_flame_pine64_defconfig    # Tier 1: Pine64
│   ├── nb_beacon_x86_64_defconfig   # Tier 2: Desktop x86_64
│   └── nb_beacon_aarch64_defconfig  # Tier 2: Desktop ARM64
├── packages/
│   ├── nb-org/                      # Org-mode engine
│   ├── nb-lumen/                    # Mesh daemon
│   ├── nb-shade/                    # Crypto/FIDO2 module
│   ├── nb-visualizer/               # CAVA config + integration
│   ├── nb-ether-ed/                 # Education curriculum
│   └── nb-dashboard/                # Mesh visualization
├── overlays/
│   ├── ember/                       # Tier 0 filesystem overlay
│   ├── flame/                       # Tier 1 filesystem overlay
│   └── beacon/                      # Tier 2 filesystem overlay
├── kernel/
│   ├── nb_minimal.config            # Stripped kernel config
│   └── patches/                     # LoRa driver, FIDO2 patches
└── scripts/
    ├── build-all.sh                 # Build all tiers
    ├── flash-esp32.sh               # Flash Ember to ESP32
    └── create-iso.sh                # Create bootable ISO (Tier 2)
```

### B. Build Commands

```bash
# Build Tier 0 (Ember) for ESP32-C3
make nb_ember_esp32c3_defconfig
make -j$(nproc)
# Output: output/images/nb-ember-esp32c3.bin (4.2MB)

# Build Tier 1 (Flame) for Raspberry Pi Zero
make nb_flame_rpi0_defconfig
make -j$(nproc)
# Output: output/images/nb-flame-rpi0.img (18MB)

# Build Tier 2 (Beacon) for x86_64
make nb_beacon_x86_64_defconfig
make -j$(nproc)
# Output: output/images/nb-beacon-x86_64.iso (240MB)
```

---

## XII. Boot Sequence

### A. Tier 0 (ESP32) Boot

```
Power On → ESP32 ROM Bootloader → NB-OS Bootloader (256 bytes)
  → Decompress kernel from flash (LZ4, ~800KB → ~2MB)
  → Mount EROFS rootfs from flash
  → Init: start Lumen mesh daemon
  → Init: start Shade crypto service
  → Init: start org-mode TUI (if display attached)
  → Ready (boot time: ~3 seconds)
```

### B. Tier 2 (Desktop) Boot

```
UEFI/BIOS → GRUB (minimal) → Linux Kernel (compressed, ~4MB)
  → initramfs: detect hardware, load drivers
  → Mount EROFS root (compressed, read-only)
  → Mount OverlayFS upper (user data, writable)
  → Start ZRAM swap (2x physical RAM effective)
  → Authenticate Shade Key (if present)
  → Start PipeWire audio
  → Start Sway compositor
  → Start CAVA visualizer (background layer)
  → Start Lumen mesh daemon
  → Ready (boot time: ~8 seconds on SSD)
```

---

## XIII. The Visualizer in Detail

### A. Philosophy

The visualizer is not decoration — it is the **Civic Nervous System made visible**. Just as the human body's autonomic nervous system operates below conscious awareness but can be observed through heart rate and breathing, NB-OS's visualizer reveals the system's living state.

### B. Visualization Modes

| Mode | Trigger | Visual Pattern |
| :--- | :--- | :--- |
| **Idle Breath** | No activity | Slow sine wave at vagal breathing rate (6 breaths/min) |
| **Mesh Pulse** | LoRa packet received | Sharp spike in golden color, decays over 2 seconds |
| **Audio Spectrum** | Music/speech playing | Standard FFT spectrum with 34 bars (Fibonacci) |
| **Seed Propagation** | Org file synced to mesh | Expanding golden rings from center |
| **Panic** | Shade Key triple-press | Red flash, then immediate black |
| **Education** | Ether Ed lesson active | Gentle blue-white waves, calming |

### C. Sacred Geometry in the Visualizer

The bar count (34) is a Fibonacci number. The bar widths follow a golden ratio distribution from center outward. The gradient colors map to the Noble Beacon's palette. The refresh rate (60fps) divides evenly into the vagal breathing rate (6/min = 0.1Hz), creating a subtle visual entrainment effect.

---

## XIV. Ether Education Integration

The Ether Education Protocol runs natively on all tiers:

| Tier | Delivery Method | Content |
| :--- | :--- | :--- |
| **Ember** | Org-mode plain text via mesh | Text-based lessons, exercises, quizzes |
| **Flame** | Rendered HTML in terminal browser | Formatted lessons with diagrams (ASCII art) |
| **Beacon** | Full browser-based curriculum | Interactive lessons, video, visualizations |

Curriculum is stored as compressed org-mode files in the EROFS rootfs, totaling ~5MB for all five strands (Logic, Harmony, Literacy, Memory, Resilience). New lessons propagate via the mesh network — when a node receives an updated curriculum file, it automatically syncs to peers.

---

## XV. Security Model

| Layer | Mechanism | Purpose |
| :--- | :--- | :--- |
| Boot | Shade Key authentication | Prevent unauthorized access |
| Filesystem | EROFS (immutable) + OverlayFS | Tamper-resistant system, writable user data |
| Memory | ZRAM (volatile) | No persistent swap artifacts |
| Network | Per-channel AES-256 | Encrypted mesh communication |
| Identity | Ed25519 on Shade Key secure element | Unforgeable node identity |
| Erasure | Panic Protocol | Complete data destruction in <2 seconds |
| Provenance | Source Ledger integration | Every file's origin is cryptographically verifiable |

---

## XVI. Comparison with Existing Distributions

| Distribution | Compressed Size | Desktop | Mesh | Org-Mode | Visualizer | ESP32 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **NB-OS Ember** | **4 MB** | No | **Yes** | **Yes** | No | **Yes** |
| **NB-OS Flame** | **16 MB** | **Yes** | **Yes** | **Yes** | **Yes** | No |
| **NB-OS Beacon** | **250 MB** | **Yes** | **Yes** | **Yes** | **Yes** | No |
| Tiny Core Linux | 16 MB | Yes | No | No | No | No |
| Alpine Linux | 130 MB | Yes | No | No | No | No |
| Puppy Linux | 300 MB | Yes | No | No | No | No |
| Debian Minimal | 500 MB | Yes | No | No | No | No |

---

## XVII. Development Roadmap

| Phase | Target | Deliverable |
| :--- | :--- | :--- |
| **Phase 1** (Q3 2026) | Ember prototype | Bootable ESP32-C3 image with BusyBox + Lumen |
| **Phase 2** (Q4 2026) | Flame prototype | Raspberry Pi Zero image with Sway + CAVA |
| **Phase 3** (Q1 2027) | Beacon alpha | x86_64 ISO with full desktop + mesh dashboard |
| **Phase 4** (Q2 2027) | Org-mode engine | Native C implementation, mesh-aware links |
| **Phase 5** (Q3 2027) | Shade Key integration | FIDO2 boot auth, Panic Protocol |
| **Phase 6** (Q4 2027) | Ether Education | Full curriculum integrated, mesh-distributed |

---

## XVIII. How to Contribute

NB-OS development is tracked in the Noble Beacon repository under `tracks/nb-os/`. Contributors are needed for:

| Role | Skills Required | First Task |
| :--- | :--- | :--- |
| **Kernel Engineer** | Linux kernel config, driver development | Strip kernel to <1MB for ESP32-C3 |
| **Buildroot Packager** | Cross-compilation, package management | Create `nb-org` Buildroot package |
| **Embedded Developer** | ESP32, RISC-V, LoRa SPI drivers | Boot Linux on ESP32-C3 with LoRa |
| **Wayland Developer** | Sway, wlroots, Wayland protocols | Configure golden-ratio tiling layout |
| **Audio Engineer** | PipeWire, CAVA, DSP | Implement mesh-reactive visualizer modes |
| **Cryptographer** | FIDO2, Ed25519, AES-256 | Implement Shade Key boot authentication |
| **Curriculum Designer** | Education, org-mode | Write first Ether Education lesson set |

---

## XIX. Philosophical Alignment

Every technical decision in NB-OS maps to a Noble Beacon principle:

| Technical Choice | Philosophical Principle |
| :--- | :--- |
| EROFS (read-only root) | "What remains thriving is the measure" — the system endures |
| OverlayFS (writable user layer) | "Stewardship before ownership" — you shape your space |
| LZ4 decompression | "The smallest flame illuminates" — minimal footprint, maximum reach |
| Mesh-native networking | "Shield before sword" — community resilience over individual power |
| Source ships with OS | "Right to Repair" — you can always rebuild |
| CAVA visualizer | "The Civic Nervous System" — the system breathes, visibly |
| Shade Key + Panic Protocol | "Sovereignty" — your data dies with your consent alone |
| Org-mode native | "Plain text is eternal" — no proprietary formats, no lock-in |

---

## References

[1]: https://docs.kernel.org/filesystems/erofs.html "EROFS — Enhanced Read-Only File System (Linux Kernel Documentation)"
[2]: https://source.android.com/docs/core/architecture/kernel/erofs "EROFS — Android Open Source Project"
[3]: https://circuitcellar.com/research-design-hub/basics-of-design/zram-in-embedded-linux/ "ZRAM in Embedded Linux — Circuit Cellar"
[4]: https://github.com/nodestark/esp32-running-linux "ESP32 Running Linux — RISC-V Emulator (GitHub)"
[5]: https://github.com/karlstav/cava "CAVA — Cross-platform Audio Visualizer for ALSA (GitHub)"
[6]: https://meshtastic.org/docs/getting-started/ "Meshtastic — LoRa Mesh Network Getting Started"
[7]: https://buildroot.org/ "Buildroot — Making Embedded Linux Easy"
