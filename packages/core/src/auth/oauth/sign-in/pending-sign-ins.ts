import type { SignInResult } from "../../types/oauth/sign-in-result";

/** Concurrent tool calls for one server and auth entry share a single browser sign-in. */
export const pendingSignIns = new Map<string, Promise<SignInResult>>();
