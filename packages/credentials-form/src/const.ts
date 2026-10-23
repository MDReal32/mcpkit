export const FORM_HOST = '127.0.0.1';

export const SESSION_TOKEN_BYTES = 32;

export const MAX_BODY_BYTES = 64 * 1024;

export const CREDENTIALS_FORM_TIMEOUT_MS = 5 * 60_000;

export const FORM_CLOSED_MESSAGE = 'the credentials form was closed without an answer';

export const CLI_TOKEN_TIMEOUT_MS = 15_000;

/** Stands in for the token while the import request is validated, before the CLI runs. */
export const PENDING_TOKEN_VALUE = 'pending';

/** What Windows tries when `PATHEXT` is not set. */
export const WINDOWS_DEFAULT_PATH_EXTENSIONS = '.COM;.EXE;.BAT;.CMD';

/** Errors that only mean "not at this PATH entry". */
export const PATH_LOOKUP_MISS_CODES: readonly string[] = ['ENOENT', 'ENOTDIR', 'EACCES', 'EPERM'];
