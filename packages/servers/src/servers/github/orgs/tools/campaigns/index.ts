import { campaignsCreateCampaign } from './create-campaign';
import { campaignsDeleteCampaign } from './delete-campaign';
import { campaignsGetCampaignSummary } from './get-campaign-summary';
import { campaignsListOrgCampaigns } from './list-org-campaigns';
import { campaignsUpdateCampaign } from './update-campaign';

export const campaignsTools = [
  campaignsCreateCampaign,
  campaignsDeleteCampaign,
  campaignsGetCampaignSummary,
  campaignsListOrgCampaigns,
  campaignsUpdateCampaign,
];
