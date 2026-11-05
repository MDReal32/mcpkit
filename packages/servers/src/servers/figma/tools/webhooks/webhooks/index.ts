import { webhooksWebhooksDeleteWebhook } from "./delete-webhook";
import { webhooksWebhooksGetTeamWebhooks } from "./get-team-webhooks";
import { webhooksWebhooksGetWebhook } from "./get-webhook";
import { webhooksWebhooksGetWebhookRequests } from "./get-webhook-requests";
import { webhooksWebhooksGetWebhooks } from "./get-webhooks";
import { webhooksWebhooksPostWebhook } from "./post-webhook";
import { webhooksWebhooksPutWebhook } from "./put-webhook";

export const webhooksWebhooksTools = [
  webhooksWebhooksDeleteWebhook,
  webhooksWebhooksGetTeamWebhooks,
  webhooksWebhooksGetWebhook,
  webhooksWebhooksGetWebhookRequests,
  webhooksWebhooksGetWebhooks,
  webhooksWebhooksPostWebhook,
  webhooksWebhooksPutWebhook,
];
