import { adminAnalyticsGetAnalyticsGroupActivityIssuesCount } from './get-analytics-group-activity-issues-count';
import { adminAnalyticsGetAnalyticsGroupActivityMergeRequestsCount } from './get-analytics-group-activity-merge-requests-count';
import { adminAnalyticsGetAnalyticsGroupActivityNewMembersCount } from './get-analytics-group-activity-new-members-count';
import { adminAnalyticsListProjectsAnalyticsDeploymentFrequency } from './list-projects-analytics-deployment-frequency';

export const adminAnalyticsTools = [
  adminAnalyticsGetAnalyticsGroupActivityIssuesCount,
  adminAnalyticsGetAnalyticsGroupActivityMergeRequestsCount,
  adminAnalyticsGetAnalyticsGroupActivityNewMembersCount,
  adminAnalyticsListProjectsAnalyticsDeploymentFrequency,
];
