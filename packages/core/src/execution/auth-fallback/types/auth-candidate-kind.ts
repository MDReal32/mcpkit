/** `stored` always goes first, `provided` may be remembered as the server's working auth, `interactive` asks the user. */
export type AuthCandidateKind = "stored" | "provided" | "interactive";
