import type { AcceptedAuthAttempt } from "./accepted-auth-attempt";
import type { RejectedAuthAttempt } from "./rejected-auth-attempt";

export type AuthAttempt = AcceptedAuthAttempt | RejectedAuthAttempt;
