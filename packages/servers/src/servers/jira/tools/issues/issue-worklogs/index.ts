import { issuesIssueWorklogsAddWorklog } from "./add-worklog";
import { issuesIssueWorklogsBulkDeleteWorklogs } from "./bulk-delete-worklogs";
import { issuesIssueWorklogsBulkMoveWorklogs } from "./bulk-move-worklogs";
import { issuesIssueWorklogsDeleteWorklog } from "./delete-worklog";
import { issuesIssueWorklogsGetIdsOfWorklogsDeletedSince } from "./get-ids-of-worklogs-deleted-since";
import { issuesIssueWorklogsGetIdsOfWorklogsModifiedSince } from "./get-ids-of-worklogs-modified-since";
import { issuesIssueWorklogsGetIssueWorklog } from "./get-issue-worklog";
import { issuesIssueWorklogsGetWorklog } from "./get-worklog";
import { issuesIssueWorklogsGetWorklogsForIds } from "./get-worklogs-for-ids";
import { issuesIssueWorklogsUpdateWorklog } from "./update-worklog";

export const issuesIssueWorklogsTools = [
  issuesIssueWorklogsAddWorklog,
  issuesIssueWorklogsBulkDeleteWorklogs,
  issuesIssueWorklogsBulkMoveWorklogs,
  issuesIssueWorklogsDeleteWorklog,
  issuesIssueWorklogsGetIdsOfWorklogsDeletedSince,
  issuesIssueWorklogsGetIdsOfWorklogsModifiedSince,
  issuesIssueWorklogsGetIssueWorklog,
  issuesIssueWorklogsGetWorklog,
  issuesIssueWorklogsGetWorklogsForIds,
  issuesIssueWorklogsUpdateWorklog,
];
