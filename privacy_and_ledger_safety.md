# Noble Beacon: Sovereign Privacy & Ledger Safety

This document establishes the privacy frameworks, safety precautions, and End-User License Agreement (EULA) principles for the **Noble Beacon** project, specifically addressing the **Shade** module and ledger usage.

## 1. The Sovereign EULA Principles
Unlike traditional EULAs that harvest data, the Noble Beacon EULA is a **Mutual Defense Pact** between the developer and the steward.

| Principle | Traditional EULA | Sovereign EULA |
| :--- | :--- | :--- |
| **Accountability** | Provider avoids all liability. | Shared responsibility for system integrity. |
| **Data Rights** | Provider owns/monetizes data. | User has absolute sovereignty over data. |
| **Updates** | Forced, often invasive. | Opt-in, human-in-the-loop verification. |
| **Termination** | Provider can revoke access. | User can exit with full data portability. |

### Key Clauses for the Noble Beacon
*   **The Non-Extraction Clause**: The software is prohibited from transmitting any personal metadata or ledger content to external servers without explicit, per-event human approval.
*   **The Right to Repair & Fork**: Users are legally and technically empowered to modify the software to suit their sanctuary's needs.
*   **The Auditability Mandate**: All ledger protocols must be open-source and inspectable to ensure no "hidden masters" or backdoors exist.

## 2. Ledger Safety Precautions
To maintain the **Anti-Panopticon** design, the following safety measures are hard-coded into the **Shade** module.

### Data Minimization and Obfuscation
*   **Off-Chain Personal Data**: No personal identifying information (PII) is ever stored directly on the ledger. The ledger only stores cryptographic hashes (references) to local, encrypted files.
*   **Zero-Knowledge Proofs (ZKPs)**: Used to verify transactions or identities without revealing the underlying data.
*   **Ephemeral Metadata**: Transaction metadata (timestamps, node IDs) is automatically scrubbed or randomized after consensus is reached to prevent pattern analysis.

### Hardware-Level Safeguards
*   **The Panic Protocol**: A physical trigger (or specific software sequence) that instantly overwrites cryptographic keys, rendering the local ledger unreadable in the event of a breach.
*   **Bring-Your-Own-Key (BYOK)**: The system never generates or stores master keys on behalf of the user. Keys are generated locally and remain under the steward's physical control.
*   **Air-Gap Compatibility**: The ledger is designed to sync via physical "Dead Drops" (USB/SD) or LoRa mesh, allowing the most sensitive archives to remain entirely disconnected from the internet.

## 3. The "Shade" Privacy Protocol
The **Shade** module acts as the invisible shield for the steward's digital life.

> "Privacy is not the power to hide; it is the power to choose what we reveal." — *The Shade Manifesto*

1.  **Consent-First Sync**: Every data exchange between nodes requires a manual "Handshake" or pre-configured "Trust Threshold."
2.  **Audit Trails for the User**: The system maintains a local, immutable log of *who* accessed *what* data and *when*, providing the user with a complete audit of their own device's activity.
3.  **De-Indexing Rights**: Users can "prune" their local branch of the mesh, ensuring that their presence does not leave a permanent, searchable trail in the wider network once they choose to exit.
