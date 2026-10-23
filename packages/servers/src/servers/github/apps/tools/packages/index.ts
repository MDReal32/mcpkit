import { packagesDeletePackageForAuthenticatedUser } from './delete-package-for-authenticated-user';
import { packagesDeletePackageForOrg } from './delete-package-for-org';
import { packagesDeletePackageForUser } from './delete-package-for-user';
import { packagesDeletePackageVersionForAuthenticatedUser } from './delete-package-version-for-authenticated-user';
import { packagesDeletePackageVersionForOrg } from './delete-package-version-for-org';
import { packagesDeletePackageVersionForUser } from './delete-package-version-for-user';
import { packagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUser } from './get-all-package-versions-for-package-owned-by-authenticated-user';
import { packagesGetAllPackageVersionsForPackageOwnedByOrg } from './get-all-package-versions-for-package-owned-by-org';
import { packagesGetAllPackageVersionsForPackageOwnedByUser } from './get-all-package-versions-for-package-owned-by-user';
import { packagesGetPackageForAuthenticatedUser } from './get-package-for-authenticated-user';
import { packagesGetPackageForOrganization } from './get-package-for-organization';
import { packagesGetPackageForUser } from './get-package-for-user';
import { packagesGetPackageVersionForAuthenticatedUser } from './get-package-version-for-authenticated-user';
import { packagesGetPackageVersionForOrganization } from './get-package-version-for-organization';
import { packagesGetPackageVersionForUser } from './get-package-version-for-user';
import { packagesListDockerMigrationConflictingPackagesForAuthenticatedUser } from './list-docker-migration-conflicting-packages-for-authenticated-user';
import { packagesListDockerMigrationConflictingPackagesForOrganization } from './list-docker-migration-conflicting-packages-for-organization';
import { packagesListDockerMigrationConflictingPackagesForUser } from './list-docker-migration-conflicting-packages-for-user';
import { packagesListPackagesForAuthenticatedUser } from './list-packages-for-authenticated-user';
import { packagesListPackagesForOrganization } from './list-packages-for-organization';
import { packagesListPackagesForUser } from './list-packages-for-user';
import { packagesRestorePackageForAuthenticatedUser } from './restore-package-for-authenticated-user';
import { packagesRestorePackageForOrg } from './restore-package-for-org';
import { packagesRestorePackageForUser } from './restore-package-for-user';
import { packagesRestorePackageVersionForAuthenticatedUser } from './restore-package-version-for-authenticated-user';
import { packagesRestorePackageVersionForOrg } from './restore-package-version-for-org';
import { packagesRestorePackageVersionForUser } from './restore-package-version-for-user';

export const packagesTools = [
  packagesDeletePackageForAuthenticatedUser,
  packagesDeletePackageForOrg,
  packagesDeletePackageForUser,
  packagesDeletePackageVersionForAuthenticatedUser,
  packagesDeletePackageVersionForOrg,
  packagesDeletePackageVersionForUser,
  packagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUser,
  packagesGetAllPackageVersionsForPackageOwnedByOrg,
  packagesGetAllPackageVersionsForPackageOwnedByUser,
  packagesGetPackageForAuthenticatedUser,
  packagesGetPackageForOrganization,
  packagesGetPackageForUser,
  packagesGetPackageVersionForAuthenticatedUser,
  packagesGetPackageVersionForOrganization,
  packagesGetPackageVersionForUser,
  packagesListDockerMigrationConflictingPackagesForAuthenticatedUser,
  packagesListDockerMigrationConflictingPackagesForOrganization,
  packagesListDockerMigrationConflictingPackagesForUser,
  packagesListPackagesForAuthenticatedUser,
  packagesListPackagesForOrganization,
  packagesListPackagesForUser,
  packagesRestorePackageForAuthenticatedUser,
  packagesRestorePackageForOrg,
  packagesRestorePackageForUser,
  packagesRestorePackageVersionForAuthenticatedUser,
  packagesRestorePackageVersionForOrg,
  packagesRestorePackageVersionForUser,
];
