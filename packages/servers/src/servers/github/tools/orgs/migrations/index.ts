import { orgsMigrationsCancelImport } from "./cancel-import";
import { orgsMigrationsDeleteArchiveForAuthenticatedUser } from "./delete-archive-for-authenticated-user";
import { orgsMigrationsDeleteArchiveForOrg } from "./delete-archive-for-org";
import { orgsMigrationsDownloadArchiveForOrg } from "./download-archive-for-org";
import { orgsMigrationsGetArchiveForAuthenticatedUser } from "./get-archive-for-authenticated-user";
import { orgsMigrationsGetCommitAuthors } from "./get-commit-authors";
import { orgsMigrationsGetImportStatus } from "./get-import-status";
import { orgsMigrationsGetLargeFiles } from "./get-large-files";
import { orgsMigrationsGetStatusForAuthenticatedUser } from "./get-status-for-authenticated-user";
import { orgsMigrationsGetStatusForOrg } from "./get-status-for-org";
import { orgsMigrationsListForAuthenticatedUser } from "./list-for-authenticated-user";
import { orgsMigrationsListForOrg } from "./list-for-org";
import { orgsMigrationsListReposForAuthenticatedUser } from "./list-repos-for-authenticated-user";
import { orgsMigrationsListReposForOrg } from "./list-repos-for-org";
import { orgsMigrationsMapCommitAuthor } from "./map-commit-author";
import { orgsMigrationsSetLfsPreference } from "./set-lfs-preference";
import { orgsMigrationsStartForAuthenticatedUser } from "./start-for-authenticated-user";
import { orgsMigrationsStartForOrg } from "./start-for-org";
import { orgsMigrationsStartImport } from "./start-import";
import { orgsMigrationsUnlockRepoForAuthenticatedUser } from "./unlock-repo-for-authenticated-user";
import { orgsMigrationsUnlockRepoForOrg } from "./unlock-repo-for-org";
import { orgsMigrationsUpdateImport } from "./update-import";

export const orgsMigrationsTools = [
  orgsMigrationsCancelImport,
  orgsMigrationsDeleteArchiveForAuthenticatedUser,
  orgsMigrationsDeleteArchiveForOrg,
  orgsMigrationsDownloadArchiveForOrg,
  orgsMigrationsGetArchiveForAuthenticatedUser,
  orgsMigrationsGetCommitAuthors,
  orgsMigrationsGetImportStatus,
  orgsMigrationsGetLargeFiles,
  orgsMigrationsGetStatusForAuthenticatedUser,
  orgsMigrationsGetStatusForOrg,
  orgsMigrationsListForAuthenticatedUser,
  orgsMigrationsListForOrg,
  orgsMigrationsListReposForAuthenticatedUser,
  orgsMigrationsListReposForOrg,
  orgsMigrationsMapCommitAuthor,
  orgsMigrationsSetLfsPreference,
  orgsMigrationsStartForAuthenticatedUser,
  orgsMigrationsStartForOrg,
  orgsMigrationsStartImport,
  orgsMigrationsUnlockRepoForAuthenticatedUser,
  orgsMigrationsUnlockRepoForOrg,
  orgsMigrationsUpdateImport,
];
