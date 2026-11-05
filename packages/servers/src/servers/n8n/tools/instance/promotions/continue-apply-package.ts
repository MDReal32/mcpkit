import { defineTool } from "@usemcpkit/core";

export const instancePromotionsContinueApplyPackage = defineTool({
  name: "instance:promotions:continue_apply_package",
  description:
    "Continue Apply after binding setup. Rechecks the configured source and current target bindings. Send expectedSource with the environmentId, branchName, and full commitSha from the reviewed Apply result. Send `confirmDestructiveChanges: true` to also apply destructive data table changes and delete the reported team projects. Status `source-changed` requires a new Apply review. Status `blocked` returns fresh binding details without i…",
  input: {
    type: "object",
    properties: {
      promotionEnvironmentId: {
        type: "string",
        description: "The ID of the promotion environment.",
      },
      expectedSource: {
        type: "object",
        properties: {
          environmentId: {
            type: "string",
          },
          branchName: {
            type: "string",
          },
          commitSha: {
            type: "string",
          },
        },
        required: ["environmentId", "branchName", "commitSha"],
      },
      confirmDestructiveChanges: {
        type: "boolean",
        description:
          "Also applies destructive data table changes, which a `destructive-change` conflict reports: removed or retyped columns. The values in those columns are removed. Rows and other columns are kept. On a full apply, also deletes the team projects that a `project-deletion` conflict reports, with everything in them. The confirmation covers every such change and deletion when Continue runs, including tho…",
      },
    },
    required: ["promotionEnvironmentId", "expectedSource"],
  },
  request: {
    method: "POST",
    path: "/promotions/environments/{promotionEnvironmentId}/apply/continue",
    body: ["expectedSource", "confirmDestructiveChanges"],
  },
});
