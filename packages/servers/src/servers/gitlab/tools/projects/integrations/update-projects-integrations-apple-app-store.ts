import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsUpdateProjectsIntegrationsAppleAppStore = defineTool({
  name: "projects:integrations:update_projects_integrations_apple_app_store",
  description: "Create or update the Apple App Store integration. Creates or updates the Apple App Store integration.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      app_store_issuer_id: {
        type: "string",
        description: "Apple App Store Connect issuer ID.",
      },
      app_store_key_id: {
        type: "string",
        description: "Apple App Store Connect key ID.",
      },
      app_store_private_key_file_name: {
        type: "string",
        description: "Apple App Store Connect private key file name.",
      },
      app_store_private_key: {
        type: "string",
        description: "Apple App Store Connect private key.",
      },
      app_store_protected_refs: {
        type: "boolean",
        description: "Set variables on protected branches and tags only.",
      },
      use_inherited_settings: {
        type: "boolean",
        description: "Indicates whether to inherit the default settings. Defaults to `false`.",
      },
    },
    required: [
      "id",
      "app_store_issuer_id",
      "app_store_key_id",
      "app_store_private_key_file_name",
      "app_store_private_key",
    ],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/integrations/apple-app-store",
    body: [
      "app_store_issuer_id",
      "app_store_key_id",
      "app_store_private_key_file_name",
      "app_store_private_key",
      "app_store_protected_refs",
      "use_inherited_settings",
    ],
  },
});
