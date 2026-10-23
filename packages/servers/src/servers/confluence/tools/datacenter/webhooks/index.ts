import { datacenterWebhooksCreate } from './create';
import { datacenterWebhooksCreateTest } from './create-test';
import { datacenterWebhooksDelete } from './delete';
import { datacenterWebhooksGet } from './get';
import { datacenterWebhooksGetLatest } from './get-latest';
import { datacenterWebhooksGetStatistics } from './get-statistics';
import { datacenterWebhooksGetStatisticsSummary } from './get-statistics-summary';
import { datacenterWebhooksList } from './list';
import { datacenterWebhooksUpdate } from './update';

export const datacenterWebhooksTools = [
  datacenterWebhooksCreate,
  datacenterWebhooksCreateTest,
  datacenterWebhooksDelete,
  datacenterWebhooksGet,
  datacenterWebhooksGetLatest,
  datacenterWebhooksGetStatistics,
  datacenterWebhooksGetStatisticsSummary,
  datacenterWebhooksList,
  datacenterWebhooksUpdate,
];
