export interface DomainField {
  label: string;
  hint: string;
  placeholder: string;
  /** The domain in use, prefilled in the form; empty when there is none yet. */
  value: string;
}
