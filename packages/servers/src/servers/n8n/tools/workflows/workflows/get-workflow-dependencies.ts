import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowsGetWorkflowDependencies = defineTool({
  name: "workflows:workflows:get_workflow_dependencies",
  description:
    "List workflow dependencies. List the credentials, data tables, sub-workflows and error workflow that the workflow uses, and the workflows and agents that use the workflow.",
  input: {
    type: "object",
    properties: {
      workflowId: {
        type: "string",
        description: "The ID of the workflow.",
      },
      limit: {
        type: "number",
        default: 100,
        description: "The maximum number of items to return.",
      },
      cursor: {
        type: "string",
        description:
          'Paginate by setting the cursor parameter to the nextCursor attribute returned by the previous request\'s response. Default value fetches the first "page" of the collection. See pagination for more detail.',
      },
    },
    required: ["workflowId"],
  },
  request: {
    method: "GET",
    path: "/workflows/{workflowId}/dependencies",
    query: ["limit", "cursor"],
  },
});
