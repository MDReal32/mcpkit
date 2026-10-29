import type { Migration } from "../../migrations";
import { dropLastUsedDomain } from "./migrations/drop-last-used-domain";
import { groupServers } from "./migrations/group-servers";
import { migrateServers } from "./migrations/migrate-servers";
import { moveSecretsUnderHost } from "./migrations/move-secrets-under-host";
import { toLegacyCategory } from "./migrations/to-legacy-category";

/** One entry per version bump, in order; the version of the config file is the list length plus one. */
export const CONFIG_MIGRATIONS: readonly Migration[] = [
  migrateServers(moveSecretsUnderHost),
  migrateServers(dropLastUsedDomain),
  groupServers(toLegacyCategory),
];

export const CONFIG_VERSION = CONFIG_MIGRATIONS.length + 1;
