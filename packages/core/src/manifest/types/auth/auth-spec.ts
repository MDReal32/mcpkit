import type { BasicAuth } from "./basic-auth";
import type { BearerAuth } from "./bearer-auth";
import type { HeaderAuth } from "./header-auth";
import type { NoneAuth } from "./none-auth";
import type { OAuthAuth } from "./oauth-auth";
import type { QueryAuth } from "./query-auth";

export type AuthSpec = NoneAuth | BearerAuth | HeaderAuth | QueryAuth | BasicAuth | OAuthAuth;
