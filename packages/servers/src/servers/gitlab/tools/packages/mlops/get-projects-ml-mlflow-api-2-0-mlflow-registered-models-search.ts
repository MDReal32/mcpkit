import { defineTool } from "@usemcpkit/core";

export const packagesMlopsGetProjectsMlMlflowApi20MlflowRegisteredModelsSearch = defineTool({
  name: "packages:mlops:get_projects_ml_mlflow_api_2_0_mlflow_registered_models_search",
  description:
    "Search Registered Models within a project. https://mlflow.org/docs/2.19.0/rest-api.html#search-registeredmodels",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      filter: {
        type: "string",
        description: "Filter for the model search, in the format `name='value'`. Only filtering by name is supported.",
      },
      max_results: {
        type: "integer",
        default: 200,
        description: "Maximum number of models to fetch in a page. The maximum is 1000.",
      },
      order_by: {
        type: "string",
        default: "name ASC",
        description:
          "Column and direction to sort registered models by, for example `name`, `name DESC`, or `last_updated_timestamp DESC`. Supported columns are `name` and `last_updated_timestamp`. Sorting by model metadata is not supported.",
      },
      page_token: {
        type: "string",
        description: "Token for pagination.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/ml/mlflow/api/2.0/mlflow/registered-models/search",
    query: ["filter", "max_results", "order_by", "page_token"],
  },
});
