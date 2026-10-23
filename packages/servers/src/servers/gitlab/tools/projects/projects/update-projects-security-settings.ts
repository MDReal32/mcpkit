import { defineTool } from "@usemcpkit/core";

export const projectsProjectsUpdateProjectsSecuritySettings = defineTool({
  name: "projects:projects:update_projects_security_settings",
  description:
    "Update project security settings. Updates project security settings for a specified project. You must have the Maintainer or Owner role for the project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      secret_push_protection_enabled: {
        type: "boolean",
        description:
          "If `true`, enables secret push protection for the project. At least one of `secret_push_protection_enabled`, `pre_receive_secret_detection_enabled`, `fast_dependency_paths_enabled` must be provided.",
      },
      pre_receive_secret_detection_enabled: {
        type: "boolean",
        description:
          "If `true`, enables secret push protection for the project. Deprecated in GitLab 17.9. Use `secret_push_protection_enabled` instead. At least one of `secret_push_protection_enabled`, `pre_receive_secret_detection_enabled`, `fast_dependency_paths_enabled` must be provided.",
      },
      fast_dependency_paths_enabled: {
        type: "boolean",
        description:
          "If `true`, enables fast mode for dependency path graph builds, recording one path per dependency instead of all possible paths to reduce memory and processing time for large dependency graphs. Requires the `dependency_paths` feature flag to be enabled. At least one of `secret_push_protection_enabled`, `pre_receive_secret_detection_enabled`, `fast_dependency_paths_enabled` must be provided.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/security_settings",
    body: ["secret_push_protection_enabled", "pre_receive_secret_detection_enabled", "fast_dependency_paths_enabled"],
  },
});
