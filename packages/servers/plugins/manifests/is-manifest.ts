import type { Manifest } from "@usemcpkit/core";
import { isValidManifest } from "@usemcpkit/native";

/** The Rust validation of `@usemcpkit/native` as a type guard for the compiled manifest. */
export const isManifest = (value: unknown): value is Manifest => isValidManifest(value);
