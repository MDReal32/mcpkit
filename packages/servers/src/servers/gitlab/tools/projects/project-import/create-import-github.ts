import { defineTool } from "@usemcpkit/core";

export const projectsProjectImportCreateImportGithub = defineTool({
  name: "projects:project_import:create_import_github",
  description: "Import a repository from GitHub. Imports a repository from GitHub to GitLab.",
  input: {
    type: "object",
    properties: {
      personal_access_token: {
        type: "string",
        description: "GitHub personal access token.",
      },
      repo_id: {
        type: "integer",
        description: "GitHub repository ID.",
      },
      new_name: {
        type: "string",
        description:
          "Name of the new project. Also used as the new path, so it must not start or end with a special character and must not contain consecutive special characters.",
      },
      target_namespace: {
        type: "string",
        description:
          "Namespace to import the repository into. Supports subgroups, for example `/namespace/subgroup`. Must not be blank.",
      },
      github_hostname: {
        type: "string",
        description:
          "Custom GitHub Enterprise hostname. Do not set for GitHub.com. From GitLab 16.5 to GitLab 17.1, you must include the path `/api/v3`.",
      },
      optional_stages: {
        type: "object",
        description: "Additional items to import. For a list of items, see select additional items to import.",
      },
      timeout_strategy: {
        type: "string",
        description:
          "Strategy for handling import timeouts. `optimistic` continues to the next stage of the import. `pessimistic` fails the import immediately. Defaults to `pessimistic`.",
        enum: ["optimistic", "pessimistic"],
      },
      pagination_limit: {
        type: "integer",
        description:
          "Number of items retrieved per API request to GitHub. If omitted, defaults to `100`. Use a lower number for large repositories to reduce the risk of GitHub API errors, though this increases migration time.",
      },
    },
    required: ["personal_access_token", "repo_id", "target_namespace"],
  },
  request: {
    method: "POST",
    path: "/import/github",
    body: [
      "personal_access_token",
      "repo_id",
      "new_name",
      "target_namespace",
      "github_hostname",
      "optional_stages",
      "timeout_strategy",
      "pagination_limit",
    ],
  },
});
