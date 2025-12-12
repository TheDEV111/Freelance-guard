/**
 * Type definitions for FreelanceGuard Escrow Smart Contract
 */

export interface Escrow {
  id: number;
  client: string;
  freelancer: string;
  title: string;
  description: string;
  totalAmount: bigint;
  paidAmount: bigint;
  status: number;
  deadline: number;
  createdAt: number;
}

export interface Milestone {
  id: number;
  escrowId: number;
  description: string;
  amount: bigint;
  status: number;
  deadline: number;
  submissionNotes: string;
  rejectionReason: string;
  submittedAt: number;
}

export interface Dispute {
  id: number;
  escrowId: number;
  milestoneId: number;
  initiator: string;
  reason: string;
  status: number;
  resolution: string;
  createdAt: number;
  resolvedAt: number;
}

// Escrow Status Constants
export const ESCROW_STATUS = {
  ACTIVE: 1,
  COMPLETED: 2,
  CANCELLED: 3,
  DISPUTED: 4,
} as const;

// Milestone Status Constants
export const MILESTONE_STATUS = {
  PENDING: 1,
  SUBMITTED: 2,
  APPROVED: 3,
  REJECTED: 4,
  DISPUTED: 5,
} as const;

// Dispute Status Constants
export const DISPUTE_STATUS = {
  OPEN: 1,
  RESOLVED: 2,
} as const;

export type EscrowStatus = typeof ESCROW_STATUS[keyof typeof ESCROW_STATUS];
export type MilestoneStatus = typeof MILESTONE_STATUS[keyof typeof MILESTONE_STATUS];
export type DisputeStatus = typeof DISPUTE_STATUS[keyof typeof DISPUTE_STATUS];

// User Role Types
export type UserRole = 'client' | 'freelancer' | 'arbitrator';
