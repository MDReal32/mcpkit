import { collaborationWebhooksDeleteWebhookById } from './delete-webhook-by-id';
import { collaborationWebhooksGetDynamicWebhooksForApp } from './get-dynamic-webhooks-for-app';
import { collaborationWebhooksGetFailedWebhooks } from './get-failed-webhooks';
import { collaborationWebhooksRefreshWebhooks } from './refresh-webhooks';
import { collaborationWebhooksRegisterDynamicWebhooks } from './register-dynamic-webhooks';

export const collaborationWebhooksTools = [
  collaborationWebhooksDeleteWebhookById,
  collaborationWebhooksGetDynamicWebhooksForApp,
  collaborationWebhooksGetFailedWebhooks,
  collaborationWebhooksRefreshWebhooks,
  collaborationWebhooksRegisterDynamicWebhooks,
];
