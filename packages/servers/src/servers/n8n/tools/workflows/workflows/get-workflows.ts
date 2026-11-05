import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowsGetWorkflows = defineTool({
  name: "workflows:workflows:get_workflows",
  description: "Retrieve all workflows. Retrieve all workflows from your instance.",
  input: {
    type: "object",
    properties: {
      offset: {
        type: "number",
        default: 0,
        description: "The number of items to skip before starting to collect the result set.",
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
      active: {
        type: "string",
        enum: ["true", "false"],
      },
      tags: {
        type: "string",
      },
      name: {
        type: "string",
      },
      projectId: {
        type: "string",
      },
      excludePinnedData: {
        type: "string",
        default: "false",
        enum: ["true", "false"],
      },
      includeParentFolder: {
        type: "string",
        description:
          "Set to `true` to add `parentFolder` to each workflow. `parentFolder` holds the folder `id`, or is `null` at the project root.",
        default: "false",
        enum: ["true", "false"],
      },
    },
  },
  request: {
    method: "GET",
    path: "/workflows",
    query: [
      "offset",
      "limit",
      "cursor",
      "active",
      "tags",
      "name",
      "projectId",
      "excludePinnedData",
      "includeParentFolder",
    ],
  },
});
