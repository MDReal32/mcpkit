import { isJsonObject } from "../json";
import type { Migration } from "./migration";
import { FIRST_VERSION, readVersion } from "./read-version";

/**
 * Runs the migrations from the data's version up to the latest, which is `migrations.length + 1`, and stamps it.
 * Adding a version means appending one migration to the list; nothing else changes. Data from a newer version throws
 * instead of being rewritten.
 */
export const migrateData = (data: unknown, migrations: readonly Migration[]) => {
  const latest = FIRST_VERSION + migrations.length;
  const version = readVersion(data);
  if (!isJsonObject(data) || typeof version !== "number" || !Number.isInteger(version) || version < FIRST_VERSION) {
    throw new Error("is not valid versioned data");
  }
  if (version > latest) {
    throw new Error(`is version ${version}; this mcpkit reads up to version ${latest}, update mcpkit`);
  }
  const migrated = migrations
    .slice(version - FIRST_VERSION)
    .reduce<Record<string, unknown>>((current, migrate) => migrate(current), data);
  return { ...migrated, version: latest };
};
