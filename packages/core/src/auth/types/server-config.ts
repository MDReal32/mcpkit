/** Settings of one server kept in the config file: its host and the credentials saved for it, by key. */
export interface ServerConfig {
  domain?: string;
  secrets?: Readonly<Record<string, string>>;
}
