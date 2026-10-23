import { migrationsCancelImport } from './cancel-import';
import { migrationsDeleteArchiveForAuthenticatedUser } from './delete-archive-for-authenticated-user';
import { migrationsDeleteArchiveForOrg } from './delete-archive-for-org';
import { migrationsDownloadArchiveForOrg } from './download-archive-for-org';
import { migrationsGetArchiveForAuthenticatedUser } from './get-archive-for-authenticated-user';
import { migrationsGetCommitAuthors } from './get-commit-authors';
import { migrationsGetImportStatus } from './get-import-status';
import { migrationsGetLargeFiles } from './get-large-files';
import { migrationsGetStatusForAuthenticatedUser } from './get-status-for-authenticated-user';
import { migrationsGetStatusForOrg } from './get-status-for-org';
import { migrationsListForAuthenticatedUser } from './list-for-authenticated-user';
import { migrationsListForOrg } from './list-for-org';
import { migrationsListReposForAuthenticatedUser } from './list-repos-for-authenticated-user';
import { migrationsListReposForOrg } from './list-repos-for-org';
import { migrationsMapCommitAuthor } from './map-commit-author';
import { migrationsSetLfsPreference } from './set-lfs-preference';
import { migrationsStartForAuthenticatedUser } from './start-for-authenticated-user';
import { migrationsStartForOrg } from './start-for-org';
import { migrationsStartImport } from './start-import';
import { migrationsUnlockRepoForAuthenticatedUser } from './unlock-repo-for-authenticated-user';
import { migrationsUnlockRepoForOrg } from './unlock-repo-for-org';
import { migrationsUpdateImport } from './update-import';

export const migrationsTools = [
  migrationsCancelImport,
  migrationsDeleteArchiveForAuthenticatedUser,
  migrationsDeleteArchiveForOrg,
  migrationsDownloadArchiveForOrg,
  migrationsGetArchiveForAuthenticatedUser,
  migrationsGetCommitAuthors,
  migrationsGetImportStatus,
  migrationsGetLargeFiles,
  migrationsGetStatusForAuthenticatedUser,
  migrationsGetStatusForOrg,
  migrationsListForAuthenticatedUser,
  migrationsListForOrg,
  migrationsListReposForAuthenticatedUser,
  migrationsListReposForOrg,
  migrationsMapCommitAuthor,
  migrationsSetLfsPreference,
  migrationsStartForAuthenticatedUser,
  migrationsStartForOrg,
  migrationsStartImport,
  migrationsUnlockRepoForAuthenticatedUser,
  migrationsUnlockRepoForOrg,
  migrationsUpdateImport,
];
