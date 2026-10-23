import { defineTool } from "@usemcpkit/core";

export const adminGeoCreateGeoProxyGitSshReceivePack = defineTool({
  name: "admin:geo:create_geo_proxy_git_ssh_receive_pack",
  description:
    "Proxy a git-receive-pack request to the primary site. Proxies a git-receive-pack request from a secondary site to the primary site.",
  input: {
    type: "object",
    properties: {
      secret_token: {
        type: "string",
        description: "Secret token used to authenticate requests from GitLab Shell to Geo proxy endpoints.",
      },
      data: {
        type: "object",
        description: "Object that contains the payload data for the Geo operation.",
        properties: {
          gl_id: {
            type: "string",
            description: "ID of the user performing the operation.",
          },
          primary_repo: {
            type: "string",
            description: "Primary repository to push to.",
          },
        },
        required: ["gl_id", "primary_repo"],
      },
      output: {
        type: "string",
        description: "Output from `git-receive-pack`.",
      },
    },
    required: ["secret_token", "data", "output"],
  },
  request: {
    method: "POST",
    path: "/geo/proxy_git_ssh/receive_pack",
    body: ["secret_token", "data", "output"],
  },
});
