import type { AuthContext } from "../auth-context";

export interface SignInOptions {
  context: AuthContext;
  /** Receives the URL the user must open to approve access. */
  onAuthorizationUrl: (url: string) => void;
}
