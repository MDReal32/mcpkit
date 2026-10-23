import type { AuthAttempt } from "./types/auth-attempt";

export const rejectAuthAttempt = (reason: string) => {
  const attempt: AuthAttempt = { accepted: false, reason };
  return attempt;
};
