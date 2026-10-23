import { datacenterAccessmodeTools } from "./accessmode";
import { datacenterAdminTools } from "./admin";
import { datacenterAuditTools } from "./audit";
import { datacenterBackupRestoreTools } from "./backup-restore";
import { datacenterClusterTools } from "./cluster";
import { datacenterColorSchemeTools } from "./color-scheme";
import { datacenterContentTools } from "./content";
import { datacenterContentbodyTools } from "./contentbody";
import { datacenterGroupTools } from "./group";
import { datacenterIndexManagementTools } from "./index-management";
import { datacenterInstanceMetricsTools } from "./instance-metrics";
import { datacenterLabelTools } from "./label";
import { datacenterLongtaskTools } from "./longtask";
import { datacenterPermissionsTools } from "./permissions";
import { datacenterSearchTools } from "./search";
import { datacenterServerInformationTools } from "./server-information";
import { datacenterSpaceTools } from "./space";
import { datacenterUserTools } from "./user";
import { datacenterWebhooksTools } from "./webhooks";

export const datacenterAllTools = [
  ...datacenterAccessmodeTools,
  ...datacenterAdminTools,
  ...datacenterAuditTools,
  ...datacenterBackupRestoreTools,
  ...datacenterClusterTools,
  ...datacenterColorSchemeTools,
  ...datacenterContentTools,
  ...datacenterContentbodyTools,
  ...datacenterGroupTools,
  ...datacenterIndexManagementTools,
  ...datacenterInstanceMetricsTools,
  ...datacenterLabelTools,
  ...datacenterLongtaskTools,
  ...datacenterPermissionsTools,
  ...datacenterSearchTools,
  ...datacenterServerInformationTools,
  ...datacenterSpaceTools,
  ...datacenterUserTools,
  ...datacenterWebhooksTools,
];
