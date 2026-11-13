/** One OpenAPI source of the server, so the page can tell which one a typed host belongs to. */
export interface DomainSource {
  name: string;
  label: string;
  /** Host suffixes; absent, the source matches any host. */
  hosts?: readonly string[];
  /** Whether the server can be asked its version, which the Check button does. */
  versioned: boolean;
}
