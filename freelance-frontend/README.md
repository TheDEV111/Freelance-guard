# FreelanceGuard Frontend

Next.js 15 frontend for the FreelanceGuard decentralized escrow platform built on Stacks blockchain.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Stacks Connect** - Wallet authentication
- **@stacks/transactions** - Smart contract interactions

## Project Structure

```
freelance-frontend/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components (empty - awaiting UI build)
├── lib/                   # Utility functions and configurations
│   ├── contract.ts       # Smart contract interaction functions
│   ├── wallet.ts         # Stacks Connect wallet integration
│   ├── stacks-config.ts  # Network configuration
│   ├── utils.ts          # General utility functions
│   └── env.ts            # Environment variables
├── types/                 # TypeScript type definitions
│   └── contract.ts       # Smart contract types
└── public/               # Static assets
```

## Smart Contract Integration

The frontend is configured to interact with the deployed FreelanceGuard escrow contracts:

- **Testnet**: `STVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2BKDND68.escrow`
- **Mainnet**: `SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.escrow`

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_ENABLE_MAINNET=false
NEXT_PUBLIC_APP_NAME=FreelanceGuard
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Available Contract Functions

### Write Functions (Transactions)

- `createEscrow()` - Create new escrow agreement
- `addMilestone()` - Add milestone to escrow
- `submitMilestone()` - Submit milestone work
- `approveMilestone()` - Approve submitted milestone
- `rejectMilestone()` - Reject submitted milestone
- `raiseDispute()` - Raise dispute for milestone
- `resolveDispute()` - Resolve dispute (arbitrator)
- `cancelEscrow()` - Cancel active escrow

### Read Functions (No transaction)

- `getEscrow()` - Get escrow details
- `getMilestone()` - Get milestone details
- `getDispute()` - Get dispute details
- `getEscrowMilestoneCount()` - Get milestone count

## Next Steps

1. Build UI components for each screen
2. Implement wallet connection flow
3. Create dashboard views for clients and freelancers
4. Build escrow creation form
5. Implement milestone management interface
6. Add dispute resolution interface
7. Create transaction history view

## License

Part of the FreelanceGuard project.

