import type { AuthSpec } from "../types/auth/auth-spec";
import { describeAuthSpec } from "./describe-auth-spec";

export const describeAuth = (auth: readonly AuthSpec[] | undefined) => {
  if (!auth || auth.length === 0) {
    return "no auth";
  }
  return auth.map(describeAuthSpec).join(" → ");
};
