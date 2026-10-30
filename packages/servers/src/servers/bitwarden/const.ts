import type { UpstreamNameRule } from "@usemcpkit/core";

export const BITWARDEN_REPO_URL = "https://github.com/bitwarden/mcp-server.git";

export const BITWARDEN_REPO_COMMIT = "4fd2b49c617e11773c93edf8937b2e27f40a89da";

export const BITWARDEN_OPTIONAL_ENV = ["BW_SESSION", "BW_CLIENT_ID", "BW_CLIENT_SECRET"];

/**
 * Bitwarden's server names its tools `<verb>_<object>` (`create_org_group`); these rules file them as
 * `<group>:<resource>:<action>` like the other servers, with the verb leading the action.
 */
export const BITWARDEN_NAMING: readonly UpstreamNameRule[] = [
  { match: "^(lock|unlock|sync|status)$", name: "session:session:$&" },
  { match: "^confirm$", name: "org:members:$&" },
  { match: "^(list|get|generate|delete|restore|move)$", name: "vault:items:$&" },
  { match: "^(create|edit)_(item|folder)(_collections)?$", name: "vault:$2s:$1$3" },
  { match: "^create_attachment$", name: "vault:attachments:create" },
  { match: "^create_(text|file)_send$", name: "send:sends:create_$1" },
  { match: "^remove_send_password$", name: "send:sends:remove_password" },
  { match: "^([a-z]+)_send$", name: "send:sends:$1" },
  { match: "^device_approval_(.+)$", name: "device:approvals:$1" },
  { match: "^([a-z]+)_org_collections?$", name: "org:collections:$1" },
  { match: "^([a-z]+)_org_members?(_groups)?$", name: "org:members:$1$2" },
  { match: "^([a-z]+)_org_groups?(_members)?$", name: "org:groups:$1$2" },
  { match: "^([a-z]+)_org_polic(?:y|ies)$", name: "org:policies:$1" },
  { match: "^([a-z]+)_org_(events|subscription)$", name: "org:$2:$1" },
  { match: "^import_org_users_and_groups$", name: "org:members:import" },
];
