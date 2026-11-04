export interface CredentialField {
  /** The env var that provides this value without the form. */
  key: string;
  label: string;
  hint: string;
  placeholder: string;
  secret: boolean;
}
