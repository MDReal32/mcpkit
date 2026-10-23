import { defineTool } from "@usemcpkit/core";

export const metaVscodeGetVscodeSettingsSyncV1Manifest = defineTool({
  name: "meta:vscode:get_vscode_settings_sync_v1_manifest",
  description:
    "Retrieve the settings manifest for Settings Sync. Retrieves the manifest of the settings stored for VS Code Settings Sync.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/vscode/settings_sync/v1/manifest",
  },
});
