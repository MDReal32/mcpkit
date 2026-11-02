/** Overrides what the credentials page shows for one credential field. */
export interface UiInputSpec {
  label?: string;
  hint?: string;
  placeholder?: string;
  /** Whether the page masks what is typed; true when left out. Ids that are not secret can set it to false. */
  secret?: boolean;
}
