export interface TokenCredentialResponse {
  method: "token";
  /** `index` of the chosen credential option. */
  option: number;
  /** Values per field key. */
  values: Readonly<Record<string, string>>;
  domain?: string;
}
