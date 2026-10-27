import { applicationsApplicationsGetApplication } from "./get-application";
import { applicationsApplicationsGetMyApplication } from "./get-my-application";
import { applicationsApplicationsUpdateApplication } from "./update-application";
import { applicationsApplicationsUpdateMyApplication } from "./update-my-application";

export const applicationsApplicationsTools = [
  applicationsApplicationsGetApplication,
  applicationsApplicationsGetMyApplication,
  applicationsApplicationsUpdateApplication,
  applicationsApplicationsUpdateMyApplication,
];
