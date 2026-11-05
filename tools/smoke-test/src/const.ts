/** The registry files a first look at GitHub leaves in the cache, so serving and opening `git:github` fetch nothing. */
export const SEEDED_MANIFESTS = ["index.json", "git/github.json"];

export const PROTOCOL_VERSION = "2025-03-26";

export const SERVER_NAME = "usemcpkit";

export const SECTION_TOOL = "git_github";

export const SECTION_TEXT_PREFIX = "git:github is a section, not a tool.";

export const OPENED_GROUP_TOOL = "git_github_repos";

export const TOOLS_CHANGED_METHOD = "notifications/tools/list_changed";

/** Port 9 (discard) refuses connections, so any registry request fails at once instead of reaching the network. */
export const UNREACHABLE_REGISTRY = "http://127.0.0.1:9";

export const RESPONSE_TIMEOUT_MS = 20_000;
