import type { CargoPackage } from "./cargo-package.ts";

/** The part of `cargo metadata --no-deps --format-version 1` this tool reads. */
export interface CargoMetadata {
  packages: readonly CargoPackage[];
}
