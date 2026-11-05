import { defineTool } from "@usemcpkit/core";

export const instanceCommunityPackagesInstallPackage = defineTool({
  name: "instance:community_packages:install_package",
  description: "Install a community package. Install a community package by npm name and optional version.",
  input: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description:
          "npm package name. Unscoped names start with n8n-nodes-. Scoped names use the @[author]/n8n-nodes- form.",
      },
      version: {
        type: "string",
        description:
          "Semver version or npm dist-tag, such as latest or beta. When unverified packages are disabled, only versions verified by n8n can be installed.",
      },
    },
    required: ["name"],
  },
  request: {
    method: "POST",
    path: "/community-packages",
    body: ["name", "version"],
  },
});
