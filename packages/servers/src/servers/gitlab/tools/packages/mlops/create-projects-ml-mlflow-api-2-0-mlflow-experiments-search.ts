import { defineTool } from '@usemcpkit/core';

export const packagesMlopsCreateProjectsMlMlflowApi20MlflowExperimentsSearch = defineTool({
  name: 'packages:mlops:create_projects_ml_mlflow_api_2_0_mlflow_experiments_search',
  description: 'Search experiments. https://www.mlflow.org/docs/2.19.0/rest-api.html#search-experiments',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      max_results: {
        type: 'integer',
        description: 'Maximum number of experiments to fetch in a page. The maximum is 1000.',
        default: 200,
      },
      order_by: {
        type: 'string',
        description:
          'Column and direction to sort experiments by, for example `created_at DESC` or `name`. Supported columns are `created_at` and `name`.',
        default: 'created_at DESC',
      },
      page_token: {
        type: 'string',
        description: 'Token for pagination.',
      },
      filter: {
        type: 'string',
        description: 'Ignored. Accepted for MLflow API compatibility.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/ml/mlflow/api/2.0/mlflow/experiments/search',
    body: ['max_results', 'order_by', 'page_token', 'filter'],
  },
});
