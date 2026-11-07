import type { CliMethod } from "./cli-method";
import type { ManualMethod } from "./manual-method";
import type { SignInMethod } from "./sign-in-method";

export type ConnectionMethod = SignInMethod | ManualMethod | CliMethod;
