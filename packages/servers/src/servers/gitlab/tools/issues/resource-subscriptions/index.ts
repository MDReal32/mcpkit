import { issuesResourceSubscriptionsCreateGroupsLabelsSubscribe } from './create-groups-labels-subscribe';
import { issuesResourceSubscriptionsCreateGroupsLabelsUnsubscribe } from './create-groups-labels-unsubscribe';
import { issuesResourceSubscriptionsCreateProjectsIssuesSubscribe } from './create-projects-issues-subscribe';
import { issuesResourceSubscriptionsCreateProjectsIssuesUnsubscribe } from './create-projects-issues-unsubscribe';
import { issuesResourceSubscriptionsCreateProjectsLabelsSubscribe } from './create-projects-labels-subscribe';
import { issuesResourceSubscriptionsCreateProjectsLabelsUnsubscribe } from './create-projects-labels-unsubscribe';
import { issuesResourceSubscriptionsCreateProjectsMergeRequestsSubscribe } from './create-projects-merge-requests-subscribe';
import { issuesResourceSubscriptionsCreateProjectsMergeRequestsUnsubscribe } from './create-projects-merge-requests-unsubscribe';

export const issuesResourceSubscriptionsTools = [
  issuesResourceSubscriptionsCreateGroupsLabelsSubscribe,
  issuesResourceSubscriptionsCreateGroupsLabelsUnsubscribe,
  issuesResourceSubscriptionsCreateProjectsIssuesSubscribe,
  issuesResourceSubscriptionsCreateProjectsIssuesUnsubscribe,
  issuesResourceSubscriptionsCreateProjectsLabelsSubscribe,
  issuesResourceSubscriptionsCreateProjectsLabelsUnsubscribe,
  issuesResourceSubscriptionsCreateProjectsMergeRequestsSubscribe,
  issuesResourceSubscriptionsCreateProjectsMergeRequestsUnsubscribe,
];
