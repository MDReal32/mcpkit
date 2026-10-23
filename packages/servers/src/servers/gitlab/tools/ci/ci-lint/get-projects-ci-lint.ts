import { defineTool } from "@usemcpkit/core";

export const ciCiLintGetProjectsCiLint = defineTool({
  name: "ci:ci_lint:get_projects_ci_lint",
  description:
    "Validate existing CI/CD configuration. Validates the `.gitlab-ci.yml` configuration for a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      sha: {
        type: "string",
        description:
          "Commit SHA, branch, or tag that the CI/CD configuration content is taken from. Defaults to the head of the project's default branch. Deprecated. Use `content_ref` instead. Mutually exclusive with `content_ref`.",
      },
      content_ref: {
        type: "string",
        description:
          "Commit SHA, branch, or tag that the CI/CD configuration content is taken from. Defaults to the head of the project's default branch. Mutually exclusive with `sha`.",
      },
      dry_run: {
        type: "boolean",
        default: false,
        description: "If `true`, runs a pipeline creation simulation. If `false`, runs only a static check.",
      },
      include_jobs: {
        type: "boolean",
        description: "If `true`, includes the list of jobs that would exist in a static check or pipeline simulation.",
      },
      ref: {
        type: "string",
        description:
          "If `dry_run` is `true`, sets the branch or tag to use to validate the CI/CD YAML configuration. Defaults to the project's default branch. Deprecated. Use `dry_run_ref` instead. Mutually exclusive with `dry_run_ref`.",
      },
      dry_run_ref: {
        type: "string",
        description:
          "If `dry_run` is `true`, sets the branch or tag to use to validate the CI/CD YAML configuration. Defaults to the project's default branch. Mutually exclusive with `ref`.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/ci/lint",
    query: ["sha", "content_ref", "dry_run", "include_jobs", "ref", "dry_run_ref"],
  },
});
