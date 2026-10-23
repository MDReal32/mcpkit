import { issuesMilestonesCreateGroupsMilestones } from './create-groups-milestones';
import { issuesMilestonesCreateProjectsMilestones } from './create-projects-milestones';
import { issuesMilestonesCreateProjectsMilestonesPromote } from './create-projects-milestones-promote';
import { issuesMilestonesDeleteGroupsMilestones } from './delete-groups-milestones';
import { issuesMilestonesDeleteProjectsMilestones } from './delete-projects-milestones';
import { issuesMilestonesGetGroupsMilestones } from './get-groups-milestones';
import { issuesMilestonesGetProjectsMilestones } from './get-projects-milestones';
import { issuesMilestonesListGroupsMilestones } from './list-groups-milestones';
import { issuesMilestonesListGroupsMilestonesBurndownEvents } from './list-groups-milestones-burndown-events';
import { issuesMilestonesListGroupsMilestonesIssues } from './list-groups-milestones-issues';
import { issuesMilestonesListGroupsMilestonesMergeRequests } from './list-groups-milestones-merge-requests';
import { issuesMilestonesListProjectsMilestones } from './list-projects-milestones';
import { issuesMilestonesListProjectsMilestonesBurndownEvents } from './list-projects-milestones-burndown-events';
import { issuesMilestonesListProjectsMilestonesIssues } from './list-projects-milestones-issues';
import { issuesMilestonesListProjectsMilestonesMergeRequests } from './list-projects-milestones-merge-requests';
import { issuesMilestonesUpdateGroupsMilestones } from './update-groups-milestones';
import { issuesMilestonesUpdateProjectsMilestones } from './update-projects-milestones';

export const issuesMilestonesTools = [
  issuesMilestonesCreateGroupsMilestones,
  issuesMilestonesCreateProjectsMilestones,
  issuesMilestonesCreateProjectsMilestonesPromote,
  issuesMilestonesDeleteGroupsMilestones,
  issuesMilestonesDeleteProjectsMilestones,
  issuesMilestonesGetGroupsMilestones,
  issuesMilestonesGetProjectsMilestones,
  issuesMilestonesListGroupsMilestones,
  issuesMilestonesListGroupsMilestonesBurndownEvents,
  issuesMilestonesListGroupsMilestonesIssues,
  issuesMilestonesListGroupsMilestonesMergeRequests,
  issuesMilestonesListProjectsMilestones,
  issuesMilestonesListProjectsMilestonesBurndownEvents,
  issuesMilestonesListProjectsMilestonesIssues,
  issuesMilestonesListProjectsMilestonesMergeRequests,
  issuesMilestonesUpdateGroupsMilestones,
  issuesMilestonesUpdateProjectsMilestones,
];
