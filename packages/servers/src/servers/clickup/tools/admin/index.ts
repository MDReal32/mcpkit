import { adminAclsTools } from "./acls";
import { adminAuditlogsTools } from "./auditlogs";
import { adminWebhooksTools } from "./webhooks";

export const adminGroupTools = [...adminAclsTools, ...adminAuditlogsTools, ...adminWebhooksTools];
