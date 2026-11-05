import { defineTool } from "@usemcpkit/core";

export const instancePromotionsPromotePackage = defineTool({
  name: "instance:promotions:promote_package",
  description:
    "Promote all team projects. Exports every team project, commits it, and pushes to the configured base branch or a new timestamped branch. The response reports the target branch in `git.branchName`. Personal projects are ignored. A workflow on the branch that moved to a personal project is refused with 400, because the destination would delete it. A workflow or folder on the branch that moved to another team project is refus…",
  input: {
    type: "object",
    properties: {
      promotionEnvironmentId: {
        type: "string",
        description: "The ID of the promotion environment.",
      },
      commitMessage: {
        type: "string",
        description: "Message for the promotion commit. If you omit it, the commit uses a generated message.",
      },
      force: {
        type: "boolean",
      },
    },
    required: ["promotionEnvironmentId"],
  },
  request: {
    method: "POST",
    path: "/promotions/environments/{promotionEnvironmentId}/promote",
    body: ["commitMessage", "force"],
  },
});
