import { defineTool } from '@usemcpkit/core';

export const adminSidekiqListSidekiqProcessMetrics = defineTool({
  name: 'admin:sidekiq:list_sidekiq_process_metrics',
  description:
    'List all Sidekiq processes. Lists all details about all registered Sidekiq worker processes, including hostname, process ID, queues, and concurrency settings.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/sidekiq/process_metrics',
  },
});
