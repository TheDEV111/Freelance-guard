/**
 * Utility functions for the FreelanceGuard application
 */

import { ESCROW_STATUS, MILESTONE_STATUS, DISPUTE_STATUS } from '@/types/contract';

/**
 * Format STX amount from microSTX to STX
 */
export const formatSTX = (microSTX: bigint | number): string => {
  const stx = Number(microSTX) / 1_000_000;
  return `${stx.toFixed(6)} STX`;
};

/**
 * Convert STX to microSTX
 */
export const toMicroSTX = (stx: number): number => {
  return Math.floor(stx * 1_000_000);
};

/**
 * Format block height to approximate date/time
 * (Assuming ~10 min per block on Stacks)
 */
export const formatBlockTime = (blockHeight: number): string => {
  const minutesPerBlock = 10;
  const date = new Date(Date.now() + blockHeight * minutesPerBlock * 60 * 1000);
  return date.toLocaleDateString();
};

/**
 * Get status label for escrow
 */
export const getEscrowStatusLabel = (status: number): string => {
  switch (status) {
    case ESCROW_STATUS.ACTIVE:
      return 'Active';
    case ESCROW_STATUS.COMPLETED:
      return 'Completed';
    case ESCROW_STATUS.CANCELLED:
      return 'Cancelled';
    case ESCROW_STATUS.DISPUTED:
      return 'Disputed';
    default:
      return 'Unknown';
  }
};

/**
 * Get status label for milestone
 */
export const getMilestoneStatusLabel = (status: number): string => {
  switch (status) {
    case MILESTONE_STATUS.PENDING:
      return 'Pending';
    case MILESTONE_STATUS.SUBMITTED:
      return 'Submitted';
    case MILESTONE_STATUS.APPROVED:
      return 'Approved';
    case MILESTONE_STATUS.REJECTED:
      return 'Rejected';
    case MILESTONE_STATUS.DISPUTED:
      return 'Disputed';
    default:
      return 'Unknown';
  }
};

/**
 * Get status label for dispute
 */
export const getDisputeStatusLabel = (status: number): string => {
  switch (status) {
    case DISPUTE_STATUS.OPEN:
      return 'Open';
    case DISPUTE_STATUS.RESOLVED:
      return 'Resolved';
    default:
      return 'Unknown';
  }
};

/**
 * Truncate wallet address for display
 */
export const truncateAddress = (address: string, chars = 8): string => {
  if (!address) return '';
  return `${address.substring(0, chars)}...${address.substring(address.length - chars)}`;
};

/**
 * Calculate progress percentage
 */
export const calculateProgress = (paidAmount: bigint, totalAmount: bigint): number => {
  if (totalAmount === 0n) return 0;
  return Math.round((Number(paidAmount) / Number(totalAmount)) * 100);
};

/**
 * Format date to readable string
 */
export const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Check if deadline has passed
 */
export const isDeadlinePassed = (deadline: number, currentBlock: number): boolean => {
  return currentBlock > deadline;
};

/**
 * Get status color for UI
 */
export const getStatusColor = (status: number, type: 'escrow' | 'milestone' | 'dispute'): string => {
  if (type === 'escrow') {
    switch (status) {
      case ESCROW_STATUS.ACTIVE:
        return 'text-green-600';
      case ESCROW_STATUS.COMPLETED:
        return 'text-blue-600';
      case ESCROW_STATUS.CANCELLED:
        return 'text-gray-600';
      case ESCROW_STATUS.DISPUTED:
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  }

  if (type === 'milestone') {
    switch (status) {
      case MILESTONE_STATUS.PENDING:
        return 'text-yellow-600';
      case MILESTONE_STATUS.SUBMITTED:
        return 'text-blue-600';
      case MILESTONE_STATUS.APPROVED:
        return 'text-green-600';
      case MILESTONE_STATUS.REJECTED:
        return 'text-red-600';
      case MILESTONE_STATUS.DISPUTED:
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  }

  if (type === 'dispute') {
    switch (status) {
      case DISPUTE_STATUS.OPEN:
        return 'text-red-600';
      case DISPUTE_STATUS.RESOLVED:
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  }

  return 'text-gray-600';
};
