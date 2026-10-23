import { securityLicensesCreateLicense } from './create-license';
import { securityLicensesCreateProjectsManagedLicenses } from './create-projects-managed-licenses';
import { securityLicensesDeleteLicense } from './delete-license';
import { securityLicensesDeleteProjectsManagedLicenses } from './delete-projects-managed-licenses';
import { securityLicensesGetLicense } from './get-license';
import { securityLicensesGetLicenseGet } from './get-license-get';
import { securityLicensesGetLicenseUsageExport } from './get-license-usage-export';
import { securityLicensesGetProjectsManagedLicenses } from './get-projects-managed-licenses';
import { securityLicensesListLicenses } from './list-licenses';
import { securityLicensesListProjectsManagedLicenses } from './list-projects-managed-licenses';
import { securityLicensesUpdateLicenseRefreshBillableUsers } from './update-license-refresh-billable-users';
import { securityLicensesUpdateProjectsManagedLicenses } from './update-projects-managed-licenses';

export const securityLicensesTools = [
  securityLicensesCreateLicense,
  securityLicensesCreateProjectsManagedLicenses,
  securityLicensesDeleteLicense,
  securityLicensesDeleteProjectsManagedLicenses,
  securityLicensesGetLicense,
  securityLicensesGetLicenseGet,
  securityLicensesGetLicenseUsageExport,
  securityLicensesGetProjectsManagedLicenses,
  securityLicensesListLicenses,
  securityLicensesListProjectsManagedLicenses,
  securityLicensesUpdateLicenseRefreshBillableUsers,
  securityLicensesUpdateProjectsManagedLicenses,
];
