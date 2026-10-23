import { defineTool } from "@usemcpkit/core";

export const projectsProjectImportCreateImportBitbucketServer = defineTool({
  name: "projects:project_import:create_import_bitbucket_server",
  description:
    "Import repository from Bitbucket Server. Imports a repository from Bitbucket Server to GitLab. The Bitbucket Project Key is only used for finding the repository in Bitbucket. You must specify a `target_namespace` if you want to import the repository to a GitLab group.",
  input: {
    type: "object",
    properties: {
      bitbucket_server_url: {
        type: "string",
        description: "URL of the Bitbucket Server instance.",
      },
      bitbucket_server_username: {
        type: "string",
        description: "Bitbucket Server username.",
      },
      personal_access_token: {
        type: "string",
        description: "Bitbucket Server personal access token or password.",
      },
      bitbucket_server_project: {
        type: "string",
        description:
          "Key of the Bitbucket Server project. Must contain only letters, numbers, hyphens, underscores, periods, or whitespace characters. Personal project keys start with `~`.",
      },
      bitbucket_server_repo: {
        type: "string",
        description:
          "Name of the Bitbucket Server repository. Must contain only letters, numbers, hyphens, underscores, periods, or whitespace characters.",
      },
      new_name: {
        type: "string",
        description:
          "Name of the new project. Also used as the new path, so it must not start or end with a special character and must not contain consecutive special characters.",
      },
      new_namespace: {
        type: "string",
        description: "Namespace to import the repository into.",
      },
      timeout_strategy: {
        type: "string",
        description:
          "Strategy for handling import timeouts. `optimistic` continues to the next stage of the import. `pessimistic` fails the import immediately. Defaults to `pessimistic`.",
        enum: ["optimistic", "pessimistic"],
      },
    },
    required: [
      "bitbucket_server_url",
      "bitbucket_server_username",
      "personal_access_token",
      "bitbucket_server_project",
      "bitbucket_server_repo",
    ],
  },
  request: {
    method: "POST",
    path: "/import/bitbucket_server",
    body: [
      "bitbucket_server_url",
      "bitbucket_server_username",
      "personal_access_token",
      "bitbucket_server_project",
      "bitbucket_server_repo",
      "new_name",
      "new_namespace",
      "timeout_strategy",
    ],
  },
});
