import { issuesIssueWatchersAddWatcher } from "./add-watcher";
import { issuesIssueWatchersGetIsWatchingIssueBulk } from "./get-is-watching-issue-bulk";
import { issuesIssueWatchersGetIssueWatchers } from "./get-issue-watchers";
import { issuesIssueWatchersRemoveWatcher } from "./remove-watcher";

export const issuesIssueWatchersTools = [
  issuesIssueWatchersAddWatcher,
  issuesIssueWatchersGetIsWatchingIssueBulk,
  issuesIssueWatchersGetIssueWatchers,
  issuesIssueWatchersRemoveWatcher,
];
