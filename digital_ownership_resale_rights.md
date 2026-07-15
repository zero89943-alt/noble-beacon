# Noble Beacon: Digital Ownership & Resale Rights

This document establishes the legal and technical framework by which the Noble Beacon project guarantees **real ownership** and the **right to resale** of all digital items created, earned, or acquired within its ecosystem.

## 1. The Problem with Traditional Digital "Ownership"

Traditional software End-User License Agreements (EULAs) grant users a **revocable license**, not ownership. This means that digital books, music, game items, and software can be unilaterally removed by the provider at any time. The user pays full price but receives only conditional access. The Noble Beacon rejects this model entirely.

> "If you cannot sell it, gift it, or pass it to your children, you do not own it. You rent it from a landlord who can change the locks." — *The Steward's Oath on Digital Property*

## 2. The Sovereign Ownership Model

Under the Noble Beacon framework, every digital artifact—whether a **Seed**, a **Source Card**, a **Craft Module**, or a piece of **Archival Media**—is treated as tangible property with full transferability rights.

| Right | Description |
| :--- | :--- |
| **Right to Possess** | The item exists on the steward's local device, not on a remote server. |
| **Right to Use** | No online verification or "phone home" is required to access the item. |
| **Right to Transfer** | The steward may gift, sell, or bequeath the item to any other person. |
| **Right to Resale** | The steward may sell the item on any marketplace, including the Source Ledger. |
| **Right to Modify** | The steward may alter the item for personal use (Right to Repair). |
| **Right to Destroy** | The steward may permanently delete the item from existence. |

## 3. Technical Implementation via the Source Ledger

The **Source Ledger** is the Noble Beacon's decentralized registry for digital ownership. It operates on the following principles.

### Provenance Chain
Every digital item carries a cryptographic **Provenance Chain**—an immutable record of its creation, every transfer, and its current steward. This chain is stored locally on the steward's device and can be verified by any node on the mesh without revealing personal identity (via Zero-Knowledge Proofs).

### Transfer Protocol
When a steward wishes to sell or gift an item, the transfer is executed through a simple **Handshake Protocol**. The sender's node signs the transfer with their private key, the receiver's node countersigns, and the Provenance Chain is updated on both local ledgers. No central authority is required to approve the transaction.

### Anti-Duplication Watermark
To prevent unauthorized copying while preserving the Right to Repair, each item carries a **Stewardship Watermark**—a cryptographic signature embedded in the item's metadata that proves authenticity without restricting legitimate use. If an item is duplicated without a valid transfer, the watermark reveals the forgery.

## 4. The Creator's Covenant

Creators who contribute items to the Noble Beacon ecosystem agree to the **Creator's Covenant**, which ensures that their work is respected while granting stewards full ownership rights.

| Covenant Term | Effect |
| :--- | :--- |
| **First Sale Doctrine** | Once sold or gifted, the creator relinquishes control over the item's future transfers. |
| **Attribution Right** | The creator's name remains permanently attached to the Provenance Chain as the originator. |
| **No Revocation** | The creator cannot remotely disable, delete, or alter an item after transfer. |
| **Optional Royalty** | Creators may embed a voluntary royalty percentage (capped at 10%) into the Provenance Chain, paid automatically on resale via the Source Ledger. |

## 5. Integration with the Platinum Standard

Digital items within the Noble Beacon are not speculative assets. Their value is anchored to the **Platinum Standard**—the project's commodity-backed economic model. Items may be priced in **Commodity Seeds** (units of real-world value tied to platinum reserves), ensuring that digital ownership has tangible economic meaning rather than inflated speculative worth.

## 6. Safety Precautions for Stewards

The following precautions protect stewards during ownership and transfer.

### Backup and Recovery
All owned items are stored locally with encrypted backups. The steward's **Shade Module** manages key recovery through a **Seed Phrase** system, ensuring that loss of a device does not mean loss of property.

### Dispute Resolution
In the event of a contested transfer, the **Archive Firewall** (human-in-the-loop) serves as the final arbiter. Disputes are resolved by examining the Provenance Chain and the cryptographic signatures of both parties.

### Exit Rights
If a steward chooses to leave the Noble Beacon ecosystem entirely, they retain full ownership of all items. Items can be exported in open formats and their Provenance Chains remain valid indefinitely, even outside the mesh.
