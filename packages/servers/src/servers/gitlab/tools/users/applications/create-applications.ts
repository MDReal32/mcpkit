import { defineTool } from "@usemcpkit/core";

export const usersApplicationsCreateApplications = defineTool({
  name: "users:applications:create_applications",
  description:
    "Create a new application. This feature was introduced in GitLab 10.5. The granular_scopes parameter requires the granular_oauth_tokens feature flag.",
  input: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name of the application.",
      },
      redirect_uri: {
        type: "string",
        description: "Redirect URI of the application.",
      },
      scopes: {
        type: "string",
        description: "Scopes available to the application. Separate multiple scopes with a space.",
      },
      confidential: {
        type: "boolean",
        description:
          "If `true`, the application can securely store client credentials, such as the client secret. Non-confidential applications (such as native mobile apps and Single Page Apps) might expose client credentials.",
        default: true,
      },
      granular_scopes: {
        type: "array",
        description: "List of granular scopes to assign.",
        items: {
          type: "object",
          properties: {
            access: {
              type: "string",
              description: "Access to configure for the granular scope.",
              enum: ["personal_projects", "all_memberships", "selected_memberships", "user", "instance"],
            },
            permissions: {
              type: "array",
              description: "List of permissions for the granular scope.",
              items: {
                type: "string",
              },
            },
            project_ids: {
              type: "array",
              description:
                "IDs of projects to associate with the granular scope, when access is `selected_memberships`.",
              items: {
                type: "integer",
              },
            },
            group_ids: {
              type: "array",
              description: "IDs of groups to associate with the granular scope, when access is `selected_memberships`.",
              items: {
                type: "integer",
              },
            },
          },
          required: ["access", "permissions"],
        },
      },
    },
    required: ["name", "redirect_uri", "scopes"],
  },
  request: {
    method: "POST",
    path: "/applications",
    body: ["name", "redirect_uri", "scopes", "confidential", "granular_scopes"],
  },
});
