import { defineTool } from "@usemcpkit/core";

export const metaVscodeListVscodeSettingsSyncV1ResourceGet = defineTool({
  name: "meta:vscode:list_vscode_settings_sync_v1_resource_get",
  description:
    "List all references to a VS Code setting resource. Lists all references to the stored versions of a VS Code setting resource.",
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
    method: "GET",
    path: "/vscode/settings_sync/{settings_context_hash}/v1/resource/{resource_name}",
  },
});
