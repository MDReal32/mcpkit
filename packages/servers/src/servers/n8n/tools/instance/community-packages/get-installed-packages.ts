import { defineTool } from "@usemcpkit/core";

export const instanceCommunityPackagesGetInstalledPackages = defineTool({
  name: "instance:community_packages:get_installed_packages",
  description: "List installed community packages. Retrieve all installed community packages with pending update info.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/community-packages",
  },
});
