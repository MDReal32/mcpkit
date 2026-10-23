import { defineTool } from "@usemcpkit/core";

export const metaFeaturesCreateFeatures = defineTool({
  name: "meta:features:create_features",
  description:
    "Create or update a feature flag. Creates or updates a feature flag value. If a feature with the given name doesn't exist yet, the operation creates one. The value can be a boolean or an integer to indicate percentage of time.",
  input: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name of the feature flag.",
      },
      value: {
        type: "string",
        description:
          "Value to set for the feature flag. Use `true` or `false` to enable or disable it, or an integer for the percentage of time it should be enabled.",
      },
      key: {
        type: "string",
        description:
          "Rollout strategy for a percentage `value`. Omit it to apply the percentage to time. Mutually exclusive with `feature_group`, `user`, `group`, `namespace`, `project`, `organization`, `repository`, `runner`, `endpoint`.",
        enum: ["percentage_of_actors", "percentage_of_time"],
      },
      feature_group: {
        type: "string",
        description: "Name of the feature group. Mutually exclusive with `key`.",
      },
      user: {
        type: "string",
        description: "GitLab username or a comma-separated list of usernames. Mutually exclusive with `key`.",
      },
      group: {
        type: "string",
        description:
          "GitLab group path, for example `gitlab-org`, or a comma-separated list of group paths. Mutually exclusive with `key`.",
      },
      namespace: {
        type: "string",
        description:
          "GitLab group or user namespace path, for example `john-doe`, or a comma-separated list of namespace paths. Introduced in GitLab 15.0. Mutually exclusive with `key`.",
      },
      project: {
        type: "string",
        description:
          "Project path, for example `gitlab-org/gitlab-foss`, or a comma-separated list of project paths. Mutually exclusive with `key`.",
      },
      organization: {
        type: "string",
        description:
          "Organization ID or path, for example `1` or `default`, or a comma-separated list of organization IDs or paths. Mutually exclusive with `key`.",
      },
      repository: {
        type: "string",
        description:
          "Repository path, for example `gitlab-org/gitlab-test.git`, `gitlab-org/gitlab-test.wiki.git`, or `snippets/21.git`. Use commas to separate multiple repository paths. Mutually exclusive with `key`.",
      },
      runner: {
        type: "string",
        description: "Runner ID or a comma-separated list of runner IDs. Mutually exclusive with `key`.",
      },
      endpoint: {
        type: "string",
        description:
          "Caller ID identifying a code path, for example `GET /api/v4/projects/:id` or `ProjectsController#show`. Use a comma to separate multiple endpoint paths. Mutually exclusive with `key`.",
      },
      force: {
        type: "boolean",
        description: "If `true`, skips feature flag validation checks, such as a YAML definition.",
      },
    },
    required: ["name", "value"],
  },
  request: {
    method: "POST",
    path: "/features/{name}",
    body: [
      "value",
      "key",
      "feature_group",
      "user",
      "group",
      "namespace",
      "project",
      "organization",
      "repository",
      "runner",
      "endpoint",
      "force",
    ],
  },
});
