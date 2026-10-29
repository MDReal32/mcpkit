import { slugify } from "../../utils/naming/slugify";

/** Apostrophes are dropped first, so `Get Task's Time in Status` reads `get-tasks-time-in-status`. */
export const toActionFile = (summary: string) => slugify(summary.replaceAll("'", ""));
