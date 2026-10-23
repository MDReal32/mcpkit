import { aiActiveContextCreateAdminActiveContextDeadQueueReplay } from './create-admin-active-context-dead-queue-replay';
import { aiActiveContextDeleteAdminActiveContextDeadQueue } from './delete-admin-active-context-dead-queue';
import { aiActiveContextListAdminActiveContextConnections } from './list-admin-active-context-connections';
import { aiActiveContextUpdateAdminActiveContextCodeEnabledNamespaces } from './update-admin-active-context-code-enabled-namespaces';
import { aiActiveContextUpdateAdminActiveContextCollections } from './update-admin-active-context-collections';
import { aiActiveContextUpdateAdminActiveContextConnectionsActivate } from './update-admin-active-context-connections-activate';
import { aiActiveContextUpdateAdminActiveContextConnectionsDeactivate } from './update-admin-active-context-connections-deactivate';

export const aiActiveContextTools = [
  aiActiveContextCreateAdminActiveContextDeadQueueReplay,
  aiActiveContextDeleteAdminActiveContextDeadQueue,
  aiActiveContextListAdminActiveContextConnections,
  aiActiveContextUpdateAdminActiveContextCodeEnabledNamespaces,
  aiActiveContextUpdateAdminActiveContextCollections,
  aiActiveContextUpdateAdminActiveContextConnectionsActivate,
  aiActiveContextUpdateAdminActiveContextConnectionsDeactivate,
];
