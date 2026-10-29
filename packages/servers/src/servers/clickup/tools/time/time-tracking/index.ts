import { timeTimeTrackingAddTagsFromTimeEntries } from "./add-tags-from-time-entries";
import { timeTimeTrackingChangeTagNamesFromTimeEntries } from "./change-tag-names-from-time-entries";
import { timeTimeTrackingCreateATimeEntry } from "./create-a-time-entry";
import { timeTimeTrackingDeleteATimeEntry } from "./delete-a-time-entry";
import { timeTimeTrackingGetAllTagsFromTimeEntries } from "./get-all-tags-from-time-entries";
import { timeTimeTrackingGetRunningTimeEntry } from "./get-running-time-entry";
import { timeTimeTrackingGetSingularTimeEntry } from "./get-singular-time-entry";
import { timeTimeTrackingGetTimeEntriesWithinADateRange } from "./get-time-entries-within-a-date-range";
import { timeTimeTrackingGetTimeEntryHistory } from "./get-time-entry-history";
import { timeTimeTrackingRemoveTagsFromTimeEntries } from "./remove-tags-from-time-entries";
import { timeTimeTrackingStartATimeEntry } from "./start-a-time-entry";
import { timeTimeTrackingStopATimeEntry } from "./stop-a-time-entry";
import { timeTimeTrackingUpdateATimeEntry } from "./update-a-time-entry";

export const timeTimeTrackingTools = [
  timeTimeTrackingAddTagsFromTimeEntries,
  timeTimeTrackingChangeTagNamesFromTimeEntries,
  timeTimeTrackingCreateATimeEntry,
  timeTimeTrackingDeleteATimeEntry,
  timeTimeTrackingGetAllTagsFromTimeEntries,
  timeTimeTrackingGetRunningTimeEntry,
  timeTimeTrackingGetSingularTimeEntry,
  timeTimeTrackingGetTimeEntriesWithinADateRange,
  timeTimeTrackingGetTimeEntryHistory,
  timeTimeTrackingRemoveTagsFromTimeEntries,
  timeTimeTrackingStartATimeEntry,
  timeTimeTrackingStopATimeEntry,
  timeTimeTrackingUpdateATimeEntry,
];
