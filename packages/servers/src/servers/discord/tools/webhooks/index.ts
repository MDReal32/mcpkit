import { webhooksGithubTools } from "./github";
import { webhooksMessagesTools } from "./messages";
import { webhooksSlackTools } from "./slack";
import { webhooksWebhooksTools } from "./webhooks";

export const webhooksGroupTools = [
  ...webhooksGithubTools,
  ...webhooksMessagesTools,
  ...webhooksSlackTools,
  ...webhooksWebhooksTools,
];
