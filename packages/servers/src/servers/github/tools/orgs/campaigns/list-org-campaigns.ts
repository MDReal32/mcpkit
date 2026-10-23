import { defineTool } from "@usemcpkit/core";

export const orgsCampaignsListOrgCampaigns = defineTool({
  name: "orgs:campaigns:list_org_campaigns",
  description: "List campaigns for an organization. Lists campaigns in an organization.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      page: {
        type: "integer",
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
      per_page: {
        type: "integer",
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      direction: {
        type: "string",
        default: "desc",
        enum: ["asc", "desc"],
        description: "The direction to sort the results by.",
      },
      state: {
        type: "string",
        description: "If specified, only campaigns with this state will be returned.",
        enum: ["open", "closed"],
      },
      sort: {
        type: "string",
        default: "created",
        enum: ["created", "updated", "ends_at", "published"],
        description: "The property by which to sort the results.",
      },
    },
    required: ["org"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/campaigns",
    query: ["page", "per_page", "direction", "state", "sort"],
  },
});
