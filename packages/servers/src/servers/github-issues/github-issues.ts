import { defineGithubServer } from '../../providers/github';

import { issuesAddAssignees } from './tools/issues/add-assignees';
import { issuesAddBlockedByDependency } from './tools/issues/add-blocked-by-dependency';
import { issuesAddIssueFieldValues } from './tools/issues/add-issue-field-values';
import { issuesAddLabels } from './tools/issues/add-labels';
import { issuesAddRelatesTo } from './tools/issues/add-relates-to';
import { issuesAddSubIssue } from './tools/issues/add-sub-issue';
import { issuesApproveSuggestion } from './tools/issues/approve-suggestion';
import { issuesCheckUserCanBeAssigned } from './tools/issues/check-user-can-be-assigned';
import { issuesCheckUserCanBeAssignedToIssue } from './tools/issues/check-user-can-be-assigned-to-issue';
import { issuesCreate } from './tools/issues/create';
import { issuesCreateComment } from './tools/issues/create-comment';
import { issuesCreateLabel } from './tools/issues/create-label';
import { issuesCreateMilestone } from './tools/issues/create-milestone';
import { issuesDeleteComment } from './tools/issues/delete-comment';
import { issuesDeleteIssueFieldValue } from './tools/issues/delete-issue-field-value';
import { issuesDeleteLabel } from './tools/issues/delete-label';
import { issuesDeleteMilestone } from './tools/issues/delete-milestone';
import { issuesDismissSuggestion } from './tools/issues/dismiss-suggestion';
import { issuesGet } from './tools/issues/get';
import { issuesGetComment } from './tools/issues/get-comment';
import { issuesGetEvent } from './tools/issues/get-event';
import { issuesGetLabel } from './tools/issues/get-label';
import { issuesGetMilestone } from './tools/issues/get-milestone';
import { issuesGetParent } from './tools/issues/get-parent';
import { issuesList } from './tools/issues/list';
import { issuesListAssignees } from './tools/issues/list-assignees';
import { issuesListComments } from './tools/issues/list-comments';
import { issuesListCommentsForRepo } from './tools/issues/list-comments-for-repo';
import { issuesListDependenciesBlockedBy } from './tools/issues/list-dependencies-blocked-by';
import { issuesListDependenciesBlocking } from './tools/issues/list-dependencies-blocking';
import { issuesListEvents } from './tools/issues/list-events';
import { issuesListEventsForRepo } from './tools/issues/list-events-for-repo';
import { issuesListEventsForTimeline } from './tools/issues/list-events-for-timeline';
import { issuesListForAuthenticatedUser } from './tools/issues/list-for-authenticated-user';
import { issuesListForOrg } from './tools/issues/list-for-org';
import { issuesListForRepo } from './tools/issues/list-for-repo';
import { issuesListIssueFieldValuesForIssue } from './tools/issues/list-issue-field-values-for-issue';
import { issuesListLabelsForMilestone } from './tools/issues/list-labels-for-milestone';
import { issuesListLabelsForRepo } from './tools/issues/list-labels-for-repo';
import { issuesListLabelsOnIssue } from './tools/issues/list-labels-on-issue';
import { issuesListMilestones } from './tools/issues/list-milestones';
import { issuesListRelatesTo } from './tools/issues/list-relates-to';
import { issuesListSubIssues } from './tools/issues/list-sub-issues';
import { issuesListSuggestions } from './tools/issues/list-suggestions';
import { issuesLock } from './tools/issues/lock';
import { issuesPinComment } from './tools/issues/pin-comment';
import { issuesRemoveAllLabels } from './tools/issues/remove-all-labels';
import { issuesRemoveAssignees } from './tools/issues/remove-assignees';
import { issuesRemoveDependencyBlockedBy } from './tools/issues/remove-dependency-blocked-by';
import { issuesRemoveLabel } from './tools/issues/remove-label';
import { issuesRemoveRelatesTo } from './tools/issues/remove-relates-to';
import { issuesRemoveSubIssue } from './tools/issues/remove-sub-issue';
import { issuesReprioritizeSubIssue } from './tools/issues/reprioritize-sub-issue';
import { issuesSetIssueFieldValues } from './tools/issues/set-issue-field-values';
import { issuesSetLabels } from './tools/issues/set-labels';
import { issuesUnlock } from './tools/issues/unlock';
import { issuesUnpinComment } from './tools/issues/unpin-comment';
import { issuesUpdate } from './tools/issues/update';
import { issuesUpdateComment } from './tools/issues/update-comment';
import { issuesUpdateLabel } from './tools/issues/update-label';
import { issuesUpdateMilestone } from './tools/issues/update-milestone';
import { projectsAddFieldForOrg } from './tools/projects/add-field-for-org';
import { projectsAddFieldForUser } from './tools/projects/add-field-for-user';
import { projectsAddItemForOrg } from './tools/projects/add-item-for-org';
import { projectsAddItemForUser } from './tools/projects/add-item-for-user';
import { projectsCreateDraftItemForAuthenticatedUser } from './tools/projects/create-draft-item-for-authenticated-user';
import { projectsCreateDraftItemForOrg } from './tools/projects/create-draft-item-for-org';
import { projectsCreateViewForOrg } from './tools/projects/create-view-for-org';
import { projectsCreateViewForUser } from './tools/projects/create-view-for-user';
import { projectsDeleteItemForOrg } from './tools/projects/delete-item-for-org';
import { projectsDeleteItemForUser } from './tools/projects/delete-item-for-user';
import { projectsGetFieldForOrg } from './tools/projects/get-field-for-org';
import { projectsGetFieldForUser } from './tools/projects/get-field-for-user';
import { projectsGetForOrg } from './tools/projects/get-for-org';
import { projectsGetForUser } from './tools/projects/get-for-user';
import { projectsGetOrgItem } from './tools/projects/get-org-item';
import { projectsGetUserItem } from './tools/projects/get-user-item';
import { projectsListFieldsForOrg } from './tools/projects/list-fields-for-org';
import { projectsListFieldsForUser } from './tools/projects/list-fields-for-user';
import { projectsListForOrg } from './tools/projects/list-for-org';
import { projectsListForUser } from './tools/projects/list-for-user';
import { projectsListItemsForOrg } from './tools/projects/list-items-for-org';
import { projectsListItemsForUser } from './tools/projects/list-items-for-user';
import { projectsListViewItemsForOrg } from './tools/projects/list-view-items-for-org';
import { projectsListViewItemsForUser } from './tools/projects/list-view-items-for-user';
import { projectsUpdateItemForOrg } from './tools/projects/update-item-for-org';
import { projectsUpdateItemForUser } from './tools/projects/update-item-for-user';
import { pullRequestStacksAdd } from './tools/pull-request-stacks/add';
import { pullRequestStacksCreate } from './tools/pull-request-stacks/create';
import { pullRequestStacksGet } from './tools/pull-request-stacks/get';
import { pullRequestStacksList } from './tools/pull-request-stacks/list';
import { pullRequestStacksUnstack } from './tools/pull-request-stacks/unstack';
import { pullsCheckIfMerged } from './tools/pulls/check-if-merged';
import { pullsCreate } from './tools/pulls/create';
import { pullsCreateReplyForReviewComment } from './tools/pulls/create-reply-for-review-comment';
import { pullsCreateReview } from './tools/pulls/create-review';
import { pullsCreateReviewComment } from './tools/pulls/create-review-comment';
import { pullsDeletePendingReview } from './tools/pulls/delete-pending-review';
import { pullsDeleteReviewComment } from './tools/pulls/delete-review-comment';
import { pullsDismissReview } from './tools/pulls/dismiss-review';
import { pullsGet } from './tools/pulls/get';
import { pullsGetMergeAsyncResult } from './tools/pulls/get-merge-async-result';
import { pullsGetReview } from './tools/pulls/get-review';
import { pullsGetReviewComment } from './tools/pulls/get-review-comment';
import { pullsList } from './tools/pulls/list';
import { pullsListCommentsForReview } from './tools/pulls/list-comments-for-review';
import { pullsListCommits } from './tools/pulls/list-commits';
import { pullsListFiles } from './tools/pulls/list-files';
import { pullsListRequestedReviewers } from './tools/pulls/list-requested-reviewers';
import { pullsListReviewComments } from './tools/pulls/list-review-comments';
import { pullsListReviewCommentsForRepo } from './tools/pulls/list-review-comments-for-repo';
import { pullsListReviews } from './tools/pulls/list-reviews';
import { pullsMerge } from './tools/pulls/merge';
import { pullsMergeAsync } from './tools/pulls/merge-async';
import { pullsRemoveRequestedReviewers } from './tools/pulls/remove-requested-reviewers';
import { pullsRequestReviewers } from './tools/pulls/request-reviewers';
import { pullsRerequestReviewers } from './tools/pulls/rerequest-reviewers';
import { pullsSubmitReview } from './tools/pulls/submit-review';
import { pullsUpdate } from './tools/pulls/update';
import { pullsUpdateBranch } from './tools/pulls/update-branch';
import { pullsUpdateReview } from './tools/pulls/update-review';
import { pullsUpdateReviewComment } from './tools/pulls/update-review-comment';
import { reactionsCreateForCommitComment } from './tools/reactions/create-for-commit-comment';
import { reactionsCreateForIssue } from './tools/reactions/create-for-issue';
import { reactionsCreateForIssueComment } from './tools/reactions/create-for-issue-comment';
import { reactionsCreateForPullRequestReviewComment } from './tools/reactions/create-for-pull-request-review-comment';
import { reactionsCreateForRelease } from './tools/reactions/create-for-release';
import { reactionsDeleteForCommitComment } from './tools/reactions/delete-for-commit-comment';
import { reactionsDeleteForIssue } from './tools/reactions/delete-for-issue';
import { reactionsDeleteForIssueComment } from './tools/reactions/delete-for-issue-comment';
import { reactionsDeleteForPullRequestComment } from './tools/reactions/delete-for-pull-request-comment';
import { reactionsDeleteForRelease } from './tools/reactions/delete-for-release';
import { reactionsListForCommitComment } from './tools/reactions/list-for-commit-comment';
import { reactionsListForIssue } from './tools/reactions/list-for-issue';
import { reactionsListForIssueComment } from './tools/reactions/list-for-issue-comment';
import { reactionsListForPullRequestReviewComment } from './tools/reactions/list-for-pull-request-review-comment';
import { reactionsListForRelease } from './tools/reactions/list-for-release';

