export interface FormDraft {
  option: number;
  /** Values per field key, kept for every option so switching back does not lose input. */
  values: Record<string, string>;
  domain: string;
}
