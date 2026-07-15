# Track: Vibe Pods (Sovereign Devices)

**Priority:** P2 — Medium-Term  
**Status:** Concept Phase  
**Lead:** Seeking Volunteer

---

## Purpose

Vibe Pods are minimalist, sovereign computing devices designed for focused interaction with the Noble Beacon ecosystem. They reject the attention-harvesting model of smartphones in favour of calm, intentional interfaces that respect human cognition and nervous system health.

## Core Principles

- **Calm Technology**: No notifications, no infinite scroll, no dopamine hooks.
- **E-Ink First**: Reflective displays that work in sunlight and don't disrupt circadian rhythm.
- **Single-Purpose Modes**: Each mode does one thing well. No multitasking temptation.
- **Mesh-Native**: Connects to Lumen network. Works without internet.

## Device Variants

| Variant | Form Factor | Primary Use | Display |
|---------|-------------|-------------|---------|
| Pod Reader | E-reader sized | Archive reading, EEP lessons | 6" E-ink |
| Pod Pulse | Wristband | Vagus metronome, mesh alerts | 1.5" E-ink |
| Pod Scribe | Tablet sized | Writing, sketching, composition | 10" E-ink |
| Pod Station | Desktop | Full archive access, PC unlock | 13" E-ink + keyboard |

## Pod Reader Specification

| Component | Specification | Purpose |
|-----------|--------------|---------|
| Display | 6" E-ink 300dpi | Reading, glyphs |
| MCU | ESP32-S3 | Processing, mesh |
| Radio | LoRa SX1262 + BLE | Mesh + Shade Key |
| Storage | 32GB eMMC | Full archive cache |
| Battery | 3000mAh LiPo | Weeks of reading |
| Input | 3 buttons + capacitive | Page turn, mode switch |
| Audio | Bone conduction transducer | EEP audio lessons |

## Vagus Metronome (Pod Pulse)

The Pod Pulse includes a haptic motor calibrated to vagal nerve stimulation frequencies:

- **Coherence Mode**: 6 breaths/minute (0.1 Hz) — optimal heart rate variability
- **Calm Mode**: 4.5 breaths/minute — deep parasympathetic activation
- **Alert Mode**: 8 breaths/minute — focused attention without stress
- **Emergency Mode**: Rapid pulse — mesh emergency broadcast received

## Software Architecture

```
vibe-pod/
├── firmware/
│   ├── src/
│   │   ├── main.c               # Entry, mode manager
│   │   ├── display/             # E-ink driver, font rendering
│   │   ├── reader/              # Archive browser, EEP player
│   │   ├── mesh/                # Lumen integration
│   │   ├── metronome/           # Vagus nerve stimulation patterns
│   │   ├── auth/                # Shade Key BLE bridge
│   │   └── power/               # Deep sleep, solar charging
│   └── assets/
│       ├── fonts/               # Fe'Kai glyphs, reading fonts
│       └── lessons/             # Cached EEP content
├── hardware/
│   ├── pod-reader/              # Reader variant schematics
│   ├── pod-pulse/               # Wristband variant schematics
│   └── shared/                  # Common modules (radio, power)
└── docs/
    ├── interaction-design.md    # UX philosophy and patterns
    └── medical-disclaimer.md   # Vagus stimulation safety info
```

## How to Contribute

1. Read the [CONTRIBUTING.md](../../CONTRIBUTING.md) guide
2. Check [Issues](https://github.com/zero89943-alt/noble-beacon/issues) labeled `track:vibe-pods`
3. Industrial designers: propose enclosure concepts
4. Firmware developers: start with the E-ink driver or mesh integration
5. UX researchers: propose calm technology interaction patterns

## Medical Safety (Vagus Metronome)

The Pod Pulse vagus metronome is a **wellness device**, not a medical device. It provides guided breathing patterns only. It does not diagnose, treat, or cure any condition. Users with cardiac conditions, epilepsy, or implanted devices should consult a physician before use.

## Open Questions

- What is the optimal E-ink refresh strategy for reading vs. interactive use?
- Should Pod Station support a full Linux environment or remain single-purpose?
- How do we handle firmware updates without internet (mesh-only OTA)?
- What accessibility features are essential for the initial release?
