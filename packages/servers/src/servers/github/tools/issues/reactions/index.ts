import { issuesReactionsCreateForCommitComment } from "./create-for-commit-comment";
import { issuesReactionsCreateForIssue } from "./create-for-issue";
import { issuesReactionsCreateForIssueComment } from "./create-for-issue-comment";
import { issuesReactionsCreateForPullRequestReviewComment } from "./create-for-pull-request-review-comment";
import { issuesReactionsCreateForRelease } from "./create-for-release";
import { issuesReactionsDeleteForCommitComment } from "./delete-for-commit-comment";
import { issuesReactionsDeleteForIssue } from "./delete-for-issue";
import { issuesReactionsDeleteForIssueComment } from "./delete-for-issue-comment";
import { issuesReactionsDeleteForPullRequestComment } from "./delete-for-pull-request-comment";
import { issuesReactionsDeleteForRelease } from "./delete-for-release";
import { issuesReactionsListForCommitComment } from "./list-for-commit-comment";
import { issuesReactionsListForIssue } from "./list-for-issue";
import { issuesReactionsListForIssueComment } from "./list-for-issue-comment";
import { issuesReactionsListForPullRequestReviewComment } from "./list-for-pull-request-review-comment";
import { issuesReactionsListForRelease } from "./list-for-release";

export const issuesReactionsTools = [
  issuesReactionsCreateForCommitComment,
  issuesReactionsCreateForIssue,
  issuesReactionsCreateForIssueComment,
  issuesReactionsCreateForPullRequestReviewComment,
  issuesReactionsCreateForRelease,
  issuesReactionsDeleteForCommitComment,
  issuesReactionsDeleteForIssue,
  issuesReactionsDeleteForIssueComment,
  issuesReactionsDeleteForPullRequestComment,
  issuesReactionsDeleteForRelease,
  issuesReactionsListForCommitComment,
  issuesReactionsListForIssue,
  issuesReactionsListForIssueComment,
  issuesReactionsListForPullRequestReviewComment,
  issuesReactionsListForRelease,
];
