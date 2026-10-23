import { collaborationDashboardsTools } from "./dashboards";
import { collaborationFilterSharingTools } from "./filter-sharing";
import { collaborationFiltersTools } from "./filters";
import { collaborationPlansTools } from "./plans";
import { collaborationTeamsInPlanTools } from "./teams-in-plan";
import { collaborationWebhooksTools } from "./webhooks";

export const collaborationGroupTools = [
  ...collaborationDashboardsTools,
  ...collaborationFilterSharingTools,
  ...collaborationFiltersTools,
  ...collaborationPlansTools,
  ...collaborationTeamsInPlanTools,
  ...collaborationWebhooksTools,
];
