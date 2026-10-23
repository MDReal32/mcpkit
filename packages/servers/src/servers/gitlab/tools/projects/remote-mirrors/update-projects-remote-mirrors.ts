import { defineTool } from "@usemcpkit/core";

export const projectsRemoteMirrorsUpdateProjectsRemoteMirrors = defineTool({
  name: "projects:remote_mirrors:update_projects_remote_mirrors",
  description:
    "Update a remote mirror in a project. Updates the configuration or operational status of a specified remote mirror.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      mirror_id: {
        type: "string",
        description: "ID of the remote mirror.",
      },
      enabled: {
        type: "boolean",
        description: "If `true`, the mirror is enabled.",
      },
      auth_method: {
        type: "string",
        description: "Mirror authentication method.",
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
    required: ["id", "mirror_id"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/remote_mirrors/{mirror_id}",
    body: [
      "enabled",
      "auth_method",
      "keep_divergent_refs",
      "only_protected_branches",
      "mirror_branch_regex",
      "host_keys",
    ],
  },
});
