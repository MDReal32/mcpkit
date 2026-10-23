import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowsListWorkflowHistory = defineTool({
  name: "workflows:workflows:list_workflow_history",
  description: "List workflow history entries. Returns a list of workflow history entries for a specified workflow id.",
  input: {
    type: "object",
    properties: {
      expand: {
        type: "string",
        description:
          "Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:",
      },
      workflowId: {
        type: "string",
        description: "The id of the workflow to read the history for.",
      },
    },
  },
  request: {
    method: "POST",
    path: "/rest/api/2/workflow/history/list",
    query: ["expand"],
    body: ["workflowId"],
  },
});
