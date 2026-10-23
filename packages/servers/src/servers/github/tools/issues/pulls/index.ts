import { issuesPullsCheckIfMerged } from "./check-if-merged";
import { issuesPullsCreate } from "./create";
import { issuesPullsCreateReplyForReviewComment } from "./create-reply-for-review-comment";
import { issuesPullsCreateReview } from "./create-review";
import { issuesPullsCreateReviewComment } from "./create-review-comment";
import { issuesPullsDeletePendingReview } from "./delete-pending-review";
import { issuesPullsDeleteReviewComment } from "./delete-review-comment";
import { issuesPullsDismissReview } from "./dismiss-review";
import { issuesPullsGet } from "./get";
import { issuesPullsGetMergeAsyncResult } from "./get-merge-async-result";
import { issuesPullsGetReview } from "./get-review";
import { issuesPullsGetReviewComment } from "./get-review-comment";
import { issuesPullsList } from "./list";
import { issuesPullsListCommentsForReview } from "./list-comments-for-review";
import { issuesPullsListCommits } from "./list-commits";
import { issuesPullsListFiles } from "./list-files";
import { issuesPullsListRequestedReviewers } from "./list-requested-reviewers";
import { issuesPullsListReviewComments } from "./list-review-comments";
import { issuesPullsListReviewCommentsForRepo } from "./list-review-comments-for-repo";
import { issuesPullsListReviews } from "./list-reviews";
import { issuesPullsMerge } from "./merge";
import { issuesPullsMergeAsync } from "./merge-async";
import { issuesPullsRemoveRequestedReviewers } from "./remove-requested-reviewers";
import { issuesPullsRequestReviewers } from "./request-reviewers";
import { issuesPullsRerequestReviewers } from "./rerequest-reviewers";
import { issuesPullsSubmitReview } from "./submit-review";
import { issuesPullsUpdate } from "./update";
import { issuesPullsUpdateBranch } from "./update-branch";
import { issuesPullsUpdateReview } from "./update-review";
import { issuesPullsUpdateReviewComment } from "./update-review-comment";

export const issuesPullsTools = [
  issuesPullsCheckIfMerged,
  issuesPullsCreate,
  issuesPullsCreateReplyForReviewComment,
  issuesPullsCreateReview,
  issuesPullsCreateReviewComment,
  issuesPullsDeletePendingReview,
  issuesPullsDeleteReviewComment,
  issuesPullsDismissReview,
  issuesPullsGet,
  issuesPullsGetMergeAsyncResult,
  issuesPullsGetReview,
  issuesPullsGetReviewComment,
  issuesPullsList,
  issuesPullsListCommentsForReview,
  issuesPullsListCommits,
  issuesPullsListFiles,
  issuesPullsListRequestedReviewers,
  issuesPullsListReviewComments,
  issuesPullsListReviewCommentsForRepo,
  issuesPullsListReviews,
  issuesPullsMerge,
  issuesPullsMergeAsync,
  issuesPullsRemoveRequestedReviewers,
  issuesPullsRequestReviewers,
  issuesPullsRerequestReviewers,
  issuesPullsSubmitReview,
  issuesPullsUpdate,
  issuesPullsUpdateBranch,
  issuesPullsUpdateReview,
  issuesPullsUpdateReviewComment,
];
