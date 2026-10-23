import { reactionsCreateForCommitComment } from './create-for-commit-comment';
import { reactionsCreateForIssue } from './create-for-issue';
import { reactionsCreateForIssueComment } from './create-for-issue-comment';
import { reactionsCreateForPullRequestReviewComment } from './create-for-pull-request-review-comment';
import { reactionsCreateForRelease } from './create-for-release';
import { reactionsDeleteForCommitComment } from './delete-for-commit-comment';
import { reactionsDeleteForIssue } from './delete-for-issue';
import { reactionsDeleteForIssueComment } from './delete-for-issue-comment';
import { reactionsDeleteForPullRequestComment } from './delete-for-pull-request-comment';
import { reactionsDeleteForRelease } from './delete-for-release';
import { reactionsListForCommitComment } from './list-for-commit-comment';
import { reactionsListForIssue } from './list-for-issue';
import { reactionsListForIssueComment } from './list-for-issue-comment';
import { reactionsListForPullRequestReviewComment } from './list-for-pull-request-review-comment';
import { reactionsListForRelease } from './list-for-release';

export const reactionsTools = [
  reactionsCreateForCommitComment,
  reactionsCreateForIssue,
  reactionsCreateForIssueComment,
  reactionsCreateForPullRequestReviewComment,
  reactionsCreateForRelease,
  reactionsDeleteForCommitComment,
  reactionsDeleteForIssue,
  reactionsDeleteForIssueComment,
  reactionsDeleteForPullRequestComment,
  reactionsDeleteForRelease,
  reactionsListForCommitComment,
  reactionsListForIssue,
  reactionsListForIssueComment,
  reactionsListForPullRequestReviewComment,
  reactionsListForRelease,
];
