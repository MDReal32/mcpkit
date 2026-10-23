import { metaInstanceGetApplicationAppearance } from "./get-application-appearance";
import { metaInstanceGetApplicationSettings } from "./get-application-settings";
import { metaInstanceGetApplicationStatistics } from "./get-application-statistics";
import { metaInstanceUpdateApplicationAppearance } from "./update-application-appearance";
import { metaInstanceUpdateApplicationSettings } from "./update-application-settings";

export const metaInstanceTools = [
  metaInstanceGetApplicationAppearance,
  metaInstanceGetApplicationSettings,
  metaInstanceGetApplicationStatistics,
  metaInstanceUpdateApplicationAppearance,
  metaInstanceUpdateApplicationSettings,
];
