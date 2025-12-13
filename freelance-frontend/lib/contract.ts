/**
 * Contract Interaction Utilities
 * Functions to interact with the FreelanceGuard escrow smart contract
 */

import {
  AnchorMode,
  PostConditionMode,
  stringAsciiCV,
  uintCV,
  principalCV,
  callReadOnlyFunction,
  cvToJSON,
  ClarityValue,
} from '@stacks/transactions';
import { request } from '@stacks/connect';
import { getNetworkConfig, NetworkType } from './stacks-config';
import { getCurrentAddress } from './wallet';

/**
 * Create a new escrow agreement
 */
export const createEscrow = async (
  client: string,
  freelancer: string,
  title: string,
  description: string,
  totalAmount: number,
  deadline: number,
  network: NetworkType = 'testnet'
) => {
  const config = getNetworkConfig(network);
  const senderAddress = getCurrentAddress(network);

  if (!senderAddress) {
    throw new Error('Wallet not connected');
  }

  const result = await request('stx_callContract', {
    contractAddress: config.contractAddress,
    contractName: config.contractName,
    functionName: 'create-escrow',
    functionArgs: [
      principalCV(client),
      principalCV(freelancer),
      stringAsciiCV(title),
      stringAsciiCV(description),
      uintCV(totalAmount),
      uintCV(deadline),
    ],
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Deny,
    stxAddress: senderAddress,
  });

  return result;
};

/**
 * Add a milestone to an existing escrow
 */
export const addMilestone = async (
  escrowId: number,
  description: string,
  amount: number,
  deadline: number,
  network: NetworkType = 'testnet'
) => {
  const config = getNetworkConfig(network);

  const txOptions = {
    contractAddress: config.contractAddress,
    contractName: config.contractName,
    functionName: 'add-milestone',
    functionArgs: [
      uintCV(escrowId),
      stringAsciiCV(description),
      uintCV(amount),
      uintCV(deadline),
    ],
    network: config.network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Deny,
  };

  return makeContractCall(txOptions);
};

/**
 * Submit milestone work
 */
export const submitMilestone = async (
  escrowId: number,
  milestoneId: number,
  submissionNotes: string,
  network: NetworkType = 'testnet'
) => {
  const config = getNetworkConfig(network);

  const txOptions = {
    contractAddress: config.contractAddress,
    contractName: config.contractName,
    functionName: 'submit-milestone',
    functionArgs: [
      uintCV(escrowId),
      uintCV(milestoneId),
      stringAsciiCV(submissionNotes),
    ],
    network: config.network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Deny,
  };

  return makeContractCall(txOptions);
};

/**
 * Approve a submitted milestone
 */
export const approveMilestone = async (
  escrowId: number,
  milestoneId: number,
  network: NetworkType = 'testnet'
) => {
  const config = getNetworkConfig(network);

  const txOptions = {
    contractAddress: config.contractAddress,
    contractName: config.contractName,
    functionName: 'approve-milestone',
    functionArgs: [uintCV(escrowId), uintCV(milestoneId)],
    network: config.network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Deny,
  };

  return makeContractCall(txOptions);
};

/**
 * Reject a submitted milestone
 */
export const rejectMilestone = async (
  escrowId: number,
  milestoneId: number,
  rejectionReason: string,
  network: NetworkType = 'testnet'
) => {
  const config = getNetworkConfig(network);

  const txOptions = {
    contractAddress: config.contractAddress,
    contractName: config.contractName,
    functionName: 'reject-milestone',
    functionArgs: [
      uintCV(escrowId),
      uintCV(milestoneId),
      stringAsciiCV(rejectionReason),
    ],
    network: config.network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Deny,
  };

  return makeContractCall(txOptions);
};

/**
 * Raise a dispute for a milestone
 */
