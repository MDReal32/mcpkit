import { webhooksWebhooksDeleteWebhook } from "./delete-webhook";
import { webhooksWebhooksDeleteWebhookByToken } from "./delete-webhook-by-token";
import { webhooksWebhooksExecuteWebhook } from "./execute-webhook";
import { webhooksWebhooksGetWebhook } from "./get-webhook";
import { webhooksWebhooksGetWebhookByToken } from "./get-webhook-by-token";
import { webhooksWebhooksUpdateWebhook } from "./update-webhook";
import { webhooksWebhooksUpdateWebhookByToken } from "./update-webhook-by-token";

export const webhooksWebhooksTools = [
  webhooksWebhooksDeleteWebhook,
  webhooksWebhooksDeleteWebhookByToken,
  webhooksWebhooksExecuteWebhook,
  webhooksWebhooksGetWebhook,
  webhooksWebhooksGetWebhookByToken,
  webhooksWebhooksUpdateWebhook,
  webhooksWebhooksUpdateWebhookByToken,
];
