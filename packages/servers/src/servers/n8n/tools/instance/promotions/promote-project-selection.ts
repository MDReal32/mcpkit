import { defineTool } from "@usemcpkit/core";

export const instancePromotionsPromoteProjectSelection = defineTool({
  name: "instance:promotions:promote_project_selection",
  description:
    "Promote a selection of a project's workflows. Promotes a chosen set of a team project's workflows to the branch of the project's Promote environment. Send workflow ids only; the server reads each one now, so the push carries the current state. Live and archived workflows the project owns are exported, so an archived id stays on the branch as archived; an id whose workflow is gone from the instance leaves the branch, matching the project's ch…",
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
      commitMessage: {
        type: "string",
        description: "Message for the promotion commit. If you omit it, the commit uses a generated message.",
      },
    },
    required: ["projectId", "workflowIds"],
  },
  request: {
    method: "POST",
    path: "/promotions/projects/{projectId}/promote",
    body: ["workflowIds", "commitMessage"],
  },
});
