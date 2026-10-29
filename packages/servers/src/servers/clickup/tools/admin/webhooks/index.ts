import { adminWebhooksCreateWebhook } from "./create-webhook";
import { adminWebhooksDeleteWebhook } from "./delete-webhook";
import { adminWebhooksGetWebhooks } from "./get-webhooks";
import { adminWebhooksUpdateWebhook } from "./update-webhook";

export const adminWebhooksTools = [
  adminWebhooksCreateWebhook,
  adminWebhooksDeleteWebhook,
  adminWebhooksGetWebhooks,
  adminWebhooksUpdateWebhook,
];
