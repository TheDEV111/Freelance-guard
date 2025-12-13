# FreelanceGuard

<div align="center">
  <img src="./freelance-frontend/public/heading image.png" alt="FreelanceGuard Platform" width="800"/>
  
  <h3>Decentralized Milestone-Based Escrow for Freelancers</h3>
  <p>Trustless payments powered by Clarity smart contracts on Stacks blockchain</p>

  [![Stacks](https://img.shields.io/badge/Stacks-Blockchain-purple)](https://www.stacks.co)
  [![Clarity](https://img.shields.io/badge/Clarity-3.0-blue)](https://docs.stacks.co/clarity)
  [![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)
  [![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)
</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Technical Architecture](#technical-architecture)
- [Business Model](#business-model)
- [Smart Contract](#smart-contract)
- [Frontend Application](#frontend-application)
- [Deployment](#deployment)
- [Getting Started](#getting-started)
- [Project Creator](#project-creator)
- [License](#license)

---

## 🎯 Overview

**FreelanceGuard** is a decentralized escrow platform that revolutionizes how freelancers and clients collaborate by eliminating trust issues through blockchain-based smart contracts. Built on the Stacks blockchain using Clarity, FreelanceGuard ensures transparent, secure, and automated milestone-based payments.

### Key Features

- ✅ **Milestone-Based Payments** - Break projects into smaller deliverables with individual payment gates
- 🔒 **Smart Contract Escrow** - Funds locked in immutable contracts until milestones are approved
- ⚖️ **Fair Dispute Resolution** - Transparent on-chain arbitration system
- 🚀 **No Middlemen** - Direct peer-to-peer transactions with minimal fees
- 🌐 **Decentralized** - Built on Stacks for Bitcoin-level security

---

## 🚨 The Problem

The freelance economy faces critical trust and payment issues:

### For Freelancers
- **Non-payment risk** - Clients disappearing after work is delivered
- **Delayed payments** - Waiting weeks or months for payment
- **Platform fees** - Up to 20% commission on traditional platforms
- **Arbitrary holds** - Platforms freezing funds without clear reason

### For Clients
- **Upfront payment risk** - Paying before seeing quality work
- **No recourse** - Limited options when deliverables don't meet expectations
- **Lack of transparency** - Unclear fee structures and payment timelines
- **Dispute resolution** - Slow, biased, or ineffective arbitration

### Market Impact
- **$1.5 trillion** global freelance market size (2024)
- **59 million** freelancers in the US alone
- **30%** of freelancers experience payment issues annually
- **Average dispute resolution**: 14-30 days on traditional platforms

---

## 💡 The Solution

FreelanceGuard leverages **blockchain technology** to create a trustless escrow system:

### How It Works

1. **Create Escrow** - Client deposits full project amount into smart contract
2. **Define Milestones** - Break project into verifiable deliverables with individual amounts
3. **Work & Submit** - Freelancer completes work and submits milestone for review
4. **Approve & Release** - Client reviews and approves, triggering automatic payment
5. **Dispute Resolution** - Independent arbitrator resolves disputes if needed

### Business Value Proposition

#### For Freelancers
- **Guaranteed payment** - Funds locked in contract before work begins
- **Instant releases** - Automatic payment upon approval
- **Protection** - Can't be ghosted or scammed
- **Minimal fees** - Only blockchain gas fees (< 1%)

#### For Clients
- **Pay for results** - Only release funds when satisfied
- **Milestone control** - Review each deliverable before payment
- **Security** - Funds refunded if freelancer fails to deliver
- **Transparency** - All transactions visible on blockchain

#### Platform Benefits
- **Zero platform risk** - Smart contracts handle all escrow logic
- **Global access** - Anyone with a Stacks wallet can participate
- **Immutable records** - All agreements permanently recorded
- **Fair arbitration** - Transparent dispute resolution process

---

## 🏗️ Technical Architecture

### Technology Stack

```
┌─────────────────────────────────────────────────────────────┐
│                       Frontend Layer                         │
│  Next.js 15 | TypeScript | Tailwind CSS | Framer Motion    │
│         Stacks Connect | @stacks/transactions               │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    Blockchain Layer                          │
│              Stacks Blockchain (Bitcoin L2)                  │
│                   Clarity Smart Contracts                    │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      Settlement Layer                        │
│                    Bitcoin Blockchain                        │
└─────────────────────────────────────────────────────────────┘
```

### System Architecture

```
Frontend (Next.js)
    │
    ├─ Stacks Connect (Wallet Auth)
    │
    ├─ @stacks/transactions (Contract Calls)
    │       │
    │       ↓
    │   Stacks RPC Node
    │       │
    │       ↓
    └─ Clarity Smart Contract (escrow.clar)
            │
            ├─ escrows (data map)
            ├─ milestones (data map)
            ├─ disputes (data map)
            │
            └─ Functions:
                ├─ create-escrow
                ├─ add-milestone
                ├─ submit-milestone
                ├─ approve-milestone
                ├─ reject-milestone
                ├─ raise-dispute
                ├─ resolve-dispute
                └─ cancel-escrow
```

---

## 📜 Smart Contract

### Contract Details

- **Language**: Clarity 3.0
- **Blockchain**: Stacks (Bitcoin Layer 2)
- **Contract Size**: 579 lines
- **Functions**: 8 public, 2 read-only helpers

### Deployed Contracts

| Network | Contract Address | Explorer |
|---------|------------------|----------|
| **Testnet** | `STVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2BKDND68.escrow` | [View](https://explorer.hiro.so/txid/STVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2BKDND68.escrow?chain=testnet) |
| **Mainnet** | `SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.escrow` | [View](https://explorer.hiro.so/txid/SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.escrow?chain=mainnet) |

### Core Functions

```clarity
;; Create new escrow with milestones
(create-escrow (client principal) (freelancer principal) 
               (title string) (description string) 
               (total-amount uint) (deadline uint))

;; Freelancer submits completed milestone
(submit-milestone (escrow-id uint) (milestone-id uint) 
                  (submission-notes string))

;; Client approves and releases payment
(approve-milestone (escrow-id uint) (milestone-id uint))

;; Client rejects with feedback
(reject-milestone (escrow-id uint) (milestone-id uint) 
                  (rejection-reason string))

;; Either party can raise dispute
(raise-dispute (escrow-id uint) (milestone-id uint) (reason string))

;; Arbitrator resolves dispute
(resolve-dispute (dispute-id uint) (resolution string) 
                 (client-refund-amount uint) 
                 (freelancer-payment-amount uint))
```

### Security Features

- ✅ **Authorization checks** - Only relevant parties can call functions
- ✅ **State validation** - Prevents invalid state transitions
- ✅ **Atomic operations** - All-or-nothing transaction execution
- ✅ **Immutable code** - Contract cannot be modified after deployment
- ✅ **Event logging** - All actions emit events for transparency

---

## 💻 Frontend Application

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Wallet**: Stacks Connect
- **Blockchain**: @stacks/transactions

### Key Pages

1. **Home** - Landing page with product information
2. **Dashboard** - User overview of active escrows
3. **Escrows** - List and manage all escrow agreements
4. **Disputes** - View and participate in dispute resolution
5. **Create Escrow** - Form to create new escrow agreements

### Responsive Design

All components are fully responsive across screen sizes:
- 📱 **xs** (< 640px) - Mobile
- 📱 **sm** (640px+) - Large phones
- 📲 **md** (768px+) - Tablets
- 💻 **lg** (1024px+) - Laptops
- 🖥️ **xl** (1280px+) - Desktops
- 🖥️ **2xl** (1536px+) - Large screens

---

## 💼 Business Model

### Revenue Streams

1. **Transaction Fees** (Future)
   - Optional 0.5% platform fee on escrow releases
   - Premium features (priority support, advanced analytics)

2. **Arbitration Services**
   - Fee for dispute resolution (split between platform and arbitrator)
   - Tiered pricing based on escrow value

3. **Enterprise Plans**
   - Custom contracts for large organizations
   - Multi-user accounts with role management
   - API access for integration

### Market Opportunity

| Segment | Market Size | Target Share | Revenue Potential |
|---------|-------------|--------------|-------------------|
| Individual Freelancers | $1.2T/year | 0.1% | $1.2B |
| Agencies | $300B/year | 0.5% | $1.5B |
| Enterprises | $500B/year | 1% | $5B |

### Competitive Advantages

1. **Decentralization** - No platform can freeze or control funds
2. **Bitcoin Security** - Leverages Bitcoin's security through Stacks
3. **Low Fees** - Only blockchain gas fees vs. 10-20% platform fees
4. **Transparency** - All transactions verifiable on-chain
5. **Global Access** - No KYC requirements, anyone can participate

---

## 🚀 Deployment

### Smart Contract Deployment

Both testnet and mainnet contracts are deployed and verified:

```bash
# Testnet
Cost: 0.157630 STX
Status: ✅ Confirmed

# Mainnet  
Cost: 0.157630 STX
Status: ✅ Confirmed
```

### Frontend Deployment

```bash
cd freelance-frontend
npm install
npm run build
npm start
```

**Environment Variables:**
```env
NEXT_PUBLIC_NETWORK=mainnet
NEXT_PUBLIC_ENABLE_MAINNET=true
NEXT_PUBLIC_APP_NAME=FreelanceGuard
NEXT_PUBLIC_APP_URL=https://freelanceguard.com
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Stacks wallet (Hiro Wallet or Xverse)
- Testnet STX tokens (for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TheDEV111/Freelance-guard.git
   cd Freelance-guard
   ```

2. **Install smart contract dependencies**
   ```bash
   cd freelance-smart-contract
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../freelance-frontend
   npm install
   ```

4. **Configure environment**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your settings
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open browser**
   ```
   http://localhost:3000
   ```

### Testing Smart Contract

```bash
cd freelance-smart-contract
clarinet test
```

### Deploy Smart Contract

```bash
# Testnet
clarinet deployments generate --testnet
clarinet deployments apply --testnet

# Mainnet
clarinet deployments generate --mainnet
clarinet deployments apply --mainnet
```

---

## 👨‍💻 Project Creator

<div align="center">
  <img src="https://github.com/TheDEV111.png" width="100" height="100" style="border-radius: 50%"/>
  
  ### Henry Agukwe
  
  **Blockchain Developer & Entrepreneur**
  
  [![GitHub](https://img.shields.io/badge/GitHub-TheDEV111-black?logo=github)](https://github.com/TheDEV111)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin)](https://linkedin.com/in/henry-agukwe)
  [![Twitter](https://img.shields.io/badge/Twitter-Follow-blue?logo=twitter)](https://twitter.com/henryagukwe)
</div>

Henry Agukwe is the visionary behind FreelanceGuard, bringing together expertise in blockchain development, smart contract engineering, and a deep understanding of freelance market dynamics. With a passion for solving real-world problems through decentralized technology, Henry architected FreelanceGuard to bridge the trust gap in the gig economy.

**Vision**: To create a world where freelancers and clients can collaborate without fear of fraud, delays, or unfair treatment—powered by transparent, immutable smart contracts.

---

## 📊 Project Structure

```
Freelance-guard/
├── freelance-smart-contract/          # Clarity smart contracts
│   ├── contracts/
│   │   └── escrow.clar               # Main escrow contract
│   ├── tests/
│   │   └── escrow.test.ts            # Contract tests
│   ├── settings/
│   │   ├── Testnet.toml              # Testnet config
│   │   └── Mainnet.toml              # Mainnet config
│   └── deployments/                   # Deployment plans
│
├── freelance-frontend/                # Next.js frontend
│   ├── app/                          # App router pages
│   ├── components/                   # React components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Stats.tsx
│   │   ├── AboutUs.tsx
│   │   ├── FAQ.tsx
│   │   └── Footer.tsx
│   ├── lib/                          # Utilities
│   │   ├── wallet.ts                # Wallet integration
│   │   ├── contract.ts              # Contract interactions
│   │   ├── stacks-config.ts         # Network config
│   │   └── utils.ts                 # Helper functions
│   ├── types/                        # TypeScript types
│   └── public/                       # Static assets
│
├── PRD.md                            # Product Requirements
├── DEPLOYMENT.md                     # Deployment guide
└── README.md                         # This file
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Stacks Foundation** - For building Bitcoin L2 infrastructure
- **Clarity Language** - For secure smart contract development
- **Next.js Team** - For the amazing React framework
- **Hiro** - For Stacks development tools and wallet

---

## 📞 Contact & Support

- **Email**: support@freelanceguard.com
- **Twitter**: [@freelanceguard](https://twitter.com/freelanceguard)
- **Discord**: [Join our community](https://discord.gg/freelanceguard)
- **Documentation**: [docs.freelanceguard.com](https://docs.freelanceguard.com)

---

<div align="center">
  <strong>Built with ❤️ by Henry Agukwe</strong>
  
  <p>Empowering freelancers through blockchain technology</p>
  
  ⭐ Star this repo if you find it useful!
</div>
