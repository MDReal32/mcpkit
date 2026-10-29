import { applicationsActivityInstancesTools } from "./activity-instances";
import { applicationsApplicationsTools } from "./applications";
import { applicationsAttachmentTools } from "./attachment";
import { applicationsCommandsTools } from "./commands";
import { applicationsEmojisTools } from "./emojis";
import { applicationsEntitlementsTools } from "./entitlements";
import { applicationsInteractionsTools } from "./interactions";
import { applicationsOauth2Tools } from "./oauth2";
import { applicationsRoleConnectionsTools } from "./role-connections";
import { applicationsSkusTools } from "./skus";

export const applicationsGroupTools = [
  ...applicationsActivityInstancesTools,
  ...applicationsApplicationsTools,
  ...applicationsAttachmentTools,
  ...applicationsCommandsTools,
  ...applicationsEmojisTools,
  ...applicationsEntitlementsTools,
  ...applicationsInteractionsTools,
  ...applicationsOauth2Tools,
  ...applicationsRoleConnectionsTools,
  ...applicationsSkusTools,
];
