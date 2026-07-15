# Track: Shade Key (Physical Authentication)

**Priority:** P1 — Near-Term  
**Status:** Concept Phase  
**Lead:** Seeking Volunteer

---

## Purpose

The Shade Key is a sovereign hardware authentication device — a physical key that unlocks PC computer stations, signs Source Ledger transfers, and triggers the Panic Protocol. It replaces passwords, biometrics, and cloud-based authentication with something you physically hold and can physically destroy.

## Core Principles

- **Physical Sovereignty**: If you hold the key, you hold the authority. No cloud, no server, no intermediary.
- **Air-Gap Security**: The key never connects to the internet. It communicates only via USB-C or NFC.
- **Panic Protocol**: A specific button sequence triggers instant key erasure — all secrets destroyed in milliseconds.
- **Right to Repair**: Open hardware, replaceable battery, user-serviceable firmware.

## Hardware Specification

| Component | Specification | Purpose |
|-----------|--------------|---------|
| MCU | STM32L4 (secure element) | Cryptographic operations |
| Interface | USB-C + NFC | PC connection, tap-to-sign |
| Storage | Secure EEPROM (encrypted) | Key material, identity |
| Display | OLED 0.96" monochrome | Transaction confirmation |
| Input | 3 tactile buttons | Confirm, reject, panic |
| Power | CR2032 coin cell | NFC operations when unplugged |
| Enclosure | Titanium/Aluminum | Durability, Faraday shielding |

## Use Cases

| Scenario | Mechanism | Description |
|----------|-----------|-------------|
| PC Station Unlock | USB-C insert | Key authenticates user, decrypts local vault |
| Source Ledger Signing | Button confirm | Sign transfers, verify provenance |
| Archive Contribution | NFC tap | Sign seeds with steward identity |
| Emergency Erasure | Panic sequence | 3-button hold: destroy all key material |
| Dead Man's Switch | Timer expiry | Auto-erase if not authenticated within N days |
| Inheritance Transfer | Ceremony mode | Transfer key authority to designated heir |

## Security Architecture

```
┌─────────────────────────────────────────┐
│  Application Layer                       │
│  ├── Station Unlock (FIDO2/WebAuthn)    │
│  ├── Ledger Signing (Ed25519)           │
│  └── Panic Protocol (Secure Erase)      │
├─────────────────────────────────────────┤
│  Cryptographic Layer                     │
│  ├── Key Derivation (Argon2id)          │
│  ├── Signatures (Ed25519/Schnorr)       │
│  └── Encryption (ChaCha20-Poly1305)     │
├─────────────────────────────────────────┤
│  Hardware Security                       │
│  ├── Secure Element (tamper-detect)     │
│  ├── Side-Channel Resistance            │
│  └── Physical Tamper Evidence           │
└─────────────────────────────────────────┘
```

## Firmware Architecture

```
shade-key/
├── firmware/
│   ├── src/
│   │   ├── main.c               # Entry, state machine
│   │   ├── crypto/              # Ed25519, Argon2id, ChaCha20
│   │   ├── usb/                 # USB-C HID, FIDO2
│   │   ├── nfc/                 # NFC-A tag emulation
│   │   ├── display/             # OLED driver, confirmation UI
│   │   ├── panic/               # Secure erase, dead man's switch
│   │   └── storage/             # Encrypted EEPROM operations
│   └── tests/                   # Hardware-in-the-loop tests
├── hardware/
│   ├── schematics/              # KiCad project
│   ├── gerbers/                 # PCB files
│   ├── enclosure/               # 3D printable case (STEP/STL)
│   └── bom.csv                  # Bill of materials
└── docs/
    ├── threat-model.md          # Security analysis
    ├── ceremony-protocol.md     # Key generation, inheritance
    └── panic-protocol.md        # Emergency procedures
```

## How to Contribute

1. Read the [CONTRIBUTING.md](../../CONTRIBUTING.md) guide
2. Check [Issues](https://github.com/zero89943-alt/noble-beacon/issues) labeled `track:shade-key`
3. Security researchers: start with the threat model review
4. Hardware contributors: start with the schematic review and BOM audit
5. Firmware contributors: start with the FIDO2 implementation

## Compatibility Targets

- **FIDO2/WebAuthn**: Works as a standard security key for any website
- **OpenPGP**: Can store and use GPG keys for email/file encryption
- **SSH**: Hardware-backed SSH key authentication
- **Source Ledger**: Native signing for Noble Beacon provenance chains

## Open Questions

- Should we support Bluetooth as an alternative to NFC for mobile use?
- What is the optimal Panic Protocol trigger (button combo vs. accelerometer)?
- How do we handle firmware updates without compromising the air-gap?
- Should the key support multiple identities (personal, professional, anonymous)?
