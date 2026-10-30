export const EXIT_SUCCESS = 0;

export const EXIT_FAILURE = 1;

export const ALL_FLAG = "--all";

export const CLIENTS_FLAG = "--clients";

export const BINARY_FLAG = "--binary";

/** The signals a client or terminal ends `serve` with; the supervisor stops its worker before it exits. */
export const SHUTDOWN_SIGNALS: readonly NodeJS.Signals[] = ["SIGTERM", "SIGINT", "SIGHUP"];
