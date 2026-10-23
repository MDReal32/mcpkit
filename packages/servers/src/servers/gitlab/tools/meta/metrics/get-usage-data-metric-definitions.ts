import { defineTool } from '@usemcpkit/core';

export const metaMetricsGetUsageDataMetricDefinitions = defineTool({
  name: 'meta:metrics:get_usage_data_metric_definitions',
  description: 'Download metric definitions. Downloads all metric definitions as a single YAML file.',
  input: {
    type: 'object',
    properties: {
      include_paths: {
        type: 'boolean',
        description: 'If `true`, includes file paths in the metric definitions.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/usage_data/metric_definitions',
    query: ['include_paths'],
  },
});
