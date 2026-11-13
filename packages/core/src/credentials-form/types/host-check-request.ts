/** What the Check button posts: the typed host, and the picked option with what is typed into it so far. */
export interface HostCheckRequest {
  domain: string;
  option?: number;
  values?: Readonly<Record<string, string>>;
}
