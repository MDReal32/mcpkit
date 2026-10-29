import { timeTimeTrackingTools } from "./time-tracking";
import { timeTimeTrackingLegacyTools } from "./time-tracking-legacy";

export const timeGroupTools = [...timeTimeTrackingLegacyTools, ...timeTimeTrackingTools];
