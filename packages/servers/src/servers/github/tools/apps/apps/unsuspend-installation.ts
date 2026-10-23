import { defineTool } from "@usemcpkit/core";

export const appsAppsUnsuspendInstallation = defineTool({
  name: "apps:apps:unsuspend_installation",
  description: "Unsuspend an app installation. Removes a GitHub App installation suspension.",
  input: {
    type: "object",
    properties: {
      installation_id: {
        type: "integer",
        description: "The unique identifier of the installation.",
      },
    },
    required: ["installation_id"],
  },
  request: {
    method: "DELETE",
    path: "/app/installations/{installation_id}/suspended",
  },
});
