import { adminMigrationsCreateAdminMigrationsMark } from "./create-admin-migrations-mark";
import { adminMigrationsListAdminMigrationsPending } from "./list-admin-migrations-pending";

export const adminMigrationsTools = [
  adminMigrationsCreateAdminMigrationsMark,
  adminMigrationsListAdminMigrationsPending,
];
