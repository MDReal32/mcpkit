import { adminSidekiqDeleteAdminSidekiqQueues } from './delete-admin-sidekiq-queues';
import { adminSidekiqGetSidekiqJobStats } from './get-sidekiq-job-stats';
import { adminSidekiqListSidekiqCompoundMetrics } from './list-sidekiq-compound-metrics';
import { adminSidekiqListSidekiqProcessMetrics } from './list-sidekiq-process-metrics';
import { adminSidekiqListSidekiqQueueMetrics } from './list-sidekiq-queue-metrics';

export const adminSidekiqTools = [
  adminSidekiqDeleteAdminSidekiqQueues,
  adminSidekiqGetSidekiqJobStats,
  adminSidekiqListSidekiqCompoundMetrics,
  adminSidekiqListSidekiqProcessMetrics,
  adminSidekiqListSidekiqQueueMetrics,
];
