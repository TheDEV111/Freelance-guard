Here is the full **PRD rewritten cleanly in Markdown**, with explicit mention that the MVP must use **Stacks Connect** and **@stacks/transactions**.

---

# **FreelanceGuard — Decentralized Milestone-Based Escrow for Freelancers**

### **Product Requirements Document (PRD)**

### **Tech Stack: Clarity + Next.js + Stacks Connect + @stacks/transactions**

---

## **1. Product Overview**

**FreelanceGuard** is a decentralized escrow platform built on **Stacks** using **Clarity smart contracts** and a **Next.js frontend**.
It enables freelancers and clients to collaborate through **trustless milestone-based payments**, eliminating fraud and slow dispute resolution.

Funds are locked in a smart contract and only released when milestones are approved. Arbitration is performed transparently on-chain.

---

## **2. Problem Statement**

Freelancers and clients often struggle to trust each other due to:

* Up-front payment risks
* Non-payment after delivery
* High platform fees
* Arbitrary payment holds
* Inefficient dispute resolution

**FreelanceGuard** solves these issues using Web3 smart-contract controlled escrow and milestone validation.

---

## **3. Product Goals**

1. Build a decentralized escrow system using **Clarity**, **Stacks Connect**, and **@stacks/transactions**.
2. Enable milestone-based payments to reduce risk on both sides.
3. Provide transparent, fair, automated dispute handling.
4. Deliver a simple UI that allows clients and freelancers to interact with the smart contract.
5. Achieve an MVP with securely functioning escrow logic.

---

## **4. Core Features**

### **A. Smart Contract (Clarity)**

#### 1. **Create Escrow Agreement**

* Client defines:

  * Freelancer STX address
  * Project metadata
  * Milestones (labels + amounts)
  * Deadline for each milestone

#### 2. **Lock Funds**

* Client deposits full project cost
* Funds are locked inside the contract

#### 3. **Submit Milestone**

* Freelancer submits deliverables for a milestone

#### 4. **Approve / Reject Milestone**

* Client approves → funds released for that milestone
* Client rejects → milestone moves to *dispute eligible* state

#### 5. **On-Chain Arbitration**

* Arbitrator reviews submissions
* Decides payout/refund
* Contract executes final decision

#### 6. **Cancellation / Timeouts**

* If deadlines pass or contract is mutually cancelled, remaining funds go back to the client unless in dispute.

#### 7. **Event Logs**

* Events for submission, approval, rejection, dispute initiation, and arbitration results.

---

### **B. Frontend (Next.js)**

#### **Stacks Integration Requirements**

The MVP **must** use:

* **Stacks Connect** → for wallet authentication + signing transactions
* **@stacks/transactions** → to create and broadcast contract calls

No other wallet or transaction libraries should replace these.

#### **User Roles**

* **Client**
* **Freelancer**
* **Arbitrator**

#### **Screens**

1. **Wallet Connect (Stacks Connect)**
2. **Dashboard (both roles)**
3. **Create Escrow (client)**
4. **Submit Milestone (freelancer)**
5. **Approve / Reject Milestone (client)**
6. **Dispute Center (client + freelancer + arbitrator)**
7. **Transaction Logs (on-chain events)**

---

## **5. Detailed Use Cases**

### **Use Case 1 — Create Escrow**

**Actor:** Client
**Flow:**

1. Connect wallet via **Stacks Connect**
2. Fill in escrow form
3. Contract call using **@stacks/transactions**
4. Funds locked in contract

---

### **Use Case 2 — Submit Milestone**

**Actor:** Freelancer
**Flow:**

1. Submit deliverable
2. Contract logs milestone submission

---

### **Use Case 3 — Approve Milestone**

**Actor:** Client
**Flow:**

1. Approves work
2. Smart contract releases milestone payment

---

### **Use Case 4 — Reject Milestone + Start Dispute**

**Actor:** Client or freelancer
**Flow:**

1. Reject milestone
2. Dispute is created
3. Arbitrator notified

---

### **Use Case 5 — Arbitration**

**Actor:** Arbitrator
**Flow:**

1. Arbitrator examines submissions
2. Calls `resolve-dispute`
3. Smart contract executes decision

---

### **Use Case 6 — Cancel Contract**

Triggered when:

* Contract expired
* Both parties agree to cancel
* All milestones completed

---

## **6. MVP Scope**

### ✔ **Included in MVP**

* Wallet authentication using **Stacks Connect**
* Escrow creation UI
* Smart contract deployment on Stacks testnet
* Milestone submission + approval interface
* Basic arbitration logic (single arbitrator)
* Use **@stacks/transactions** for:

  * Contract calls
  * Reading contract data
  * Broadcasting transactions
* Minimal dashboard for tracking progress
* Fully responsive frontend

### ✘ **Not Included in MVP**

* Multi-arbitrator DAO
* Notifications system
* IPFS storage
* Search/filter for projects
* Chat system
* KYC verification

---

## **7. Technical Architecture Overview**

### **Frontend**

* Next.js 15
* Tailwind CSS
* Stacks Connect
* @stacks/transactions
* Integration with Stacks Testnet RPC

### **Smart Contract**

Modules:

`escrow.clar`

* `create-escrow`
* `submit-milestone`
* `approve-milestone`
* `reject-milestone`
* `raise-dispute`
* `resolve-dispute`

Data stored:

* escrow ID
* client address
* freelancer address
* milestones array
* arbitrator address
* dispute status
* timestamps

---

## **8. KPIs / Success Metrics**

| KPI                                   | Measurement           |
| ------------------------------------- | --------------------- |
| Time to create escrow                 | < 2 minutes           |
| Smart contract execution success rate | > 95%                 |
| Milestones approved & paid            | High completion ratio |
| Dispute resolution time               | < 3 days              |
| User retention                        | active projects/user  |

---

## **9. Risks & Mitigations**

| Risk                               | Mitigation                                       |
| ---------------------------------- | ------------------------------------------------ |
| Smart contract bugs                | Deep testing + audits                            |
| Users unsure how to connect wallet | In-app onboarding                                |
| Arbitrator bias                    | Add multi-arbitrator DAO in future               |
| Fee spikes                         | Optimize contract size + batching where possible |

---

