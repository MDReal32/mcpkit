import { defineTool } from "@usemcpkit/core";

export const instanceCommunityPackagesUpdatePackage = defineTool({
  name: "instance:community_packages:update_package",
  description: "Update a community package. Update an installed community package to a new version.",
  input: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "npm package name",
      },
      version: {
        type: "string",
        description:
          "Semver version or npm dist-tag to update to, such as latest or beta. When unverified packages are disabled, only versions verified by n8n can be installed.",
      },
    },
    required: ["name"],
  },
  request: {
    method: "PATCH",
    path: "/community-packages/{name}",
    body: ["version"],
  },
});
