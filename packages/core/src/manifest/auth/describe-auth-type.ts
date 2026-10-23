import type { AuthSpec } from "../types/auth/auth-spec";

export const describeAuthType = (auth: AuthSpec) => (auth.type === "oauth" ? "oauth pkce" : auth.type);
