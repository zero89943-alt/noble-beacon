# Noble Beacon Roadmap

This document outlines the strategic priorities and development timeline for the Noble Beacon project. It is a living document that evolves as the community grows and new stewards join.

---

## Philosophy of Rollout

Noble Beacon follows a **progressive revelation** strategy. New features and capabilities are introduced gradually — like breadcrumbs for the intellectually curious — fostering a communal feeling of exploration, discovery, and shared excitement. The repository should remain sparse yet inviting, encouraging contributors to check back regularly for subtle changes.

---

## Phase 1: Foundation (Current — Q3 2026)

The immediate priority is establishing the technical scaffolding that allows volunteers to begin meaningful work.

### Browser Extension (P0)

The **Beacon Browser Extension** is the project's most accessible entry point — a tool that any user can install to interact with the Noble Beacon ecosystem from their existing browser.

| Milestone | Description | Status |
| :--- | :--- | :--- |
| Manifest V3 scaffold | Basic extension structure with popup UI | Planned |
| Seed Viewer | Display and verify archive seeds | Planned |
| Source Ledger connector | View provenance chains for digital items | Planned |
| Privacy dashboard | Show what data the extension does NOT collect | Planned |
| Offline archive cache | Store seeds locally for off-grid access | Planned |

**Technical Direction**: Built on Manifest V3 (Chrome/Firefox compatible), zero external dependencies for core functionality, all cryptographic operations performed locally. No analytics, no telemetry, no tracking of any kind.

### LoRa Mesh Network (P0)

The **Lumen Mesh Network** is the physical backbone — enabling communication and archive synchronization without internet infrastructure.

| Milestone | Description | Status |
| :--- | :--- | :--- |
| 2-node proof of concept | ESP32 + LoRa basic message relay | Planned |
| Multi-hop routing | Messages traverse 3+ nodes | Planned |
| Archive sync protocol | Distribute seed updates across mesh | Planned |
| Solar power integration | Self-sustaining node design | Planned |
| Community deployment guide | How to set up a local mesh | Planned |

**Technical Direction**: Based on ESP32 microcontrollers with LoRa radio modules (SX1276/SX1262). Inspired by Meshtastic and LoRaMesher but purpose-built for archive distribution. All firmware open-source under copyleft license.

---

## Phase 2: Sovereignty (Q4 2026)

### Shade Key — Physical Authentication (P1)

The **Shade Key** is a physical USB device that serves as the steward's sovereign identity. It unlocks PC computer stations, signs transfers on the Source Ledger, and triggers the Panic Protocol for emergency data erasure.

| Milestone | Description | Status |
| :--- | :--- | :--- |
| FIDO2 firmware on dev board | Basic authentication on Nitrokey/SoloKey hardware | Planned |
| Custom PCB design | Purpose-built board with secure element | Planned |
| Panic Protocol trigger | Physical button for emergency erasure | Planned |
| Source Ledger signing | Sign ownership transfers with hardware key | Planned |
| 3D-printable enclosure | Open-source case design | Planned |

**Technical Direction**: Built on open-source FIDO2 firmware (Nitrokey or SoloKeys as reference). Secure element for key storage. USB-A and USB-C variants. The key must function without internet access — all verification is local or mesh-based.

### Nexus Core — Source Ledger (P1)

The **Source Ledger** is the decentralized registry for digital ownership, enabling real ownership and resale of all digital items.

| Milestone | Description | Status |
| :--- | :--- | :--- |
| Provenance chain data structure | Define the immutable ownership record format | Planned |
| Zero-knowledge proof integration | Verify ownership without revealing identity | Planned |
| Transfer handshake protocol | Peer-to-peer ownership transfer | Planned |
| Anti-duplication watermark | Cryptographic authenticity verification | Planned |
| Creator's Covenant enforcement | Automatic royalty distribution on resale | Planned |

---

## Phase 3: Education and Access (Q1 2027)

### Vibe Pod Devices (P2)

Minimalist, E-ink portable interfaces for offline archive access. These are the "books" of the Noble Beacon — low-power, distraction-free reading devices.

| Milestone | Description | Status |
| :--- | :--- | :--- |
| E-ink display driver | Basic text rendering on e-paper | Planned |
| Archive reader application | Navigate and read seeds offline | Planned |
| Mesh network integration | Receive updates via LoRa | Planned |
| Solar charging circuit | Self-sustaining power | Planned |

### Ether Education Protocol (P2)

Free, censorship-resistant education delivered through the sovereign stack.

| Milestone | Description | Status |
| :--- | :--- | :--- |
| Reason module | Logic, fallacies, critical thinking | Planned |
| Harmony module | Music, rhythm, pattern recognition | Planned |
| Literacy module | Rhetoric, persuasion, anti-manipulation | Planned |
| Memory module | Spaced repetition, cultural heritage | Planned |
| Resilience module | Craft, repair, land stewardship | Planned |

---

## Phase 4: Medical and Advanced (Q2 2027+)

### Medical Modules (P3)

Offline health sovereignty — emergency protocols, first aid databases, and wellness tracking that never leaves the steward's device.

### Vagus Metronome (P3)

A haptic device for nervous system synchronization, based on infrasound resonance research.

---

## How Priorities Are Determined

Priorities are assigned based on:

1. **Impact**: How many stewards does this serve?
2. **Independence**: Can this function without the other components?
3. **Accessibility**: Can volunteers begin work immediately?
4. **Sovereignty**: Does this reduce dependence on external systems?

The Browser Extension and Mesh Network are P0 because they are both high-impact and immediately actionable — a developer can begin contributing today with standard tools and hardware.

---

## Contributing to the Roadmap

This roadmap is not dictated from above. If you believe a priority should shift, open a Discussion or submit a Proposal-type contribution explaining your reasoning. The Re'Kai review process applies to roadmap changes as well.

---

*May our works become forests. May our laws become gardens.*
