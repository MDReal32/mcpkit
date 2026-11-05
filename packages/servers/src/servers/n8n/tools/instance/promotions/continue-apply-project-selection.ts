import { defineTool } from "@usemcpkit/core";

export const instancePromotionsContinueApplyProjectSelection = defineTool({
  name: "instance:promotions:continue_apply_project_selection",
  description:
    "Continue applying a selection after binding setup. Rechecks the project's Apply source and the current bindings for the selection. Resend the full selection in workflowIds. Send the required expectedSource with the environmentId, branchName, and full commitSha from the reviewed Apply result. Send `confirmDestructiveChanges: true` to also apply destructive data table changes. The server does not keep a session. Status `source-changed` requires a n…",
  input: {
    type: "object",
    properties: {
      projectId: {
        type: "string",
        description: "The ID of the project.",
      },
      workflowIds: {
        type: "array",
        items: {
          type: "string",
        },
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
    required: ["projectId", "workflowIds", "expectedSource"],
  },
  request: {
    method: "POST",
    path: "/promotions/projects/{projectId}/apply/continue",
    body: ["workflowIds", "expectedSource", "confirmDestructiveChanges"],
  },
});
