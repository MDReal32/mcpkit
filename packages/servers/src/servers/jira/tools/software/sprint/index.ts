import { softwareSprintCreateSprint } from "./create-sprint";
import { softwareSprintDeleteProperty } from "./delete-property";
import { softwareSprintDeleteSprint } from "./delete-sprint";
import { softwareSprintGetIssuesForSprint } from "./get-issues-for-sprint";
import { softwareSprintGetPropertiesKeys } from "./get-properties-keys";
import { softwareSprintGetProperty } from "./get-property";
import { softwareSprintGetSprint } from "./get-sprint";
import { softwareSprintMoveIssuesToSprintAndRank } from "./move-issues-to-sprint-and-rank";
import { softwareSprintPartiallyUpdateSprint } from "./partially-update-sprint";
import { softwareSprintSwapSprint } from "./swap-sprint";
import { softwareSprintUpdateSprint } from "./update-sprint";

export const softwareSprintTools = [
  softwareSprintCreateSprint,
  softwareSprintDeleteProperty,
  softwareSprintDeleteSprint,
  softwareSprintGetIssuesForSprint,
  softwareSprintGetPropertiesKeys,
  softwareSprintGetProperty,
  softwareSprintGetSprint,
  softwareSprintMoveIssuesToSprintAndRank,
  softwareSprintPartiallyUpdateSprint,
  softwareSprintSwapSprint,
  softwareSprintUpdateSprint,
];
