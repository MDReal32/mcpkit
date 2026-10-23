import { defineTool } from '@usemcpkit/core';

export const packagesMlopsCreateProjectsMlMlflowApi20MlflowRunsSearch = defineTool({
  name: 'packages:mlops:create_projects_ml_mlflow_api_2_0_mlflow_runs_search',
  description:
    'Searches runs/candidates within a project. https://www.mlflow.org/docs/2.19.0/rest-api.html#search-runsexperiment_ids supports only a single experiment ID.Introduced in GitLab 16.4',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      experiment_ids: {
        type: 'array',
        description: 'IDs of the experiments to search for runs, relative to the project.',
      },
      max_results: {
        type: 'integer',
        description: 'Maximum number of runs to fetch in a page. The maximum is 1000.',
        default: 200,
      },
      order_by: {
        type: 'string',
        description:
          'Order criteria. Can be by a column of the run/candidate (`created_at`, `name`) or by a metric if prefixed by `metrics`. Valid examples: `created_at`, `created_at DESC`, `metrics.my_metric DESC`. Sorting by candidate parameter or metadata is not supported.',
        default: 'created_at DESC',
      },
      page_token: {
        type: 'string',
        description: 'Token for pagination.',
      },
    },
    required: ['id', 'experiment_ids'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/ml/mlflow/api/2.0/mlflow/runs/search',
    body: ['experiment_ids', 'max_results', 'order_by', 'page_token'],
  },
});