export const githubIssues = defineGithubServer({
  name: 'github_issues',
  description: 'GitHub REST API: issues, pull requests, reactions, projects.',
  tools: [
    issuesAddAssignees,
    issuesAddBlockedByDependency,
    issuesAddIssueFieldValues,
    issuesAddLabels,
    issuesAddRelatesTo,
    issuesAddSubIssue,
    issuesApproveSuggestion,
    issuesCheckUserCanBeAssigned,
    issuesCheckUserCanBeAssignedToIssue,
    issuesCreate,
    issuesCreateComment,
    issuesCreateLabel,
    issuesCreateMilestone,
    issuesDeleteComment,
    issuesDeleteIssueFieldValue,
    issuesDeleteLabel,
    issuesDeleteMilestone,
    issuesDismissSuggestion,
    issuesGet,
    issuesGetComment,
    issuesGetEvent,
    issuesGetLabel,
    issuesGetMilestone,
    issuesGetParent,
    issuesList,
    issuesListAssignees,
    issuesListComments,
    issuesListCommentsForRepo,
    issuesListDependenciesBlockedBy,
    issuesListDependenciesBlocking,
    issuesListEvents,
    issuesListEventsForRepo,
    issuesListEventsForTimeline,
    issuesListForAuthenticatedUser,
    issuesListForOrg,
    issuesListForRepo,
    issuesListIssueFieldValuesForIssue,
    issuesListLabelsForMilestone,
    issuesListLabelsForRepo,
    issuesListLabelsOnIssue,
    issuesListMilestones,
    issuesListRelatesTo,
    issuesListSubIssues,
    issuesListSuggestions,
    issuesLock,
    issuesPinComment,
    issuesRemoveAllLabels,
    issuesRemoveAssignees,
    issuesRemoveDependencyBlockedBy,
    issuesRemoveLabel,
    issuesRemoveRelatesTo,
    issuesRemoveSubIssue,
    issuesReprioritizeSubIssue,
    issuesSetIssueFieldValues,
    issuesSetLabels,
    issuesUnlock,
    issuesUnpinComment,
    issuesUpdate,
    issuesUpdateComment,
    issuesUpdateLabel,
    issuesUpdateMilestone,
    projectsAddFieldForOrg,
    projectsAddFieldForUser,
    projectsAddItemForOrg,
    projectsAddItemForUser,
    projectsCreateDraftItemForAuthenticatedUser,
    projectsCreateDraftItemForOrg,
    projectsCreateViewForOrg,
    projectsCreateViewForUser,
    projectsDeleteItemForOrg,
    projectsDeleteItemForUser,
    projectsGetFieldForOrg,
    projectsGetFieldForUser,
    projectsGetForOrg,
    projectsGetForUser,
    projectsGetOrgItem,
    projectsGetUserItem,
    projectsListFieldsForOrg,
    projectsListFieldsForUser,
    projectsListForOrg,
    projectsListForUser,
    projectsListItemsForOrg,
    projectsListItemsForUser,
    projectsListViewItemsForOrg,
    projectsListViewItemsForUser,
    projectsUpdateItemForOrg,
    projectsUpdateItemForUser,
    pullRequestStacksAdd,
    pullRequestStacksCreate,
    pullRequestStacksGet,
    pullRequestStacksList,
    pullRequestStacksUnstack,
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
  ],
});
