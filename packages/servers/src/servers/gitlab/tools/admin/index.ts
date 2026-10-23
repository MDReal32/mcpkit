import { adminAdvancedSearchRolloutTools } from './advanced-search-rollout';
import { adminAnalyticsTools } from './analytics';
import { adminAuditEventsTools } from './audit-events';
import { adminBatchedBackgroundMigrationsTools } from './batched-background-migrations';
import { adminBatchedBackgroundOperationsTools } from './batched-background-operations';
import { adminBroadcastMessagesTools } from './broadcast-messages';
import { adminDataManagementTools } from './data-management';
import { adminDatabaseDictionaryTools } from './database-dictionary';
import { adminDoraMetricsTools } from './dora-metrics';
import { adminGeoTools } from './geo';
import { adminMigrationsTools } from './migrations';
import { adminOfflineTransfersTools } from './offline-transfers';
import { adminSidekiqTools } from './sidekiq';
import { adminStorageMovesTools } from './storage-moves';

export const adminGroupTools = [
  ...adminAdvancedSearchRolloutTools,
  ...adminAnalyticsTools,
  ...adminAuditEventsTools,
  ...adminBatchedBackgroundMigrationsTools,
  ...adminBatchedBackgroundOperationsTools,
  ...adminBroadcastMessagesTools,
  ...adminDataManagementTools,
  ...adminDatabaseDictionaryTools,
  ...adminDoraMetricsTools,
  ...adminGeoTools,
  ...adminMigrationsTools,
  ...adminOfflineTransfersTools,
  ...adminSidekiqTools,
  ...adminStorageMovesTools,
];
