import { softwareIssueEstimateIssueForBoard } from './estimate-issue-for-board';
import { softwareIssueGetIssue } from './get-issue';
import { softwareIssueGetIssueEstimationForBoard } from './get-issue-estimation-for-board';
import { softwareIssueRankIssues } from './rank-issues';

export const softwareIssueTools = [
  softwareIssueEstimateIssueForBoard,
  softwareIssueGetIssue,
  softwareIssueGetIssueEstimationForBoard,
  softwareIssueRankIssues,
];
