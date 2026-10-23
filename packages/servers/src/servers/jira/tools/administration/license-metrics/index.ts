import { administrationLicenseMetricsGetApproximateApplicationLicenseCount } from './get-approximate-application-license-count';
import { administrationLicenseMetricsGetApproximateLicenseCount } from './get-approximate-license-count';
import { administrationLicenseMetricsGetLicense } from './get-license';

export const administrationLicenseMetricsTools = [
  administrationLicenseMetricsGetApproximateApplicationLicenseCount,
  administrationLicenseMetricsGetApproximateLicenseCount,
  administrationLicenseMetricsGetLicense,
];
