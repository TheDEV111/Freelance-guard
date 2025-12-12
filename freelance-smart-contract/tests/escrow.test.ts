import { describe, expect, it, beforeEach } from "vitest";
import { Cl, ClarityType } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const client = accounts.get("wallet_1")!;
const freelancer = accounts.get("wallet_2")!;
const arbitrator = accounts.get("wallet_3")!;

describe("FreelanceGuard Escrow Contract", () => {
  describe("Escrow Creation", () => {
    it("should create an escrow successfully", () => {
      const totalAmount = 10000000; // 10 STX in microSTX
      const metadata = "Website development project";

      const response = simnet.callPublicFn(
        "escrow",
        "create-escrow",
        [
          Cl.principal(freelancer),
          Cl.principal(arbitrator),
          Cl.uint(totalAmount),
          Cl.stringAscii(metadata),
        ],
        client
      );

      expect(response.result).toBeOk(Cl.uint(1));

      // Verify escrow was created
      const escrow = simnet.callReadOnlyFn(
        "escrow",
        "get-escrow",
        [Cl.uint(1)],
        client
      );

      expect(escrow.result).toBeSome(
        Cl.tuple({
          client: Cl.principal(client),
          freelancer: Cl.principal(freelancer),
          arbitrator: Cl.principal(arbitrator),
          "total-amount": Cl.uint(totalAmount),
          "paid-amount": Cl.uint(0),
          status: Cl.uint(1), // STATUS-ACTIVE
          "created-at": Cl.uint(simnet.blockHeight),
          metadata: Cl.stringAscii(metadata),
        })
      );
    });

    it("should fail to create escrow with zero amount", () => {
      const response = simnet.callPublicFn(
        "escrow",
        "create-escrow",
        [
          Cl.principal(freelancer),
          Cl.principal(arbitrator),
          Cl.uint(0),
          Cl.stringAscii("Invalid project"),
        ],
        client
      );

      expect(response.result).toBeErr(Cl.uint(110)); // ERR-INVALID-AMOUNT
    });

    it("should increment escrow nonce correctly", () => {
      // Create first escrow
      simnet.callPublicFn(
        "escrow",
        "create-escrow",
        [
          Cl.principal(freelancer),
          Cl.principal(arbitrator),
          Cl.uint(5000000),
          Cl.stringAscii("Project 1"),
        ],
        client
      );

      // Create second escrow
      const response = simnet.callPublicFn(
        "escrow",
        "create-escrow",
        [
          Cl.principal(freelancer),
          Cl.principal(arbitrator),
          Cl.uint(3000000),
          Cl.stringAscii("Project 2"),
        ],
        client
      );

      expect(response.result).toBeOk(Cl.uint(2));
    });
  });

  describe("Milestone Management", () => {
    beforeEach(() => {
      // Create an escrow before each test
      simnet.callPublicFn(
        "escrow",
        "create-escrow",
        [
          Cl.principal(freelancer),
          Cl.principal(arbitrator),
          Cl.uint(10000000),
          Cl.stringAscii("Test project"),
        ],
        client
      );
    });

    it("should add a milestone successfully", () => {
      const response = simnet.callPublicFn(
        "escrow",
        "add-milestone",
        [
          Cl.uint(1),
          Cl.stringAscii("Design mockups"),
          Cl.uint(3000000),
          Cl.uint(simnet.blockHeight + 100),
        ],
        client
      );

      expect(response.result).toBeOk(Cl.uint(1));

      // Verify milestone
      const milestone = simnet.callReadOnlyFn(
        "escrow",
        "get-milestone",
        [Cl.uint(1), Cl.uint(1)],
        client
      );

      // Verify milestone exists and has correct data
      expect(milestone.result.type).toBe(ClarityType.OptionalSome);
      if (milestone.result.type === ClarityType.OptionalSome) {
        const milestoneValue = milestone.result.value as any;
        expect(milestoneValue['label']).toStrictEqual(Cl.stringAscii("Design mockups"));
        expect(milestoneValue['amount']).toStrictEqual(Cl.uint(3000000));
        expect(milestoneValue['status']).toStrictEqual(Cl.uint(1)); // MILESTONE-PENDING
      }
    });

    it("should fail when non-client tries to add milestone", () => {
      const response = simnet.callPublicFn(
        "escrow",
        "add-milestone",
        [
          Cl.uint(1),
          Cl.stringAscii("Unauthorized milestone"),
          Cl.uint(1000000),
          Cl.uint(simnet.blockHeight + 50),
        ],
        freelancer
      );

      expect(response.result).toBeErr(Cl.uint(100)); // ERR-NOT-AUTHORIZED
    });

    it("should add multiple milestones", () => {
      // Add first milestone
      simnet.callPublicFn(
        "escrow",
        "add-milestone",
        [
          Cl.uint(1),
          Cl.stringAscii("Milestone 1"),
          Cl.uint(3000000),
          Cl.uint(simnet.blockHeight + 100),
        ],
        client
      );

      // Add second milestone
      const response = simnet.callPublicFn(
        "escrow",
        "add-milestone",
        [
          Cl.uint(1),
          Cl.stringAscii("Milestone 2"),
          Cl.uint(4000000),
          Cl.uint(simnet.blockHeight + 200),
        ],
        client
      );

      expect(response.result).toBeOk(Cl.uint(2));

      // Verify milestone count
      const count = simnet.callReadOnlyFn(
        "escrow",
        "get-milestone-count",
        [Cl.uint(1)],
        client
      );

      expect(count.result).toBeUint(2);
    });
  });

  describe("Milestone Submission", () => {
    beforeEach(() => {
      // Create escrow and add milestone
      simnet.callPublicFn(
        "escrow",
        "create-escrow",
        [
          Cl.principal(freelancer),
          Cl.principal(arbitrator),
          Cl.uint(10000000),
          Cl.stringAscii("Test project"),
        ],
        client
      );

      simnet.callPublicFn(
        "escrow",
        "add-milestone",
        [
          Cl.uint(1),
          Cl.stringAscii("Design phase"),
          Cl.uint(3000000),
          Cl.uint(simnet.blockHeight + 100),
        ],
        client
      );
    });

    it("should submit milestone deliverable successfully", () => {
      const response = simnet.callPublicFn(
        "escrow",
        "submit-milestone",
        [
          Cl.uint(1),
          Cl.uint(1),
          Cl.stringAscii("https://example.com/deliverable.pdf"),
        ],
        freelancer
      );

      expect(response.result).toBeOk(Cl.bool(true));

      // Verify milestone status changed
      const milestone = simnet.callReadOnlyFn(
        "escrow",
        "get-milestone",
        [Cl.uint(1), Cl.uint(1)],
        freelancer
      );

      expect(milestone.result.type).toBe(ClarityType.OptionalSome);
      if (milestone.result.type === ClarityType.OptionalSome) {
        const milestoneValue = milestone.result.value as any;
        expect(milestoneValue['status']).toStrictEqual(Cl.uint(2)); // MILESTONE-SUBMITTED
      }
    });

    it("should fail when non-freelancer tries to submit", () => {
      const response = simnet.callPublicFn(
        "escrow",
        "submit-milestone",
        [
          Cl.uint(1),
          Cl.uint(1),
          Cl.stringAscii("https://example.com/fake.pdf"),
        ],
        client
      );

      expect(response.result).toBeErr(Cl.uint(100)); // ERR-NOT-AUTHORIZED
    });

    it("should fail to submit already submitted milestone", () => {
      // First submission
      simnet.callPublicFn(
        "escrow",
        "submit-milestone",
        [
          Cl.uint(1),
          Cl.uint(1),
          Cl.stringAscii("https://example.com/deliverable1.pdf"),
        ],
        freelancer
      );

      // Second submission attempt
      const response = simnet.callPublicFn(
        "escrow",
        "submit-milestone",
        [
          Cl.uint(1),
          Cl.uint(1),
          Cl.stringAscii("https://example.com/deliverable2.pdf"),
        ],
        freelancer
      );

      expect(response.result).toBeErr(Cl.uint(103)); // ERR-ALREADY-SUBMITTED
    });
  });

  describe("Milestone Approval", () => {
    beforeEach(() => {
      // Create escrow, add milestone, and submit it
      simnet.callPublicFn(
        "escrow",
        "create-escrow",
        [
          Cl.principal(freelancer),
          Cl.principal(arbitrator),
          Cl.uint(10000000),
          Cl.stringAscii("Test project"),
        ],
        client
      );

      simnet.callPublicFn(
        "escrow",
        "add-milestone",
        [
          Cl.uint(1),
          Cl.stringAscii("Phase 1"),
          Cl.uint(3000000),
          Cl.uint(simnet.blockHeight + 100),
        ],
        client
      );

      simnet.callPublicFn(
        "escrow",
        "submit-milestone",
        [
          Cl.uint(1),
          Cl.uint(1),
          Cl.stringAscii("https://example.com/phase1.pdf"),
        ],
        freelancer
      );
    });

    it("should approve milestone and transfer payment", () => {
      const freelancerBalanceBefore = simnet.getAssetsMap().get("STX")?.get(freelancer) || 0n;

      const response = simnet.callPublicFn(
        "escrow",
        "approve-milestone",
        [Cl.uint(1), Cl.uint(1)],
        client
      );

      expect(response.result).toBeOk(Cl.bool(true));

      // Verify payment transferred
      const freelancerBalanceAfter = simnet.getAssetsMap().get("STX")?.get(freelancer) || 0n;
      expect(freelancerBalanceAfter).toBe(freelancerBalanceBefore + 3000000n);

      // Verify milestone status
      const milestone = simnet.callReadOnlyFn(
        "escrow",
        "get-milestone",
        [Cl.uint(1), Cl.uint(1)],
        client
      );

      expect(milestone.result.type).toBe(ClarityType.OptionalSome);
      if (milestone.result.type === ClarityType.OptionalSome) {
        const milestoneValue = milestone.result.value as any;
        expect(milestoneValue['status']).toStrictEqual(Cl.uint(3)); // MILESTONE-APPROVED
      }
    });

    it("should fail when non-client tries to approve", () => {
      const response = simnet.callPublicFn(
        "escrow",
        "approve-milestone",
        [Cl.uint(1), Cl.uint(1)],
        freelancer
      );

      expect(response.result).toBeErr(Cl.uint(100)); // ERR-NOT-AUTHORIZED
    });

    it("should update escrow status to completed when all paid", () => {
      // Create new escrow with single milestone
      simnet.callPublicFn(
        "escrow",
        "create-escrow",
        [
          Cl.principal(freelancer),
          Cl.principal(arbitrator),
          Cl.uint(5000000),
          Cl.stringAscii("Simple project"),
        ],
        client
      );

      simnet.callPublicFn(
        "escrow",
        "add-milestone",
        [
          Cl.uint(2),
          Cl.stringAscii("Complete work"),
          Cl.uint(5000000),
          Cl.uint(simnet.blockHeight + 100),
        ],
        client
      );

      simnet.callPublicFn(
        "escrow",
        "submit-milestone",
        [
          Cl.uint(2),
          Cl.uint(1),
          Cl.stringAscii("https://example.com/final.pdf"),
        ],
        freelancer
      );

      simnet.callPublicFn(
        "escrow",
        "approve-milestone",
        [Cl.uint(2), Cl.uint(1)],
        client
      );

      // Verify escrow status is completed
      const escrow = simnet.callReadOnlyFn(
        "escrow",
        "get-escrow",
        [Cl.uint(2)],
        client
      );

      expect(escrow.result.type).toBe(ClarityType.OptionalSome);
      if (escrow.result.type === ClarityType.OptionalSome) {
        const escrowValue = escrow.result.value as any;
        expect(escrowValue['status']).toStrictEqual(Cl.uint(2)); // STATUS-COMPLETED
      }
    });
  });

  describe("Milestone Rejection", () => {
    beforeEach(() => {
      simnet.callPublicFn(
        "escrow",
        "create-escrow",
        [
          Cl.principal(freelancer),
          Cl.principal(arbitrator),
          Cl.uint(10000000),
          Cl.stringAscii("Test project"),
        ],
        client
      );

      simnet.callPublicFn(
        "escrow",
        "add-milestone",
        [
          Cl.uint(1),
          Cl.stringAscii("Phase 1"),
          Cl.uint(3000000),
          Cl.uint(simnet.blockHeight + 100),
        ],
        client
      );

      simnet.callPublicFn(
        "escrow",
        "submit-milestone",
        [
          Cl.uint(1),
          Cl.uint(1),
          Cl.stringAscii("https://example.com/deliverable.pdf"),
        ],
        freelancer
      );
    });

    it("should reject milestone successfully", () => {
      const response = simnet.callPublicFn(
        "escrow",
        "reject-milestone",
        [Cl.uint(1), Cl.uint(1)],
        client
      );

      expect(response.result).toBeOk(Cl.bool(true));

      // Verify milestone status
      const milestone = simnet.callReadOnlyFn(
        "escrow",
        "get-milestone",
        [Cl.uint(1), Cl.uint(1)],
        client
      );

      expect(milestone.result.type).toBe(ClarityType.OptionalSome);
      if (milestone.result.type === ClarityType.OptionalSome) {
        const milestoneValue = milestone.result.value as any;
        expect(milestoneValue['status']).toStrictEqual(Cl.uint(4)); // MILESTONE-REJECTED
      }
    });

    it("should allow resubmission after rejection", () => {
      // Reject first
      simnet.callPublicFn(
        "escrow",
        "reject-milestone",
        [Cl.uint(1), Cl.uint(1)],
        client
      );

      // Resubmit
      const response = simnet.callPublicFn(
        "escrow",
        "submit-milestone",
        [
          Cl.uint(1),
          Cl.uint(1),
          Cl.stringAscii("https://example.com/revised.pdf"),
        ],
        freelancer
      );

      expect(response.result).toBeOk(Cl.bool(true));
    });
  });

  describe("Dispute Management", () => {
    beforeEach(() => {
      simnet.callPublicFn(
        "escrow",
        "create-escrow",
        [
          Cl.principal(freelancer),
          Cl.principal(arbitrator),
          Cl.uint(10000000),
          Cl.stringAscii("Test project"),
        ],
        client
      );

      simnet.callPublicFn(
        "escrow",
        "add-milestone",
        [
          Cl.uint(1),
          Cl.stringAscii("Disputed work"),
          Cl.uint(3000000),
          Cl.uint(simnet.blockHeight + 100),
        ],
        client
      );

      simnet.callPublicFn(
        "escrow",
        "submit-milestone",
        [
          Cl.uint(1),
          Cl.uint(1),
          Cl.stringAscii("https://example.com/work.pdf"),
        ],
        freelancer
      );
    });

    it("should raise dispute successfully", () => {
      const response = simnet.callPublicFn(
        "escrow",
        "raise-dispute",
        [
          Cl.uint(1),
          Cl.uint(1),
          Cl.stringAscii("Work does not meet requirements"),
        ],
        client
      );

      expect(response.result).toBeOk(Cl.bool(true));

      // Verify dispute created
      const dispute = simnet.callReadOnlyFn(
        "escrow",
        "get-dispute",
        [Cl.uint(1)],
        client
      );

      expect(dispute.result).toBeSome(
        Cl.tuple({
          "raised-by": Cl.principal(client),
          "milestone-id": Cl.uint(1),
          reason: Cl.stringAscii("Work does not meet requirements"),
          resolved: Cl.bool(false),
          resolution: Cl.none(),
          "resolved-at": Cl.none(),
        })
      );
    });

    it("should allow arbitrator to resolve dispute in favor of freelancer", () => {
      // Raise dispute first
      simnet.callPublicFn(
        "escrow",
        "raise-dispute",
        [
          Cl.uint(1),
          Cl.uint(1),
          Cl.stringAscii("Dispute reason"),
        ],
        client
      );

      const freelancerBalanceBefore = simnet.getAssetsMap().get("STX")?.get(freelancer) || 0n;

      // Resolve in favor of freelancer
      const response = simnet.callPublicFn(
        "escrow",
        "resolve-dispute",
        [
          Cl.uint(1),
          Cl.bool(true),
          Cl.stringAscii("Work is acceptable"),
        ],
        arbitrator
      );

      expect(response.result).toBeOk(Cl.bool(true));

      // Verify payment transferred
      const freelancerBalanceAfter = simnet.getAssetsMap().get("STX")?.get(freelancer) || 0n;
      expect(freelancerBalanceAfter).toBe(freelancerBalanceBefore + 3000000n);
    });

    it("should allow arbitrator to resolve dispute in favor of client", () => {
      simnet.callPublicFn(
        "escrow",
        "raise-dispute",
        [
          Cl.uint(1),
          Cl.uint(1),
          Cl.stringAscii("Incomplete work"),
        ],
        client
      );

      const freelancerBalanceBefore = simnet.getAssetsMap().get("STX")?.get(freelancer) || 0n;

      // Resolve in favor of client
      const response = simnet.callPublicFn(
        "escrow",
        "resolve-dispute",
        [
          Cl.uint(1),
          Cl.bool(false),
          Cl.stringAscii("Work does not meet standards"),
        ],
        arbitrator
      );

      expect(response.result).toBeOk(Cl.bool(true));

      // Verify no payment to freelancer
      const freelancerBalanceAfter = simnet.getAssetsMap().get("STX")?.get(freelancer) || 0n;
      expect(freelancerBalanceAfter).toBe(freelancerBalanceBefore);
    });

    it("should fail when non-arbitrator tries to resolve", () => {
      simnet.callPublicFn(
        "escrow",
        "raise-dispute",
        [
          Cl.uint(1),
          Cl.uint(1),
          Cl.stringAscii("Dispute"),
        ],
        client
      );

      const response = simnet.callPublicFn(
        "escrow",
        "resolve-dispute",
        [
          Cl.uint(1),
          Cl.bool(true),
          Cl.stringAscii("Unauthorized resolution"),
        ],
        client
      );

      expect(response.result).toBeErr(Cl.uint(100)); // ERR-NOT-AUTHORIZED
    });
  });

  describe("Escrow Cancellation", () => {
    it("should cancel escrow and refund remaining funds", () => {
      simnet.callPublicFn(
        "escrow",
        "create-escrow",
        [
          Cl.principal(freelancer),
          Cl.principal(arbitrator),
          Cl.uint(10000000),
          Cl.stringAscii("Cancelled project"),
        ],
        client
      );

      const clientBalanceBefore = simnet.getAssetsMap().get("STX")?.get(client) || 0n;

      const response = simnet.callPublicFn(
        "escrow",
        "cancel-escrow",
        [Cl.uint(1)],
        client
      );

      expect(response.result).toBeOk(Cl.bool(true));

      // Verify refund
      const clientBalanceAfter = simnet.getAssetsMap().get("STX")?.get(client) || 0n;
      expect(clientBalanceAfter).toBe(clientBalanceBefore + 10000000n);

      // Verify escrow status
      const escrow = simnet.callReadOnlyFn(
        "escrow",
        "get-escrow",
        [Cl.uint(1)],
        client
      );

      expect(escrow.result.type).toBe(ClarityType.OptionalSome);
      if (escrow.result.type === ClarityType.OptionalSome) {
        const escrowValue = escrow.result.value as any;
        expect(escrowValue['status']).toStrictEqual(Cl.uint(3)); // STATUS-CANCELLED
      }
    });

    it("should only refund unpaid amount", () => {
      // Create escrow
      simnet.callPublicFn(
        "escrow",
        "create-escrow",
        [
          Cl.principal(freelancer),
          Cl.principal(arbitrator),
          Cl.uint(10000000),
          Cl.stringAscii("Partial project"),
        ],
        client
      );

      // Add and approve milestone
      simnet.callPublicFn(
        "escrow",
        "add-milestone",
        [
          Cl.uint(1),
          Cl.stringAscii("Phase 1"),
          Cl.uint(4000000),
          Cl.uint(simnet.blockHeight + 100),
        ],
        client
      );

      simnet.callPublicFn(
        "escrow",
        "submit-milestone",
        [
          Cl.uint(1),
          Cl.uint(1),
          Cl.stringAscii("https://example.com/phase1.pdf"),
        ],
        freelancer
      );

      simnet.callPublicFn(
        "escrow",
        "approve-milestone",
        [Cl.uint(1), Cl.uint(1)],
        client
      );

      const clientBalanceBefore = simnet.getAssetsMap().get("STX")?.get(client) || 0n;

      // Cancel escrow
      simnet.callPublicFn(
        "escrow",
        "cancel-escrow",
        [Cl.uint(1)],
        client
      );

      // Verify only remaining amount refunded (10M - 4M = 6M)
      const clientBalanceAfter = simnet.getAssetsMap().get("STX")?.get(client) || 0n;
      expect(clientBalanceAfter).toBe(clientBalanceBefore + 6000000n);
    });

    it("should fail when non-client tries to cancel", () => {
      simnet.callPublicFn(
        "escrow",
        "create-escrow",
        [
          Cl.principal(freelancer),
          Cl.principal(arbitrator),
          Cl.uint(10000000),
          Cl.stringAscii("Test project"),
        ],
        client
      );

      const response = simnet.callPublicFn(
        "escrow",
        "cancel-escrow",
        [Cl.uint(1)],
        freelancer
      );

      expect(response.result).toBeErr(Cl.uint(100)); // ERR-NOT-AUTHORIZED
    });
  });
});
