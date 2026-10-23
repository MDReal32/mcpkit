import { apiInsightsTools } from './api-insights';
import { billingTools } from './billing';
import { campaignsTools } from './campaigns';
import { classroomTools } from './classroom';
import { hostedComputeTools } from './hosted-compute';
import { interactionsTools } from './interactions';
import { migrationsTools } from './migrations';
import { orgsTools } from './orgs';
import { reposTools } from './repos';
import { teamsTools } from './teams';

export const githubOrgsTools = [
  ...apiInsightsTools,
  ...billingTools,
  ...campaignsTools,
  ...classroomTools,
  ...hostedComputeTools,
  ...interactionsTools,
  ...migrationsTools,
  ...orgsTools,
  ...reposTools,
  ...teamsTools,
];
