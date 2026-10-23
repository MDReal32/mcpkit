import { defineTool } from '@usemcpkit/core';

export const adminSidekiqListSidekiqQueueMetrics = defineTool({
  name: 'admin:sidekiq:list_sidekiq_queue_metrics',
  description:
    'List all job queue metrics. Lists all details about all Sidekiq job queues, including backlog size and latency.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/sidekiq/queue_metrics',
  },
});
