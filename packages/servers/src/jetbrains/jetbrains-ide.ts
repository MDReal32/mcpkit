export interface JetBrainsIde {
  /** The server name, also its folder in `src/servers`. */
  name: string;
  /** How JetBrains writes the product, as the name shown to the user. */
  productName: string;
  /** The start of the IDE's folder name in the log directory, which continues with the version (`WebStorm2026.2`). */
  logFolder: string;
}