export const raiseDispute = async (
  escrowId: number,
  milestoneId: number,
  reason: string,
  network: NetworkType = 'testnet'
) => {
  const config = getNetworkConfig(network);

  const txOptions = {
    contractAddress: config.contractAddress,
    contractName: config.contractName,
    functionName: 'raise-dispute',
    functionArgs: [
      uintCV(escrowId),
      uintCV(milestoneId),
      stringAsciiCV(reason),
    ],
    network: config.network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Deny,
  };

  return makeContractCall(txOptions);
};

/**
 * Resolve a dispute (arbitrator only)
 */
export const resolveDispute = async (
  disputeId: number,
  resolution: string,
  clientRefundAmount: number,
  freelancerPaymentAmount: number,
  network: NetworkType = 'testnet'
) => {
  const config = getNetworkConfig(network);

  const txOptions = {
    contractAddress: config.contractAddress,
    contractName: config.contractName,
    functionName: 'resolve-dispute',
    functionArgs: [
      uintCV(disputeId),
      stringAsciiCV(resolution),
      uintCV(clientRefundAmount),
      uintCV(freelancerPaymentAmount),
    ],
    network: config.network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Deny,
  };

  return makeContractCall(txOptions);
};

/**
 * Cancel an escrow
 */
export const cancelEscrow = async (
  escrowId: number,
  network: NetworkType = 'testnet'
) => {
  const config = getNetworkConfig(network);

  const txOptions = {
    contractAddress: config.contractAddress,
    contractName: config.contractName,
    functionName: 'cancel-escrow',
    functionArgs: [uintCV(escrowId)],
    network: config.network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Deny,
  };

  return makeContractCall(txOptions);
};

/**
 * Read-only: Get escrow details
 */
export const getEscrow = async (
  escrowId: number,
  network: NetworkType = 'testnet'
) => {
  const config = getNetworkConfig(network);
  const senderAddress = userSession.loadUserData().profile.stxAddress.testnet;

  const options = {
    contractAddress: config.contractAddress,
    contractName: config.contractName,
    functionName: 'get-escrow',
    functionArgs: [uintCV(escrowId)],
    network: config.network,
    senderAddress,
  };

  const result = await callReadOnlyFunction(options);
  return cvToJSON(result);
};

/**
 * Read-only: Get milestone details
 */
export const getMilestone = async (
  escrowId: number,
  milestoneId: number,
  network: NetworkType = 'testnet'
) => {
  const config = getNetworkConfig(network);
  const senderAddress = userSession.loadUserData().profile.stxAddress.testnet;

  const options = {
    contractAddress: config.contractAddress,
    contractName: config.contractName,
    functionName: 'get-milestone',
    functionArgs: [uintCV(escrowId), uintCV(milestoneId)],
    network: config.network,
    senderAddress,
  };

  const result = await callReadOnlyFunction(options);
  return cvToJSON(result);
};

/**
 * Read-only: Get dispute details
 */
export const getDispute = async (
  disputeId: number,
  network: NetworkType = 'testnet'
) => {
  const config = getNetworkConfig(network);
  const senderAddress = userSession.loadUserData().profile.stxAddress.testnet;

  const options = {
    contractAddress: config.contractAddress,
    contractName: config.contractName,
    functionName: 'get-dispute',
    functionArgs: [uintCV(disputeId)],
    network: config.network,
    senderAddress,
  };

  const result = await callReadOnlyFunction(options);
  return cvToJSON(result);
};

/**
 * Read-only: Get milestone count for an escrow
 */
export const getEscrowMilestoneCount = async (
  escrowId: number,
  network: NetworkType = 'testnet'
) => {
  const config = getNetworkConfig(network);
  const senderAddress = userSession.loadUserData().profile.stxAddress.testnet;

  const options = {
    contractAddress: config.contractAddress,
    contractName: config.contractName,
    functionName: 'get-escrow-milestone-count',
    functionArgs: [uintCV(escrowId)],
    network: config.network,
    senderAddress,
  };

  const result = await callReadOnlyFunction(options);
  return cvToJSON(result);
};
