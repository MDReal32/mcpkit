import { issuesIssuePropertiesBulkDeleteIssueProperty } from './bulk-delete-issue-property';
import { issuesIssuePropertiesBulkSetIssuePropertiesByIssue } from './bulk-set-issue-properties-by-issue';
import { issuesIssuePropertiesBulkSetIssueProperty } from './bulk-set-issue-property';
import { issuesIssuePropertiesBulkSetIssuesPropertiesList } from './bulk-set-issues-properties-list';
import { issuesIssuePropertiesDeleteIssueProperty } from './delete-issue-property';
import { issuesIssuePropertiesGetIssueProperty } from './get-issue-property';
import { issuesIssuePropertiesGetIssuePropertyKeys } from './get-issue-property-keys';

export const issuesIssuePropertiesTools = [
  issuesIssuePropertiesBulkDeleteIssueProperty,
  issuesIssuePropertiesBulkSetIssuePropertiesByIssue,
  issuesIssuePropertiesBulkSetIssueProperty,
  issuesIssuePropertiesBulkSetIssuesPropertiesList,
  issuesIssuePropertiesDeleteIssueProperty,
  issuesIssuePropertiesGetIssueProperty,
  issuesIssuePropertiesGetIssuePropertyKeys,
];
