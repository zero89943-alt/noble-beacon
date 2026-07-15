# Track: Lumen Mesh Network

**Priority:** P0 — Immediate  
**Status:** Research Phase  
**Lead:** Seeking Volunteer

---

## Purpose

Lumen is the off-grid communication backbone of Noble Beacon. It provides resilient, censorship-resistant peer-to-peer messaging and data synchronization using LoRa radio modules. When the internet fails — or is deliberately shut down — Lumen keeps communities connected.

## Core Principles

- **Off-Grid First**: Operates without internet, cellular, or Wi-Fi infrastructure.
- **Mesh Topology**: Every node is both client and relay. No central servers.
- **Low Power**: Runs on solar, battery, or hand-crank power for weeks.
- **Open Hardware**: All schematics, firmware, and protocols are public domain.

## Hardware Specification

| Component | Specification | Purpose |
|-----------|--------------|---------|
| MCU | ESP32-S3 | Processing, BLE bridge |
| Radio | SX1276/SX1262 LoRa | Long-range mesh communication |
| Display | E-ink 2.13" (optional) | Status, messages, glyphs |
| Storage | MicroSD slot | Archive cache, message queue |
| Power | LiPo 3000mAh + solar panel | Off-grid operation |
| Enclosure | IP67 weatherproof | Outdoor deployment |

## Network Protocol

```
┌─────────────────────────────────────────────────┐
│  Application Layer: Archive Sync, Messages, EEP │
├─────────────────────────────────────────────────┤
│  Transport Layer: Fragmentation, ACK, Priority  │
├─────────────────────────────────────────────────┤
│  Network Layer: Mesh Routing, Flood Control     │
├─────────────────────────────────────────────────┤
│  Link Layer: LoRa Modulation, FEC, AES-256      │
├─────────────────────────────────────────────────┤
│  Physical Layer: 868/915 MHz ISM Band           │
└─────────────────────────────────────────────────┘
```

## Planned Features

| Feature | Description | Priority |
|---------|-------------|----------|
| Text Messaging | Encrypted P2P and group messages | P0 |
| Archive Sync | Distribute archive updates across mesh | P0 |
| EEP Delivery | Ether Education Protocol lesson distribution | P1 |
| Emergency Beacon | Panic Protocol broadcast, distress signals | P1 |
| Sensor Network | Environmental monitoring (air, water, soil) | P2 |
| Voice Relay | Low-bandwidth voice messaging via codec2 | P2 |

## Firmware Architecture

```
lumen-firmware/
├── src/
│   ├── main.cpp              # Entry point, task scheduler
│   ├── radio/                # LoRa driver, packet handling
│   ├── mesh/                 # Routing protocol, peer discovery
│   ├── crypto/               # AES-256, key exchange, signatures
│   ├── storage/              # SD card, archive index
│   ├── display/              # E-ink driver, glyph rendering
│   ├── power/                # Sleep management, solar charging
│   └── bridge/               # BLE bridge to phone/browser
├── hardware/
│   ├── schematics/           # KiCad project files
│   ├── gerbers/              # PCB manufacturing files
│   └── bom.csv              # Bill of materials
└── docs/
    ├── protocol-spec.md      # Full protocol specification
    └── deployment-guide.md   # How to set up a mesh network
```

## How to Contribute

1. Read the [CONTRIBUTING.md](../../CONTRIBUTING.md) guide
2. Check [Issues](https://github.com/zero89943-alt/noble-beacon/issues) labeled `track:lumen-mesh`
3. Hardware contributors: start with the BOM review and schematic audit
4. Firmware contributors: start with the radio driver or mesh routing
5. For protocol changes, open a `[PR] Proposal` issue first

## Range & Performance Targets

| Scenario | Target Range | Data Rate |
|----------|-------------|-----------|
| Urban (line of sight) | 2-5 km | 1.2 kbps |
| Rural (elevated node) | 10-15 km | 0.3 kbps |
| Forest/Dense cover | 500m-2 km | 0.3 kbps |
| Emergency beacon | 20+ km | Minimal |

## Open Questions

- What is the optimal mesh routing algorithm for sparse, mobile nodes?
- How do we handle firmware updates securely over the mesh?
- Should we support Meshtastic compatibility or build a custom protocol?
- What is the minimum node density for reliable coverage?
