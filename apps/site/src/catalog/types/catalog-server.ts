import type { RegistryEntry } from "./registry-entry";

export interface CatalogServer extends Pick<RegistryEntry, "id" | "version" | "description" | "upstream"> {
  category: string;
  name: string;
  displayName: string;
  tagline: string;
  manifestUrl: string;
}
