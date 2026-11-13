import type { Applies, UiAction } from "../../manifest";
import type { CredentialField } from "./credential-field";

/** One fallback auth entry the user can fill in. */
export interface CredentialOption {
  /** Index of the entry in the manifest's `auth`. */
  index: number;
  label: string;
  fields: readonly CredentialField[];
  /** The buttons under the fields: links to create a token, or a CLI to take one from. */
  actions: readonly UiAction[];
  /** The sources and versions this option is offered for; every one when absent. */
  applies?: Applies;
}
