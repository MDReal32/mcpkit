import { administrationAnnouncementBannerTools } from "./announcement-banner";
import { administrationAuditRecordsTools } from "./audit-records";
import { administrationIssuePanelsTools } from "./issue-panels";
import { administrationJiraSettingsTools } from "./jira-settings";
import { administrationLicenseMetricsTools } from "./license-metrics";
import { administrationPoliciesTools } from "./policies";
import { administrationServerInfoTools } from "./server-info";

export const administrationGroupTools = [
  ...administrationAnnouncementBannerTools,
  ...administrationAuditRecordsTools,
  ...administrationIssuePanelsTools,
  ...administrationJiraSettingsTools,
  ...administrationLicenseMetricsTools,
  ...administrationPoliciesTools,
  ...administrationServerInfoTools,
];
