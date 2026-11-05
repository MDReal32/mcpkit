import { defineTool } from "@usemcpkit/core";

export const instancePromotionsApplyProjectSelection = defineTool({
  name: "instance:promotions:apply_project_selection",
  description:
    "Apply a selection of a project's workflows. Applies selected workflow changes from the project's Apply branch. Send the selected change-list IDs in workflowIds. The server imports IDs present on the branch for this project. It removes instance workflows owned by this project when their IDs are absent from the branch. Duplicate or invalid IDs reject the whole request. Unselected content stays unchanged. A selected workflow moves within the…",
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
    },
    required: ["projectId", "workflowIds"],
  },
  request: {
    method: "POST",
    path: "/promotions/projects/{projectId}/apply",
    body: ["workflowIds", "expectedSource"],
  },
});
