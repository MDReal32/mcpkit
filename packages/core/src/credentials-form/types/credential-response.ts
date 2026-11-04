import type { SignInCredentialResponse } from "./sign-in-credential-response";
import type { TokenCredentialResponse } from "./token-credential-response";

export type CredentialResponse = TokenCredentialResponse | SignInCredentialResponse;
