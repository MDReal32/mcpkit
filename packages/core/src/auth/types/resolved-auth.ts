export interface ResolvedAuth {
  headers: Readonly<Record<string, string>>;
  query: Readonly<Record<string, string>>;
}
