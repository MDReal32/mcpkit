import { workflowsIssueTypesCreateIssueType } from "./create-issue-type";
import { workflowsIssueTypesCreateIssueTypeAvatar } from "./create-issue-type-avatar";
import { workflowsIssueTypesDeleteIssueType } from "./delete-issue-type";
import { workflowsIssueTypesGetAlternativeIssueTypes } from "./get-alternative-issue-types";
import { workflowsIssueTypesGetIssueAllTypes } from "./get-issue-all-types";
import { workflowsIssueTypesGetIssueType } from "./get-issue-type";
import { workflowsIssueTypesGetIssueTypesForProject } from "./get-issue-types-for-project";
import { workflowsIssueTypesUpdateIssueType } from "./update-issue-type";

export const workflowsIssueTypesTools = [
  workflowsIssueTypesCreateIssueType,
  workflowsIssueTypesCreateIssueTypeAvatar,
  workflowsIssueTypesDeleteIssueType,
  workflowsIssueTypesGetAlternativeIssueTypes,
  workflowsIssueTypesGetIssueAllTypes,
  workflowsIssueTypesGetIssueType,
  workflowsIssueTypesGetIssueTypesForProject,
  workflowsIssueTypesUpdateIssueType,
];
