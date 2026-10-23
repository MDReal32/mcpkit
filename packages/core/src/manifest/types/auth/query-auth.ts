import type { UiSpec } from "../ui/ui-spec";

export interface QueryAuth {
  type: "query";
  env: string;
  name: string;
  /** Shown for this option in the credentials form instead of its auth type and env vars. */
  label?: string;
  /** Texts, field labels and buttons of the credentials page for this entry. */
  ui?: UiSpec;
}
