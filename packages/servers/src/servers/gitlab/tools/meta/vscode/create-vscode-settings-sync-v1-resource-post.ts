import { defineTool } from "@usemcpkit/core";

export const metaVscodeCreateVscodeSettingsSyncV1ResourcePost = defineTool({
  name: "meta:vscode:create_vscode_settings_sync_v1_resource_post",
  description:
    "Create or update a specific setting. Creates a VS Code setting resource, or updates it if it already exists.",
  input: {
    type: "object",
    properties: {
      settings_context_hash: {
        type: "string",
        description: "Settings context hash.",
      },
      resource_name: {
        type: "string",
        enum: ["settings", "extensions", "globalState", "machines", "keybindings", "snippets", "tasks", "profiles"],
        description: "Name of the resource such as settings.",
      },
    },
    required: ["settings_context_hash", "resource_name"],
  },
  request: {
    method: "POST",
    path: "/vscode/settings_sync/{settings_context_hash}/v1/resource/{resource_name}",
  },
});
