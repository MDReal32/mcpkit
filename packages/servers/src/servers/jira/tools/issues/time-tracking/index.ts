import { issuesTimeTrackingGetAvailableTimeTrackingImplementations } from './get-available-time-tracking-implementations';
import { issuesTimeTrackingGetSelectedTimeTrackingImplementation } from './get-selected-time-tracking-implementation';
import { issuesTimeTrackingGetSharedTimeTrackingConfiguration } from './get-shared-time-tracking-configuration';
import { issuesTimeTrackingSelectTimeTrackingImplementation } from './select-time-tracking-implementation';
import { issuesTimeTrackingSetSharedTimeTrackingConfiguration } from './set-shared-time-tracking-configuration';

export const issuesTimeTrackingTools = [
  issuesTimeTrackingGetAvailableTimeTrackingImplementations,
  issuesTimeTrackingGetSelectedTimeTrackingImplementation,
  issuesTimeTrackingGetSharedTimeTrackingConfiguration,
  issuesTimeTrackingSelectTimeTrackingImplementation,
  issuesTimeTrackingSetSharedTimeTrackingConfiguration,
];
