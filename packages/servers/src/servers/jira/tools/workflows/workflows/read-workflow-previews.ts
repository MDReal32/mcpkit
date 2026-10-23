import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowsReadWorkflowPreviews = defineTool({
  name: "workflows:workflows:read_workflow_previews",
  description:
    "Preview workflow. Returns a requested workflow within a given project. The response provides a read-only preview of the workflow, omitting full configuration details.",
  input: {
    type: "object",
    properties: {
      issueTypeIds: {
        type: "array",
        description: "The list of issue type IDs. At most 25 issue type IDs can be specified.",
        items: {
          type: "string",
          description: "The list of issue type IDs. At most 25 issue type IDs can be specified.",
        },
      },
      projectId: {
        type: "string",
        description:
          "The projectId parameter is required and will be used for permission checks. In addition, you must supply at least one of the following lookup terms: *workflowNames*, *workflowIds*, or *issueTypeIds*. The specified workflows must be associated with the given project.",
      },
      workflowIds: {
        type: "array",
        description: "The list of workflow IDs to be returned. At most 25 workflow IDs can be specified.",
        items: {
          type: "string",
          description: "The list of workflow IDs to be returned. At most 25 workflow IDs can be specified.",
        },
      },
      workflowNames: {
        type: "array",
        description: "The list of workflow names to be returned. At most 25 workflow names can be specified.",
        items: {
          type: "string",
          description: "The list of workflow names to be returned. At most 25 workflow names can be specified.",
        },
      },
    },
    required: ["projectId"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/workflows/preview",
    body: ["issueTypeIds", "projectId", "workflowIds", "workflowNames"],
  },
});
