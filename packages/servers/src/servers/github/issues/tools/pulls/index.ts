import { pullsCheckIfMerged } from './check-if-merged';
import { pullsCreate } from './create';
import { pullsCreateReplyForReviewComment } from './create-reply-for-review-comment';
import { pullsCreateReview } from './create-review';
import { pullsCreateReviewComment } from './create-review-comment';
import { pullsDeletePendingReview } from './delete-pending-review';
import { pullsDeleteReviewComment } from './delete-review-comment';
import { pullsDismissReview } from './dismiss-review';
import { pullsGet } from './get';
import { pullsGetMergeAsyncResult } from './get-merge-async-result';
import { pullsGetReview } from './get-review';
import { pullsGetReviewComment } from './get-review-comment';
import { pullsList } from './list';
import { pullsListCommentsForReview } from './list-comments-for-review';
import { pullsListCommits } from './list-commits';
import { pullsListFiles } from './list-files';
import { pullsListRequestedReviewers } from './list-requested-reviewers';
import { pullsListReviewComments } from './list-review-comments';
import { pullsListReviewCommentsForRepo } from './list-review-comments-for-repo';
import { pullsListReviews } from './list-reviews';
import { pullsMerge } from './merge';
import { pullsMergeAsync } from './merge-async';
import { pullsRemoveRequestedReviewers } from './remove-requested-reviewers';
import { pullsRequestReviewers } from './request-reviewers';
import { pullsRerequestReviewers } from './rerequest-reviewers';
import { pullsSubmitReview } from './submit-review';
import { pullsUpdate } from './update';
import { pullsUpdateBranch } from './update-branch';
import { pullsUpdateReview } from './update-review';
import { pullsUpdateReviewComment } from './update-review-comment';

export const pullsTools = [
  pullsCheckIfMerged,
  pullsCreate,
  pullsCreateReplyForReviewComment,
  pullsCreateReview,
  pullsCreateReviewComment,
  pullsDeletePendingReview,
  pullsDeleteReviewComment,
  pullsDismissReview,
  pullsGet,
  pullsGetMergeAsyncResult,
  pullsGetReview,
  pullsGetReviewComment,
  pullsList,
  pullsListCommentsForReview,
  pullsListCommits,
  pullsListFiles,
  pullsListRequestedReviewers,
  pullsListReviewComments,
  pullsListReviewCommentsForRepo,
  pullsListReviews,
  pullsMerge,
  pullsMergeAsync,
  pullsRemoveRequestedReviewers,
  pullsRequestReviewers,
  pullsRerequestReviewers,
  pullsSubmitReview,
  pullsUpdate,
  pullsUpdateBranch,
  pullsUpdateReview,
  pullsUpdateReviewComment,
];
