import { defineTool } from "@usemcpkit/core";

export const orgsCampaignsGetCampaignSummary = defineTool({
  name: "orgs:campaigns:get_campaign_summary",
  description: "Get a campaign for an organization. Gets a campaign for an organization.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      campaign_number: {
        type: "integer",
        description: "The campaign number.",
      },
    },
    required: ["org", "campaign_number"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/campaigns/{campaign_number}",
  },
});
