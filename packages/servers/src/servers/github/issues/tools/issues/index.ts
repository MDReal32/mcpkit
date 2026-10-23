import { issuesAddAssignees } from './add-assignees';
import { issuesAddBlockedByDependency } from './add-blocked-by-dependency';
import { issuesAddIssueFieldValues } from './add-issue-field-values';
import { issuesAddLabels } from './add-labels';
import { issuesAddRelatesTo } from './add-relates-to';
import { issuesAddSubIssue } from './add-sub-issue';
import { issuesApproveSuggestion } from './approve-suggestion';
import { issuesCheckUserCanBeAssigned } from './check-user-can-be-assigned';
import { issuesCheckUserCanBeAssignedToIssue } from './check-user-can-be-assigned-to-issue';
import { issuesCreate } from './create';
import { issuesCreateComment } from './create-comment';
import { issuesCreateLabel } from './create-label';
import { issuesCreateMilestone } from './create-milestone';
import { issuesDeleteComment } from './delete-comment';
import { issuesDeleteIssueFieldValue } from './delete-issue-field-value';
import { issuesDeleteLabel } from './delete-label';
import { issuesDeleteMilestone } from './delete-milestone';
import { issuesDismissSuggestion } from './dismiss-suggestion';
import { issuesGet } from './get';
import { issuesGetComment } from './get-comment';
import { issuesGetEvent } from './get-event';
import { issuesGetLabel } from './get-label';
import { issuesGetMilestone } from './get-milestone';
import { issuesGetParent } from './get-parent';
import { issuesList } from './list';
import { issuesListAssignees } from './list-assignees';
import { issuesListComments } from './list-comments';
import { issuesListCommentsForRepo } from './list-comments-for-repo';
import { issuesListDependenciesBlockedBy } from './list-dependencies-blocked-by';
import { issuesListDependenciesBlocking } from './list-dependencies-blocking';
import { issuesListEvents } from './list-events';
import { issuesListEventsForRepo } from './list-events-for-repo';
import { issuesListEventsForTimeline } from './list-events-for-timeline';
import { issuesListForAuthenticatedUser } from './list-for-authenticated-user';
import { issuesListForOrg } from './list-for-org';
import { issuesListForRepo } from './list-for-repo';
import { issuesListIssueFieldValuesForIssue } from './list-issue-field-values-for-issue';
import { issuesListLabelsForMilestone } from './list-labels-for-milestone';
import { issuesListLabelsForRepo } from './list-labels-for-repo';
import { issuesListLabelsOnIssue } from './list-labels-on-issue';
import { issuesListMilestones } from './list-milestones';
import { issuesListRelatesTo } from './list-relates-to';
import { issuesListSubIssues } from './list-sub-issues';
import { issuesListSuggestions } from './list-suggestions';
import { issuesLock } from './lock';
import { issuesPinComment } from './pin-comment';
import { issuesRemoveAllLabels } from './remove-all-labels';
import { issuesRemoveAssignees } from './remove-assignees';
import { issuesRemoveDependencyBlockedBy } from './remove-dependency-blocked-by';
import { issuesRemoveLabel } from './remove-label';
import { issuesRemoveRelatesTo } from './remove-relates-to';
import { issuesRemoveSubIssue } from './remove-sub-issue';
import { issuesReprioritizeSubIssue } from './reprioritize-sub-issue';
import { issuesSetIssueFieldValues } from './set-issue-field-values';
import { issuesSetLabels } from './set-labels';
import { issuesUnlock } from './unlock';
import { issuesUnpinComment } from './unpin-comment';
import { issuesUpdate } from './update';
import { issuesUpdateComment } from './update-comment';
import { issuesUpdateLabel } from './update-label';
import { issuesUpdateMilestone } from './update-milestone';

export const issuesTools = [
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
];
