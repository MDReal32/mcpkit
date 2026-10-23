import { appsPackagesDeletePackageForAuthenticatedUser } from './delete-package-for-authenticated-user';
import { appsPackagesDeletePackageForOrg } from './delete-package-for-org';
import { appsPackagesDeletePackageForUser } from './delete-package-for-user';
import { appsPackagesDeletePackageVersionForAuthenticatedUser } from './delete-package-version-for-authenticated-user';
import { appsPackagesDeletePackageVersionForOrg } from './delete-package-version-for-org';
import { appsPackagesDeletePackageVersionForUser } from './delete-package-version-for-user';
import { appsPackagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUser } from './get-all-package-versions-for-package-owned-by-authenticated-user';
import { appsPackagesGetAllPackageVersionsForPackageOwnedByOrg } from './get-all-package-versions-for-package-owned-by-org';
import { appsPackagesGetAllPackageVersionsForPackageOwnedByUser } from './get-all-package-versions-for-package-owned-by-user';
import { appsPackagesGetPackageForAuthenticatedUser } from './get-package-for-authenticated-user';
import { appsPackagesGetPackageForOrganization } from './get-package-for-organization';
import { appsPackagesGetPackageForUser } from './get-package-for-user';
import { appsPackagesGetPackageVersionForAuthenticatedUser } from './get-package-version-for-authenticated-user';
import { appsPackagesGetPackageVersionForOrganization } from './get-package-version-for-organization';
import { appsPackagesGetPackageVersionForUser } from './get-package-version-for-user';
import { appsPackagesListDockerMigrationConflictingPackagesForAuthenticatedUser } from './list-docker-migration-conflicting-packages-for-authenticated-user';
import { appsPackagesListDockerMigrationConflictingPackagesForOrganization } from './list-docker-migration-conflicting-packages-for-organization';
import { appsPackagesListDockerMigrationConflictingPackagesForUser } from './list-docker-migration-conflicting-packages-for-user';
import { appsPackagesListPackagesForAuthenticatedUser } from './list-packages-for-authenticated-user';
import { appsPackagesListPackagesForOrganization } from './list-packages-for-organization';
import { appsPackagesListPackagesForUser } from './list-packages-for-user';
import { appsPackagesRestorePackageForAuthenticatedUser } from './restore-package-for-authenticated-user';
import { appsPackagesRestorePackageForOrg } from './restore-package-for-org';
import { appsPackagesRestorePackageForUser } from './restore-package-for-user';
import { appsPackagesRestorePackageVersionForAuthenticatedUser } from './restore-package-version-for-authenticated-user';
import { appsPackagesRestorePackageVersionForOrg } from './restore-package-version-for-org';
import { appsPackagesRestorePackageVersionForUser } from './restore-package-version-for-user';

export const appsPackagesTools = [
  appsPackagesDeletePackageForAuthenticatedUser,
  appsPackagesDeletePackageForOrg,
  appsPackagesDeletePackageForUser,
  appsPackagesDeletePackageVersionForAuthenticatedUser,
  appsPackagesDeletePackageVersionForOrg,
  appsPackagesDeletePackageVersionForUser,
  appsPackagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUser,
  appsPackagesGetAllPackageVersionsForPackageOwnedByOrg,
  appsPackagesGetAllPackageVersionsForPackageOwnedByUser,
  appsPackagesGetPackageForAuthenticatedUser,
  appsPackagesGetPackageForOrganization,
  appsPackagesGetPackageForUser,
  appsPackagesGetPackageVersionForAuthenticatedUser,
  appsPackagesGetPackageVersionForOrganization,
  appsPackagesGetPackageVersionForUser,
  appsPackagesListDockerMigrationConflictingPackagesForAuthenticatedUser,
  appsPackagesListDockerMigrationConflictingPackagesForOrganization,
  appsPackagesListDockerMigrationConflictingPackagesForUser,
  appsPackagesListPackagesForAuthenticatedUser,
  appsPackagesListPackagesForOrganization,
  appsPackagesListPackagesForUser,
  appsPackagesRestorePackageForAuthenticatedUser,
  appsPackagesRestorePackageForOrg,
  appsPackagesRestorePackageForUser,
  appsPackagesRestorePackageVersionForAuthenticatedUser,
  appsPackagesRestorePackageVersionForOrg,
  appsPackagesRestorePackageVersionForUser,
];
