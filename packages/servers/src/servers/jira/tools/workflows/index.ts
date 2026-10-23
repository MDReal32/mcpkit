import { workflowsIssuePrioritiesTools } from "./issue-priorities";
import { workflowsIssueResolutionsTools } from "./issue-resolutions";
import { workflowsIssueTypePropertiesTools } from "./issue-type-properties";
import { workflowsIssueTypeSchemesTools } from "./issue-type-schemes";
import { workflowsIssueTypeScreenSchemesTools } from "./issue-type-screen-schemes";
import { workflowsIssueTypesTools } from "./issue-types";
import { workflowsPrioritySchemesTools } from "./priority-schemes";
import { workflowsStatusTools } from "./status";
import { workflowsWorkflowSchemeDraftsTools } from "./workflow-scheme-drafts";
import { workflowsWorkflowSchemeProjectAssociationsTools } from "./workflow-scheme-project-associations";
import { workflowsWorkflowSchemesTools } from "./workflow-schemes";
import { workflowsWorkflowStatusCategoriesTools } from "./workflow-status-categories";
import { workflowsWorkflowStatusesTools } from "./workflow-statuses";
import { workflowsWorkflowTransitionRulesTools } from "./workflow-transition-rules";
import { workflowsWorkflowsTools } from "./workflows";

export const workflowsGroupTools = [
  ...workflowsIssuePrioritiesTools,
  ...workflowsIssueResolutionsTools,
  ...workflowsIssueTypePropertiesTools,
  ...workflowsIssueTypeSchemesTools,
  ...workflowsIssueTypeScreenSchemesTools,
  ...workflowsIssueTypesTools,
  ...workflowsPrioritySchemesTools,
  ...workflowsStatusTools,
  ...workflowsWorkflowSchemeDraftsTools,
  ...workflowsWorkflowSchemeProjectAssociationsTools,
  ...workflowsWorkflowSchemesTools,
  ...workflowsWorkflowStatusCategoriesTools,
  ...workflowsWorkflowStatusesTools,
  ...workflowsWorkflowTransitionRulesTools,
  ...workflowsWorkflowsTools,
];
