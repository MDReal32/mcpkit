import { issuesIssueSearchCountIssues } from "./count-issues";
import { issuesIssueSearchGetIssuePickerResource } from "./get-issue-picker-resource";
import { issuesIssueSearchMatchIssues } from "./match-issues";
import { issuesIssueSearchSearchAndReconsileIssuesUsingJql } from "./search-and-reconsile-issues-using-jql";
import { issuesIssueSearchSearchAndReconsileIssuesUsingJqlPost } from "./search-and-reconsile-issues-using-jql-post";

export const issuesIssueSearchTools = [
  issuesIssueSearchCountIssues,
  issuesIssueSearchGetIssuePickerResource,
  issuesIssueSearchMatchIssues,
  issuesIssueSearchSearchAndReconsileIssuesUsingJql,
  issuesIssueSearchSearchAndReconsileIssuesUsingJqlPost,
];
