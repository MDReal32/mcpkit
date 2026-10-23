import { issuesIssuesArchiveIssues } from './archive-issues';
import { issuesIssuesArchiveIssuesAsync } from './archive-issues-async';
import { issuesIssuesAssignIssue } from './assign-issue';
import { issuesIssuesBulkFetchIssues } from './bulk-fetch-issues';
import { issuesIssuesCreateIssue } from './create-issue';
import { issuesIssuesCreateIssues } from './create-issues';
import { issuesIssuesDeleteIssue } from './delete-issue';
import { issuesIssuesDoTransition } from './do-transition';
import { issuesIssuesEditIssue } from './edit-issue';
import { issuesIssuesExportArchivedIssues } from './export-archived-issues';
import { issuesIssuesGetBulkChangelogs } from './get-bulk-changelogs';
import { issuesIssuesGetChangeLogs } from './get-change-logs';
import { issuesIssuesGetChangeLogsByIds } from './get-change-logs-by-ids';
import { issuesIssuesGetCreateIssueMeta } from './get-create-issue-meta';
import { issuesIssuesGetCreateIssueMetaIssueTypeId } from './get-create-issue-meta-issue-type-id';
import { issuesIssuesGetCreateIssueMetaIssueTypes } from './get-create-issue-meta-issue-types';
import { issuesIssuesGetEditIssueMeta } from './get-edit-issue-meta';
import { issuesIssuesGetEvents } from './get-events';
import { issuesIssuesGetIssue } from './get-issue';
import { issuesIssuesGetIssueAdfLimitReport } from './get-issue-adf-limit-report';
import { issuesIssuesGetIssueLimitReport } from './get-issue-limit-report';
import { issuesIssuesGetTransitions } from './get-transitions';
import { issuesIssuesNotify } from './notify';
import { issuesIssuesUnarchiveIssues } from './unarchive-issues';

export const issuesIssuesTools = [
  issuesIssuesArchiveIssues,
  issuesIssuesArchiveIssuesAsync,
  issuesIssuesAssignIssue,
  issuesIssuesBulkFetchIssues,
  issuesIssuesCreateIssue,
  issuesIssuesCreateIssues,
  issuesIssuesDeleteIssue,
  issuesIssuesDoTransition,
  issuesIssuesEditIssue,
  issuesIssuesExportArchivedIssues,
  issuesIssuesGetBulkChangelogs,
  issuesIssuesGetChangeLogs,
  issuesIssuesGetChangeLogsByIds,
  issuesIssuesGetCreateIssueMeta,
  issuesIssuesGetCreateIssueMetaIssueTypeId,
  issuesIssuesGetCreateIssueMetaIssueTypes,
  issuesIssuesGetEditIssueMeta,
  issuesIssuesGetEvents,
  issuesIssuesGetIssue,
  issuesIssuesGetIssueAdfLimitReport,
  issuesIssuesGetIssueLimitReport,
  issuesIssuesGetTransitions,
  issuesIssuesNotify,
  issuesIssuesUnarchiveIssues,
];
