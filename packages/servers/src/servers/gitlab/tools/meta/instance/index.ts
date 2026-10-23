import { metaInstanceGetApplicationAppearance } from './get-application-appearance';
import { metaInstanceGetApplicationSettings } from './get-application-settings';
import { metaInstanceGetApplicationStatistics } from './get-application-statistics';
import { metaInstanceUpdateApplicationSettings } from './update-application-settings';

export const metaInstanceTools = [
  metaInstanceGetApplicationAppearance,
  metaInstanceGetApplicationSettings,
  metaInstanceGetApplicationStatistics,
  metaInstanceUpdateApplicationSettings,
];
