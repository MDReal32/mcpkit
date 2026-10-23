import { orgsApiInsightsTools } from './api-insights';
import { orgsBillingTools } from './billing';
import { orgsCampaignsTools } from './campaigns';
import { orgsClassroomTools } from './classroom';
import { orgsHostedComputeTools } from './hosted-compute';
import { orgsInteractionsTools } from './interactions';
import { orgsMigrationsTools } from './migrations';
import { orgsOrgsTools } from './orgs';
import { orgsReposTools } from './repos';
import { orgsTeamsTools } from './teams';

export const orgsGroupTools = [
  ...orgsApiInsightsTools,
  ...orgsBillingTools,
  ...orgsCampaignsTools,
  ...orgsClassroomTools,
  ...orgsHostedComputeTools,
  ...orgsInteractionsTools,
  ...orgsMigrationsTools,
  ...orgsOrgsTools,
  ...orgsReposTools,
  ...orgsTeamsTools,
];
