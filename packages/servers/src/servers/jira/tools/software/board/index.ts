import { softwareBoardCreateBoard } from './create-board';
import { softwareBoardDeleteBoard } from './delete-board';
import { softwareBoardDeleteBoardProperty } from './delete-board-property';
import { softwareBoardGetAllBoards } from './get-all-boards';
import { softwareBoardGetAllQuickFilters } from './get-all-quick-filters';
import { softwareBoardGetAllSprints } from './get-all-sprints';
import { softwareBoardGetAllVersions } from './get-all-versions';
import { softwareBoardGetBoard } from './get-board';
import { softwareBoardGetBoardByFilterId } from './get-board-by-filter-id';
import { softwareBoardGetBoardIssuesForEpic } from './get-board-issues-for-epic';
import { softwareBoardGetBoardIssuesForSprint } from './get-board-issues-for-sprint';
import { softwareBoardGetBoardProperty } from './get-board-property';
import { softwareBoardGetBoardPropertyKeys } from './get-board-property-keys';
import { softwareBoardGetConfiguration } from './get-configuration';
import { softwareBoardGetEpics } from './get-epics';
import { softwareBoardGetFeaturesForBoard } from './get-features-for-board';
import { softwareBoardGetIssuesForBacklog } from './get-issues-for-backlog';
import { softwareBoardGetIssuesForBoard } from './get-issues-for-board';
import { softwareBoardGetIssuesWithoutEpicForBoard } from './get-issues-without-epic-for-board';
import { softwareBoardGetProjects } from './get-projects';
import { softwareBoardGetProjectsFull } from './get-projects-full';
import { softwareBoardGetQuickFilter } from './get-quick-filter';
import { softwareBoardGetReportsForBoard } from './get-reports-for-board';
import { softwareBoardMoveIssuesToBoard } from './move-issues-to-board';
import { softwareBoardToggleFeatures } from './toggle-features';

export const softwareBoardTools = [
  softwareBoardCreateBoard,
  softwareBoardDeleteBoard,
  softwareBoardDeleteBoardProperty,
  softwareBoardGetAllBoards,
  softwareBoardGetAllQuickFilters,
  softwareBoardGetAllSprints,
  softwareBoardGetAllVersions,
  softwareBoardGetBoard,
  softwareBoardGetBoardByFilterId,
  softwareBoardGetBoardIssuesForEpic,
  softwareBoardGetBoardIssuesForSprint,
  softwareBoardGetBoardProperty,
  softwareBoardGetBoardPropertyKeys,
  softwareBoardGetConfiguration,
  softwareBoardGetEpics,
  softwareBoardGetFeaturesForBoard,
  softwareBoardGetIssuesForBacklog,
  softwareBoardGetIssuesForBoard,
  softwareBoardGetIssuesWithoutEpicForBoard,
  softwareBoardGetProjects,
  softwareBoardGetProjectsFull,
  softwareBoardGetQuickFilter,
  softwareBoardGetReportsForBoard,
  softwareBoardMoveIssuesToBoard,
  softwareBoardToggleFeatures,
];
