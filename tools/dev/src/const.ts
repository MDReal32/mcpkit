import type { Prerequisite } from "./types/prerequisite";

export const DEV_HOME_SEGMENTS = ["tmp", ".usemcpkit"];

export const REGISTRY_SEGMENTS = ["packages", "servers", "build", "manifests"];

export const RELEASE_SEGMENTS = ["target", "release"];

export const CARGO_PACKAGES = ["usemcpkit-runner", "usemcpkit-servers", "usemcpkit-window"];

export const MANIFESTS_WORKSPACE = "@usemcpkit/servers";

/** Built by `yarn build`; the server embeds the page and the manifests build reads the addon, so neither can be made from here alone. */
export const PREREQUISITES: Prerequisite[] = [
  { path: ["apps", "window", "ui", "build", "usemcpkit.ui.html"], builtBy: "@usemcpkit/ui" },
  { path: ["packages", "native", "build"], builtBy: "@usemcpkit/native" },
];

export const BINARY_NAMES = ["usemcpkit", "usemcpkit-servers", "usemcpkit-window"];

export const RUNNER_NAME = "usemcpkit";

export const DEFAULT_ARGS = ["list"];

export const UPDATE_COMMAND = "update";

/** Set it, or pass `--no-build` first, to skip the builds and serve the binaries already installed in the dev home. */
export const NO_BUILD_ENV = "USEMCPKIT_DEV_NO_BUILD";

export const NO_BUILD_FLAG = "--no-build";

/** The name a client starts, found on PATH, so a committed request holds no path of this machine. */
export const SERVE_LINK_NAME = "usemcpkit-dev-serve";

export const SERVE_SCRIPT_SEGMENTS = ["tools", "dev", "serve.sh"];

export const HOME_ENV = "USEMCPKIT_HOME";

export const REGISTRY_ENV = "USEMCPKIT_REGISTRY";

export const AUTO_UPDATE_ENV = "USEMCPKIT_AUTOUPDATE";

export const LOOPBACK_HOST = "127.0.0.1";

export const JSON_CONTENT_TYPE = "application/json";

export const BINARY_CONTENT_TYPE = "application/octet-stream";
