import { issuesIssueCommentsAddComment } from './add-comment';
import { issuesIssueCommentsDeleteComment } from './delete-comment';
import { issuesIssueCommentsGetComment } from './get-comment';
import { issuesIssueCommentsGetComments } from './get-comments';
import { issuesIssueCommentsGetCommentsByIds } from './get-comments-by-ids';
import { issuesIssueCommentsUpdateComment } from './update-comment';

export const issuesIssueCommentsTools = [
  issuesIssueCommentsAddComment,
  issuesIssueCommentsDeleteComment,
  issuesIssueCommentsGetComment,
  issuesIssueCommentsGetComments,
  issuesIssueCommentsGetCommentsByIds,
  issuesIssueCommentsUpdateComment,
];
