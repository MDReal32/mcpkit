import type { AuthSpec } from './auth-spec';
import type { InteractiveAuth } from './interactive-auth';

/** Auth whose credentials are provided up front: an env var, a saved value or the credentials form. */
export type FallbackAuth = Exclude<AuthSpec, InteractiveAuth>;
