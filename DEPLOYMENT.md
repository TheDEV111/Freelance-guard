# FreelanceGuard Smart Contract Deployment

## Overview

The FreelanceGuard escrow smart contract has been successfully deployed to both Stacks Testnet and Mainnet. This document provides all deployment details and contract addresses for interacting with the deployed contracts.

## Deployment Details

### Testnet Deployment

- **Network**: Stacks Testnet
- **Contract Address**: `STVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2BKDND68.escrow`
- **Contract Name**: `escrow`
- **Deployment Cost**: 0.157630 STX
- **Clarity Version**: 3.0
- **Epoch**: 3.0
- **RPC Endpoint**: https://api.testnet.hiro.so
- **Deployment Date**: December 12, 2025

#### Testnet Explorer Links
- **Contract**: https://explorer.hiro.so/txid/STVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2BKDND68.escrow?chain=testnet
- **Account**: https://explorer.hiro.so/address/STVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2BKDND68?chain=testnet

---

### Mainnet Deployment

- **Network**: Stacks Mainnet
- **Contract Address**: `SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.escrow`
- **Contract Name**: `escrow`
- **Deployment Cost**: 0.157630 STX
- **Clarity Version**: 3.0
- **Epoch**: 3.0
- **RPC Endpoint**: https://api.hiro.so
- **Deployment Date**: December 12, 2025

#### Mainnet Explorer Links
- **Contract**: https://explorer.hiro.so/txid/SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.escrow?chain=mainnet
- **Account**: https://explorer.hiro.so/address/SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F?chain=mainnet

---

## Contract Functions

The deployed escrow contract provides the following public functions:

### Core Functions

1. **create-escrow**
   - Creates a new escrow agreement between client and freelancer
   - Parameters: `client`, `freelancer`, `title`, `description`, `total-amount`, `deadline`

2. **add-milestone**
   - Adds a milestone to an existing escrow
   - Parameters: `escrow-id`, `description`, `amount`, `deadline`

3. **submit-milestone**
   - Freelancer submits work for a milestone
   - Parameters: `escrow-id`, `milestone-id`, `submission-notes`

4. **approve-milestone**
   - Client approves a submitted milestone and releases payment
   - Parameters: `escrow-id`, `milestone-id`

5. **reject-milestone**
   - Client rejects a submitted milestone with feedback
   - Parameters: `escrow-id`, `milestone-id`, `rejection-reason`

6. **raise-dispute**
   - Either party can raise a dispute for a milestone
   - Parameters: `escrow-id`, `milestone-id`, `reason`

7. **resolve-dispute**
   - Contract owner resolves a dispute
   - Parameters: `dispute-id`, `resolution`, `client-refund-amount`, `freelancer-payment-amount`

8. **cancel-escrow**
   - Cancels an active escrow and refunds the client
   - Parameters: `escrow-id`

### Read-Only Functions

- **get-escrow**: Retrieve escrow details by ID
- **get-milestone**: Retrieve milestone details by escrow and milestone ID
- **get-dispute**: Retrieve dispute details by dispute ID
- **get-escrow-milestone-count**: Get the number of milestones for an escrow

---

## Integration Guide

### Using @stacks/transactions

```typescript
import { makeContractCall, AnchorMode, PostConditionMode } from '@stacks/transactions';
import { StacksTestnet, StacksMainnet } from '@stacks/network';

// Testnet example
const network = new StacksTestnet();
const contractAddress = 'STVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2BKDND68';

// Mainnet example
// const network = new StacksMainnet();
// const contractAddress = 'SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F';

const txOptions = {
  contractAddress,
  contractName: 'escrow',
  functionName: 'create-escrow',
  functionArgs: [/* your function arguments */],
  network,
  anchorMode: AnchorMode.Any,
  postConditionMode: PostConditionMode.Deny,
  // ... other options
};

const transaction = await makeContractCall(txOptions);
```

### Using Clarinet SDK

```typescript
import { Cl } from '@stacks/transactions';

// In your test or script
const response = simnet.callPublicFn(
  'escrow',
  'create-escrow',
  [
    Cl.principal('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'),  // client
    Cl.principal('ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG'),  // freelancer
    Cl.stringAscii('Website Development'),  // title
    Cl.stringAscii('Build a responsive website'),  // description
    Cl.uint(5000000000),  // total-amount in microSTX
    Cl.uint(1000)  // deadline in blocks
  ],
  deployer
);
```

---

## Security Considerations

1. **Access Control**: All functions implement proper authorization checks
2. **Fund Safety**: STX is held securely in the contract until milestone approval
3. **Dispute Resolution**: Contract owner can arbitrate disputes fairly
4. **Deadline Enforcement**: Escrows must have future deadlines
5. **Input Validation**: All string inputs and amounts are validated

---

## Support & Documentation

- **GitHub Repository**: https://github.com/TheDEV111/Freelance-guard
- **Stacks Documentation**: https://docs.stacks.co
- **Clarity Language Reference**: https://docs.stacks.co/clarity

---

## Version History

| Version | Date | Network | Contract Address |
|---------|------|---------|------------------|
| 1.0.0 | Dec 12, 2025 | Testnet | STVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2BKDND68.escrow |
| 1.0.0 | Dec 12, 2025 | Mainnet | SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.escrow |

---

## License

This smart contract is part of the FreelanceGuard project. See the main repository for license details.
