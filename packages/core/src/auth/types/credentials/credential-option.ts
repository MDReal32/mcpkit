import type { UiAction } from "../../../manifest";
import type { CredentialField } from "./credential-field";

/** One fallback auth entry the user can fill in. */
export interface CredentialOption {
  /** Index of the entry in the manifest's `auth`. */
  index: number;
  label: string;
  fields: readonly CredentialField[];
  /** The buttons under the fields: links to create a token, or a CLI to take one from. */
  actions: readonly UiAction[];
}
