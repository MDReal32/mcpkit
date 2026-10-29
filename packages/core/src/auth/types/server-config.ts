/** What is saved for one host of a server. */
export interface HostConfig {
  secrets?: Readonly<Record<string, string>>;
}

/**
 * Settings of one server. `hosts` holds the credentials per host, so two hosts never share a token;
 * `projects` remembers which host a project (its git root) uses.
 */
export interface ServerConfig {
  hosts?: Readonly<Record<string, HostConfig>>;
  projects?: Readonly<Record<string, string>>;
}
