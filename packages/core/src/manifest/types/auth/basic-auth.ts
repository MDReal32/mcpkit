import type { UiSpec } from "../ui/ui-spec";

export interface BasicAuth {
  type: "basic";
  usernameEnv: string;
  passwordEnv: string;
  /** Shown for this option in the credentials form instead of its auth type and env vars. */
  label?: string;
  /** Texts, field labels and buttons of the credentials page for this entry. */
  ui?: UiSpec;
}
