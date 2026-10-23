import { defineTool } from "@usemcpkit/core";

export const copilotCopilotSpacesListForOrg = defineTool({
  name: "copilot:copilot_spaces:list_for_org",
  description:
    "List organization Copilot Spaces. Lists Copilot Spaces owned by an organization. The authenticated user must have read access to the organization's Copilot Spaces.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      per_page: {
        type: "integer",
        default: 30,
        description: "The number of results per page (max 100).",
      },
      before: {
        type: "string",
        description:
          "A cursor, as given in the Link header. If specified, the query only searches for results before this cursor.",
      },
      after: {
        type: "string",
        description:
          "A cursor, as given in the Link header. If specified, the query only searches for results after this cursor.",
      },
    },
    required: ["org"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/copilot-spaces",
    query: ["per_page", "before", "after"],
  },
});
