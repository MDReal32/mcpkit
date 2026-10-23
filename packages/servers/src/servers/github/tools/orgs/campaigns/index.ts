import { orgsCampaignsCreateCampaign } from "./create-campaign";
import { orgsCampaignsDeleteCampaign } from "./delete-campaign";
import { orgsCampaignsGetCampaignSummary } from "./get-campaign-summary";
import { orgsCampaignsListOrgCampaigns } from "./list-org-campaigns";
import { orgsCampaignsUpdateCampaign } from "./update-campaign";

export const orgsCampaignsTools = [
  orgsCampaignsCreateCampaign,
  orgsCampaignsDeleteCampaign,
  orgsCampaignsGetCampaignSummary,
  orgsCampaignsListOrgCampaigns,
  orgsCampaignsUpdateCampaign,
];
