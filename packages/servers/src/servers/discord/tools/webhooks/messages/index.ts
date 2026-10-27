import { webhooksMessagesDeleteOriginalWebhookMessage } from "./delete-original-webhook-message";
import { webhooksMessagesDeleteWebhookMessage } from "./delete-webhook-message";
import { webhooksMessagesGetOriginalWebhookMessage } from "./get-original-webhook-message";
import { webhooksMessagesGetWebhookMessage } from "./get-webhook-message";
import { webhooksMessagesUpdateOriginalWebhookMessage } from "./update-original-webhook-message";
import { webhooksMessagesUpdateWebhookMessage } from "./update-webhook-message";

export const webhooksMessagesTools = [
  webhooksMessagesDeleteOriginalWebhookMessage,
  webhooksMessagesDeleteWebhookMessage,
  webhooksMessagesGetOriginalWebhookMessage,
  webhooksMessagesGetWebhookMessage,
  webhooksMessagesUpdateOriginalWebhookMessage,
  webhooksMessagesUpdateWebhookMessage,
];
