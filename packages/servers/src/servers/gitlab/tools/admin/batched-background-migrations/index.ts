import { adminBatchedBackgroundMigrationsGetAdminBatchedBackgroundMigrations } from './get-admin-batched-background-migrations';
import { adminBatchedBackgroundMigrationsListAdminBatchedBackgroundMigrations } from './list-admin-batched-background-migrations';
import { adminBatchedBackgroundMigrationsUpdateAdminBatchedBackgroundMigrationsPause } from './update-admin-batched-background-migrations-pause';
import { adminBatchedBackgroundMigrationsUpdateAdminBatchedBackgroundMigrationsResume } from './update-admin-batched-background-migrations-resume';

export const adminBatchedBackgroundMigrationsTools = [
  adminBatchedBackgroundMigrationsGetAdminBatchedBackgroundMigrations,
  adminBatchedBackgroundMigrationsListAdminBatchedBackgroundMigrations,
  adminBatchedBackgroundMigrationsUpdateAdminBatchedBackgroundMigrationsPause,
  adminBatchedBackgroundMigrationsUpdateAdminBatchedBackgroundMigrationsResume,
];
