import { softwareEpicGetEpic } from './get-epic';
import { softwareEpicGetIssuesForEpic } from './get-issues-for-epic';
import { softwareEpicGetIssuesWithoutEpic } from './get-issues-without-epic';
import { softwareEpicMoveIssuesToEpic } from './move-issues-to-epic';
import { softwareEpicPartiallyUpdateEpic } from './partially-update-epic';
import { softwareEpicRankEpics } from './rank-epics';
import { softwareEpicRemoveIssuesFromEpic } from './remove-issues-from-epic';

export const softwareEpicTools = [
  softwareEpicGetEpic,
  softwareEpicGetIssuesForEpic,
  softwareEpicGetIssuesWithoutEpic,
  softwareEpicMoveIssuesToEpic,
  softwareEpicPartiallyUpdateEpic,
  softwareEpicRankEpics,
  softwareEpicRemoveIssuesFromEpic,
];
