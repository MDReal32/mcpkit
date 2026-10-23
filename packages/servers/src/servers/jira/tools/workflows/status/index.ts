import { workflowsStatusCreateStatuses } from './create-statuses';
import { workflowsStatusDeleteStatusesById } from './delete-statuses-by-id';
import { workflowsStatusGetProjectIssueTypeUsagesForStatus } from './get-project-issue-type-usages-for-status';
import { workflowsStatusGetProjectUsagesForStatus } from './get-project-usages-for-status';
import { workflowsStatusGetStatusesById } from './get-statuses-by-id';
import { workflowsStatusGetStatusesByName } from './get-statuses-by-name';
import { workflowsStatusGetWorkflowUsagesForStatus } from './get-workflow-usages-for-status';
import { workflowsStatusSearch } from './search';
import { workflowsStatusUpdateStatuses } from './update-statuses';

export const workflowsStatusTools = [
  workflowsStatusCreateStatuses,
  workflowsStatusDeleteStatusesById,
  workflowsStatusGetProjectIssueTypeUsagesForStatus,
  workflowsStatusGetProjectUsagesForStatus,
  workflowsStatusGetStatusesById,
  workflowsStatusGetStatusesByName,
  workflowsStatusGetWorkflowUsagesForStatus,
  workflowsStatusSearch,
  workflowsStatusUpdateStatuses,
];
