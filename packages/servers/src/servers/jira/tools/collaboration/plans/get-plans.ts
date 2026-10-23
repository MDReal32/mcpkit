import { defineTool } from "@usemcpkit/core";

export const collaborationPlansGetPlans = defineTool({
  name: "collaboration:plans:get_plans",
  description: "Get plans paginated. Returns a paginated list of plans.",
  input: {
    type: "object",
    properties: {
      includeTrashed: {
        type: "boolean",
        default: false,
        description: "Whether to include trashed plans in the results.",
      },
      includeArchived: {
        type: "boolean",
        default: false,
        description: "Whether to include archived plans in the results.",
      },
      cursor: {
        type: "string",
        default: "",
        description: "The cursor to start from. If not provided, the first page will be returned.",
      },
      maxResults: {
        type: "integer",
        default: 50,
        description:
          "The maximum number of plans to return per page. The maximum value is 50. The default value is 50.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/plans/plan",
    query: ["includeTrashed", "includeArchived", "cursor", "maxResults"],
  },
});
