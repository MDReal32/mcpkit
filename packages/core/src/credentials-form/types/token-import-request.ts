/** Asks the CLI to run the `cli` action `action` of `option`, and answer the form with the token it prints. */
export interface TokenImportRequest {
  option: number;
  /** Index into the option's actions. */
  action: number;
  domain?: string;
}
