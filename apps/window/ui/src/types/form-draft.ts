export interface FormDraft {
  /** The auth option the answer is for: the chosen method's, or the first one while the sign-in is chosen. */
  option: number;
  /** Key of the chosen connection method. */
  method: string;
  /** Values per field key, kept for every option so switching back does not lose input. */
  values: Record<string, string>;
  domain: string;
}
