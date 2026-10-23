import { defineTool } from "@usemcpkit/core";

export const projectsRemoteMirrorsCreateProjectsRemoteMirrors = defineTool({
  name: "projects:remote_mirrors:create_projects_remote_mirrors",
  description: "Create a push mirror. Creates a push mirror.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      url: {
        type: "string",
        description: "Target URL to which the repository is mirrored.",
      },
      enabled: {
        type: "boolean",
        description: "If `true`, the mirror is enabled.",
      },
      auth_method: {
        type: "string",
        description: "Mirror authentication method.",
        enum: ["ssh_public_key", "password"],
      },
      keep_divergent_refs: {
        type: "boolean",
        description: "If `true`, divergent refs are kept when mirroring.",
      },
      only_protected_branches: {
        type: "boolean",
        description: "If `true`, only protected branches are mirrored. Mutually exclusive with `mirror_branch_regex`.",
      },
      mirror_branch_regex: {
        type: "string",
        description:
          "Determines if only matched branches are mirrored. Mutually exclusive with `only_protected_branches`.",
      },
      host_keys: {
        type: "array",
        description:
          "SSH host keys in bare format, such as `ssh-ed25519 AAAA...`, or full `known_hosts` format, such as `hostname ssh-ed25519 AAAA...`. Bare keys use the hostname from the mirror URL.",
        items: {
          type: "string",
        },
      },
    },
    required: ["id", "url"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/remote_mirrors",
    body: [
      "url",
      "enabled",
      "auth_method",
      "keep_divergent_refs",
      "only_protected_branches",
      "mirror_branch_regex",
      "host_keys",
    ],
  },
});
