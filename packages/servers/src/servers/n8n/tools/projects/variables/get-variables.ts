import { defineTool } from "@usemcpkit/core";

export const projectsVariablesGetVariables = defineTool({
  name: "projects:variables:get_variables",
  description: "Retrieve variables. Retrieve variables from your instance.",
  input: {
    type: "object",
    properties: {
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
      projectId: {
        type: "string",
      },
      state: {
        type: "string",
        enum: ["empty"],
      },
    },
  },
  request: {
    method: "GET",
    path: "/variables",
    query: ["limit", "cursor", "projectId", "state"],
  },
});
