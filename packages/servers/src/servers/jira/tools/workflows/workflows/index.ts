import { workflowsWorkflowsCopyWorkflow } from "./copy-workflow";
import { workflowsWorkflowsCreateWorkflows } from "./create-workflows";
import { workflowsWorkflowsDeleteInactiveWorkflow } from "./delete-inactive-workflow";
import { workflowsWorkflowsGetDefaultEditor } from "./get-default-editor";
import { workflowsWorkflowsGetProjectUsagesForWorkflow } from "./get-project-usages-for-workflow";
import { workflowsWorkflowsGetWorkflowProjectIssueTypeUsages } from "./get-workflow-project-issue-type-usages";
import { workflowsWorkflowsGetWorkflowSchemeUsagesForWorkflow } from "./get-workflow-scheme-usages-for-workflow";
import { workflowsWorkflowsGetWorkflowsPaginated } from "./get-workflows-paginated";
import { workflowsWorkflowsListWorkflowHistory } from "./list-workflow-history";
import { workflowsWorkflowsReadWorkflowFromHistory } from "./read-workflow-from-history";
import { workflowsWorkflowsReadWorkflowPreviews } from "./read-workflow-previews";
import { workflowsWorkflowsReadWorkflows } from "./read-workflows";
import { workflowsWorkflowsSearchWorkflows } from "./search-workflows";
import { workflowsWorkflowsUpdateWorkflows } from "./update-workflows";
import { workflowsWorkflowsValidateCreateWorkflows } from "./validate-create-workflows";
import { workflowsWorkflowsValidateUpdateWorkflows } from "./validate-update-workflows";
import { workflowsWorkflowsWorkflowCapabilities } from "./workflow-capabilities";

export const workflowsWorkflowsTools = [
  workflowsWorkflowsCopyWorkflow,
  workflowsWorkflowsCreateWorkflows,
  workflowsWorkflowsDeleteInactiveWorkflow,
  workflowsWorkflowsGetDefaultEditor,
  workflowsWorkflowsGetProjectUsagesForWorkflow,
  workflowsWorkflowsGetWorkflowProjectIssueTypeUsages,
  workflowsWorkflowsGetWorkflowSchemeUsagesForWorkflow,
  workflowsWorkflowsGetWorkflowsPaginated,
  workflowsWorkflowsListWorkflowHistory,
  workflowsWorkflowsReadWorkflowFromHistory,
  workflowsWorkflowsReadWorkflowPreviews,
  workflowsWorkflowsReadWorkflows,
  workflowsWorkflowsSearchWorkflows,
  workflowsWorkflowsUpdateWorkflows,
  workflowsWorkflowsValidateCreateWorkflows,
  workflowsWorkflowsValidateUpdateWorkflows,
  workflowsWorkflowsWorkflowCapabilities,
];
