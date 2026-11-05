import { instanceAuditTools } from "./audit";
import { instanceCommunityPackagesTools } from "./community-packages";
import { instanceDiscoverTools } from "./discover";
import { instanceInsightsTools } from "./insights";
import { instancePackagesTools } from "./packages";
import { instancePromotionsTools } from "./promotions";
import { instanceSourceControlTools } from "./source-control";

export const instanceGroupTools = [
  ...instanceAuditTools,
  ...instanceCommunityPackagesTools,
  ...instanceDiscoverTools,
  ...instanceInsightsTools,
  ...instancePackagesTools,
  ...instancePromotionsTools,
  ...instanceSourceControlTools,
];
