import { defineTool } from "@usemcpkit/core";

export const orgsOrgsGetOrgRulesetHistory = defineTool({
  name: "orgs:orgs:get_org_ruleset_history",
  description: "Get organization ruleset history. Get the history of an organization ruleset.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      ruleset_id: {
        type: "integer",
        description: "The ID of the ruleset.",
      },
      per_page: {
        type: "integer",
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: "integer",
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ["org", "ruleset_id"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/rulesets/{ruleset_id}/history",
    query: ["per_page", "page"],
  },
});
