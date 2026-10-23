import { issuesIssuesAddAssignees } from "./add-assignees";
import { issuesIssuesAddBlockedByDependency } from "./add-blocked-by-dependency";
import { issuesIssuesAddIssueFieldValues } from "./add-issue-field-values";
import { issuesIssuesAddLabels } from "./add-labels";
import { issuesIssuesAddRelatesTo } from "./add-relates-to";
import { issuesIssuesAddSubIssue } from "./add-sub-issue";
import { issuesIssuesApproveSuggestion } from "./approve-suggestion";
import { issuesIssuesCheckUserCanBeAssigned } from "./check-user-can-be-assigned";
import { issuesIssuesCheckUserCanBeAssignedToIssue } from "./check-user-can-be-assigned-to-issue";
import { issuesIssuesCreate } from "./create";
import { issuesIssuesCreateComment } from "./create-comment";
import { issuesIssuesCreateLabel } from "./create-label";
import { issuesIssuesCreateMilestone } from "./create-milestone";
import { issuesIssuesDeleteComment } from "./delete-comment";
import { issuesIssuesDeleteIssueFieldValue } from "./delete-issue-field-value";
import { issuesIssuesDeleteLabel } from "./delete-label";
import { issuesIssuesDeleteMilestone } from "./delete-milestone";
import { issuesIssuesDismissSuggestion } from "./dismiss-suggestion";
import { issuesIssuesGet } from "./get";
import { issuesIssuesGetComment } from "./get-comment";
import { issuesIssuesGetEvent } from "./get-event";
import { issuesIssuesGetLabel } from "./get-label";
import { issuesIssuesGetMilestone } from "./get-milestone";
import { issuesIssuesGetParent } from "./get-parent";
import { issuesIssuesList } from "./list";
import { issuesIssuesListAssignees } from "./list-assignees";
import { issuesIssuesListComments } from "./list-comments";
import { issuesIssuesListCommentsForRepo } from "./list-comments-for-repo";
import { issuesIssuesListDependenciesBlockedBy } from "./list-dependencies-blocked-by";
import { issuesIssuesListDependenciesBlocking } from "./list-dependencies-blocking";
import { issuesIssuesListEvents } from "./list-events";
import { issuesIssuesListEventsForRepo } from "./list-events-for-repo";
import { issuesIssuesListEventsForTimeline } from "./list-events-for-timeline";
import { issuesIssuesListForAuthenticatedUser } from "./list-for-authenticated-user";
import { issuesIssuesListForOrg } from "./list-for-org";
import { issuesIssuesListForRepo } from "./list-for-repo";
import { issuesIssuesListIssueFieldValuesForIssue } from "./list-issue-field-values-for-issue";
import { issuesIssuesListLabelsForMilestone } from "./list-labels-for-milestone";
import { issuesIssuesListLabelsForRepo } from "./list-labels-for-repo";
import { issuesIssuesListLabelsOnIssue } from "./list-labels-on-issue";
import { issuesIssuesListMilestones } from "./list-milestones";
import { issuesIssuesListRelatesTo } from "./list-relates-to";
import { issuesIssuesListSubIssues } from "./list-sub-issues";
import { issuesIssuesListSuggestions } from "./list-suggestions";
import { issuesIssuesLock } from "./lock";
import { issuesIssuesPinComment } from "./pin-comment";
import { issuesIssuesRemoveAllLabels } from "./remove-all-labels";
import { issuesIssuesRemoveAssignees } from "./remove-assignees";
import { issuesIssuesRemoveDependencyBlockedBy } from "./remove-dependency-blocked-by";
import { issuesIssuesRemoveLabel } from "./remove-label";
import { issuesIssuesRemoveRelatesTo } from "./remove-relates-to";
import { issuesIssuesRemoveSubIssue } from "./remove-sub-issue";
import { issuesIssuesReprioritizeSubIssue } from "./reprioritize-sub-issue";
import { issuesIssuesSetIssueFieldValues } from "./set-issue-field-values";
import { issuesIssuesSetLabels } from "./set-labels";
import { issuesIssuesUnlock } from "./unlock";
import { issuesIssuesUnpinComment } from "./unpin-comment";
import { issuesIssuesUpdate } from "./update";
import { issuesIssuesUpdateComment } from "./update-comment";
import { issuesIssuesUpdateLabel } from "./update-label";
import { issuesIssuesUpdateMilestone } from "./update-milestone";

export const issuesIssuesTools = [
  issuesIssuesAddAssignees,
  issuesIssuesAddBlockedByDependency,
  issuesIssuesAddIssueFieldValues,
  issuesIssuesAddLabels,
  issuesIssuesAddRelatesTo,
  issuesIssuesAddSubIssue,
  issuesIssuesApproveSuggestion,
  issuesIssuesCheckUserCanBeAssigned,
  issuesIssuesCheckUserCanBeAssignedToIssue,
  issuesIssuesCreate,
  issuesIssuesCreateComment,
  issuesIssuesCreateLabel,
  issuesIssuesCreateMilestone,
  issuesIssuesDeleteComment,
  issuesIssuesDeleteIssueFieldValue,
  issuesIssuesDeleteLabel,
  issuesIssuesDeleteMilestone,
  issuesIssuesDismissSuggestion,
  issuesIssuesGet,
  issuesIssuesGetComment,
  issuesIssuesGetEvent,
  issuesIssuesGetLabel,
  issuesIssuesGetMilestone,
  issuesIssuesGetParent,
  issuesIssuesList,
  issuesIssuesListAssignees,
  issuesIssuesListComments,
  issuesIssuesListCommentsForRepo,
  issuesIssuesListDependenciesBlockedBy,
  issuesIssuesListDependenciesBlocking,
  issuesIssuesListEvents,
  issuesIssuesListEventsForRepo,
  issuesIssuesListEventsForTimeline,
  issuesIssuesListForAuthenticatedUser,
  issuesIssuesListForOrg,
  issuesIssuesListForRepo,
  issuesIssuesListIssueFieldValuesForIssue,
  issuesIssuesListLabelsForMilestone,
  issuesIssuesListLabelsForRepo,
  issuesIssuesListLabelsOnIssue,
  issuesIssuesListMilestones,
  issuesIssuesListRelatesTo,
  issuesIssuesListSubIssues,
  issuesIssuesListSuggestions,
  issuesIssuesLock,
  issuesIssuesPinComment,
  issuesIssuesRemoveAllLabels,
  issuesIssuesRemoveAssignees,
  issuesIssuesRemoveDependencyBlockedBy,
  issuesIssuesRemoveLabel,
  issuesIssuesRemoveRelatesTo,
  issuesIssuesRemoveSubIssue,
  issuesIssuesReprioritizeSubIssue,
  issuesIssuesSetIssueFieldValues,
  issuesIssuesSetLabels,
  issuesIssuesUnlock,
  issuesIssuesUnpinComment,
  issuesIssuesUpdate,
  issuesIssuesUpdateComment,
  issuesIssuesUpdateLabel,
  issuesIssuesUpdateMilestone,
];
