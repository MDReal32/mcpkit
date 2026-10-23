import { defineTool } from "@usemcpkit/core";

export const actionsActionsCreateHostedRunnerForOrg = defineTool({
  name: "actions:actions:create_hosted_runner_for_org",
  description:
    "Create a GitHub-hosted runner for an organization. Creates a GitHub-hosted runner for an organization. OAuth tokens and personal access tokens (classic) need the `manage_runners:org` scope to use this endpoint.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      name: {
        type: "string",
        description:
          "Name of the runner. Must be between 1 and 64 characters and may only contain upper and lowercase letters a-z, numbers 0-9, '.', '-', and '_'.",
      },
      image: {
        type: "object",
        description:
          "The image of runner. To list all available images, use `GET /actions/hosted-runners/images/github-owned` or `GET /actions/hosted-runners/images/partner`.",
        properties: {
          id: {
            type: "string",
            description: "The unique identifier of the runner image.",
          },
          source: {
            type: "string",
            description: "The source of the runner image.",
            enum: ["github", "partner", "custom"],
          },
          version: {
            type: "string",
            description:
              "The version of the runner image to deploy. This is relevant only for runners using custom images.",
          },
        },
      },
      size: {
        type: "string",
        description:
          "The machine size of the runner. To list available sizes, use `GET actions/hosted-runners/machine-sizes`",
      },
      runner_group_id: {
        type: "integer",
        description: "The existing runner group to add this runner to.",
      },
      maximum_runners: {
        type: "integer",
        description:
          "The maximum amount of runners to scale up to. Runners will not auto-scale above this number. Use this setting to limit your cost.",
      },
      enable_static_ip: {
        type: "boolean",
        description:
          "Whether this runner should be created with a static public IP. Note limit on account. To list limits on account, use `GET actions/hosted-runners/limits`",
      },
      image_gen: {
        type: "boolean",
        description: "Whether this runner should be used to generate custom images.",
        default: false,
      },
    },
    required: ["org", "name", "image", "size", "runner_group_id"],
  },
  request: {
    method: "POST",
    path: "/orgs/{org}/actions/hosted-runners",
    body: ["name", "image", "size", "runner_group_id", "maximum_runners", "enable_static_ip", "image_gen"],
  },
});
