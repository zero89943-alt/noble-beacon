# Contributing to Noble Beacon

Thank you for considering a contribution to the Noble Beacon. Every seed planted here has the potential to grow into something that strengthens life for generations.

## The Archive Firewall

All contributions pass through the **Archive Firewall** — a human-governed review process that ensures nothing enters the archive without careful consideration. This is not bureaucracy; it is stewardship.

```
Your Contribution → Quarantine → Agent Parsing → Warding Check → Re'Kai Review → Archive
```

## Types of Contributions

Every contribution must identify itself as one of the following:

| Type | Definition | Example |
| :--- | :--- | :--- |
| **Archive** | Verified knowledge or established fact | Historical research, proven protocols |
| **Inference** | Logical conclusion drawn from archive material | "If X is true, then Y follows" |
| **Imagination** | Creative exploration or speculative design | New module concepts, art, music |
| **Proposal** | A specific change to existing systems | "Replace algorithm X with Y because..." |
| **Critique** | Constructive challenge to existing material | "This assumption is flawed because..." |

## How to Contribute

### Step 1: Fork and Branch

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR-USERNAME/noble-beacon.git
cd noble-beacon
git checkout -b seed/your-contribution-name
```

Branch naming convention: `seed/short-descriptive-name`

### Step 2: Make Your Contribution

Place your work in the appropriate directory:

| If your contribution is... | Place it in... |
| :--- | :--- |
| Browser extension code | `tracks/browser-extension/` |
| Mesh network firmware/docs | `tracks/mesh-network/` |
| Hardware key designs | `tracks/shade-key/` |
| Pod device work | `tracks/vibe-pods/` |
| Core engine/ledger logic | `tracks/nexus-core/` |
| Archive content | `archive/seeds/` |
| Documentation | `docs/` |

### Step 3: Include Metadata

Every contribution must include a metadata header (in a comment or frontmatter):

```yaml
---
contributor: Your Name or Handle
date: YYYY-MM-DD
type: Archive | Inference | Imagination | Proposal | Critique
track: browser-extension | mesh-network | shade-key | vibe-pods | nexus-core | archive | docs
summary: One sentence describing what this is.
reasoning: Why this matters to the project.
risks: What could go wrong if this is adopted.
---
```

### Step 4: Submit a Pull Request

Push your branch and open a Pull Request. The PR template will guide you through the required fields.

### Step 5: Review Process

A Re'Kai reviewer (human) will:
1. Acknowledge receipt within 72 hours
2. Run the contribution through Warding checks (risk assessment)
3. Discuss with you if changes are needed
4. Approve and merge, or explain why it cannot be accepted

## Code Standards

### For Software Contributions

- **Browser Extension**: JavaScript/TypeScript, Manifest V3, no external analytics or tracking
- **Mesh Network**: C/C++ for ESP32, Arduino framework preferred for accessibility
- **Shade Key**: Rust or C for firmware, open-source FIDO2 compliance
- **Nexus Core**: Rust preferred, with clear documentation of all cryptographic choices

### For All Code

- Comment your reasoning, not just your logic
- No telemetry, no analytics, no phone-home behavior
- All dependencies must be auditable (no minified blobs)
- Tests are appreciated but not required for initial contributions

## Non-Code Contributions

We actively encourage contributions that are not code:

- **Writing**: Archive volumes, educational content, translations
- **Design**: UI mockups, iconography, sacred geometry patterns
- **Research**: Academic papers, legal analysis, technical feasibility studies
- **Hardware**: Schematics, PCB layouts, antenna designs, enclosure models
- **Testing**: Field reports, security audits, usability feedback

## Community Standards

- **Encourage the outlandish.** The most creative ideas are welcome here.
- **Zero tolerance for bullying.** Disagree with ideas, never with people.
- **No extraction.** Do not use contributions to build proprietary products.
- **Patience is a virtue.** Reviews take time. The archive is not in a hurry.
- **Credit is sacred.** Attribution is permanent and non-removable.

## Questions?

Open a Discussion in the "Questions" category, or reach out via the channels listed in the README.

---

*Let the seed be found, but let the ledger be plain.*
