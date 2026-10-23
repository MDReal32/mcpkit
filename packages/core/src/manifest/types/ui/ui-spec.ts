import type { UiAction } from "./ui-action";
import type { UiInputSpec } from "./ui-input-spec";
import type { UiTexts } from "./ui-texts";

/**
 * What the credentials page shows. On the manifest only `texts` applies (page-wide strings); on an auth entry
 * `inputs` (by env var name) and `actions` apply. Anything left out falls back to mcpkit's default text.
 */
export interface UiSpec {
  texts?: Partial<UiTexts>;
  inputs?: Readonly<Record<string, UiInputSpec>>;
  actions?: readonly UiAction[];
}
