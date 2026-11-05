import { defineTool } from "@usemcpkit/core";

export const instanceCommunityPackagesUninstallPackage = defineTool({
  name: "instance:community_packages:uninstall_package",
  description: "Uninstall a community package. Uninstall a community package by name.",
  input: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "npm package name",
      },
    },
    required: ["name"],
  },
  request: {
    method: "DELETE",
    path: "/community-packages/{name}",
  },
});
