# Track: Beacon Browser Extension

**Priority:** P0 — Immediate  
**Status:** Design Phase  
**Lead:** Seeking Volunteer

---

## Purpose

The Beacon Browser Extension is the primary interface between the Noble Beacon archive and the wider internet. It provides privacy-first discovery, seed verification, and Source Ledger interaction without requiring users to visit a centralized website.

## Core Principles

- **Zero Telemetry**: No analytics, no tracking, no fingerprinting. The extension does not phone home.
- **Local-First**: All verification happens on-device. The extension works offline once synced.
- **Sovereign Identity**: Users control their keys. No accounts, no passwords, no cloud dependency.

## Planned Features

| Feature | Description | Priority |
|---------|-------------|----------|
| Archive Reader | Browse and search the Fe'Kai archive offline | P0 |
| Seed Verifier | Verify Source Ledger provenance chains for any digital item | P0 |
| Ward Detector | Highlight hidden power patterns (dark patterns, invisible trackers) on any webpage | P1 |
| Mesh Bridge | Connect to nearby Lumen mesh nodes via WebBluetooth | P2 |
| Glyph Overlay | Display Fe'Kai glyph translations on hover | P2 |

## Technical Stack

- **Manifest V3** (Chrome/Firefox/Edge compatible)
- **TypeScript** with strict mode
- **Zero external dependencies** for the core — no React, no frameworks
- **IndexedDB** for local archive storage
- **Web Crypto API** for key management and verification
- **WebBluetooth** (optional) for Lumen mesh bridge

## Architecture

```
beacon-extension/
├── manifest.json
├── background/          # Service worker — handles mesh sync, key management
├── content/             # Content scripts — Ward Detector, Glyph Overlay
├── popup/               # Popup UI — Archive Reader, Seed Verifier
├── options/             # Settings — key export, mesh config
├── lib/
│   ├── crypto/          # Source Ledger verification, ZKP stubs
│   ├── archive/         # Local archive index and search
│   └── mesh/            # Lumen WebBluetooth bridge
└── assets/              # Icons, glyphs, Fe'Kai symbols
```

## How to Contribute

1. Read the [CONTRIBUTING.md](../../CONTRIBUTING.md) guide
2. Check the [Issues](https://github.com/zero89943-alt/noble-beacon/issues) labeled `track:browser-extension`
3. Start with `good-first-issue` tasks — typically UI components or documentation
4. For architecture decisions, open a `[PR] Proposal` issue first

## Security Requirements

- All cryptographic operations must use the Web Crypto API (no polyfills)
- No external network requests without explicit user consent
- All stored data must be encrypted at rest using user-derived keys
- The extension must pass the Panic Protocol test: instant data erasure on trigger

## Open Questions

- Should the extension support Tor/I2P routing for mesh sync?
- How do we handle archive updates without revealing user identity?
- What is the minimum viable Ward Detector ruleset?
