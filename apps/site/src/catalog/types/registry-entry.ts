/** One server of the registry's `index.json`, as `crates/manifest` writes it. */
export interface RegistryEntry {
  id: string;
  version: string;
  description: string;
  upstream: boolean;
  url: string;
}
