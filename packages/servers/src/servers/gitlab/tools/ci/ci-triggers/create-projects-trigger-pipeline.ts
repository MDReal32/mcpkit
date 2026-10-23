import { defineTool } from "@usemcpkit/core";

export const ciCiTriggersCreateProjectsTriggerPipeline = defineTool({
  name: "ci:ci_triggers:create_projects_trigger_pipeline",
  description:
    "Trigger a pipeline with a token. Triggers a pipeline with a token. With a CI/CD job token, the triggered pipeline is a multi-project pipeline. The job that authenticates the request becomes associated with the upstream pipeline, which is visible on the pipeline graph. If you use a trigger token in a job, the job is not associated with the upstream pipeline.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      token: {
        type: "string",
        description: "Trigger token or CI/CD job token.",
      },
      variables: {
        type: "object",
        description: 'Map of pipeline variables, as key-value pairs, for example `{ VAR1: "value1", VAR2: "value2" }`.',
      },
      inputs: {
        type: "object",
        description:
          "Map of inputs, as key-value pairs, to use when creating the pipeline. Generally available in GitLab 18.1. Feature flag `ci_inputs_for_pipelines` removed.",
      },
    },
    required: ["id", "token"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/trigger/pipeline",
    body: ["token", "variables", "inputs"],
  },
});
