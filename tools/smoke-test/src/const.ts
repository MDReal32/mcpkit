/** The registry files a first look at GitHub leaves in the cache, so serving and searching `git:github` fetch nothing. */
export const SEEDED_MANIFESTS = ["index.json", "git/github.json"];

export const PROTOCOL_VERSION = "2025-03-26";

export const SERVER_NAME = "usemcpkit";

export const LISTED_TOOLS = ["search", "execute"];

export const SEARCH_TOOL = "search";

export const EXECUTE_TOOL = "execute";

export const SERVER_COUNT_CODE = "async () => (await codemode.servers()).length";

/** Reads the groups of the seeded `git:github` shell, so the search needs nothing from the registry. */
export const GITHUB_GROUPS_CODE = 'async () => codemode.groups("git:github")';

export const GITHUB_GROUP = "repos";

/** Runs in the sandbox of the release binary without calling a tool. */
export const EXECUTE_CODE = "async () => 6 * 7";

export const EXECUTE_RESULT = "42";
/** Port 9 (discard) refuses connections, so any registry request fails at once instead of reaching the network. */
export const UNREACHABLE_REGISTRY = "http://127.0.0.1:9";

export const RESPONSE_TIMEOUT_MS = 20_000;
