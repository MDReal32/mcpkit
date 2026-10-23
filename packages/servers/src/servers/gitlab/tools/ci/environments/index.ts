import { ciEnvironmentsCreateProjectsEnvironments } from "./create-projects-environments";
import { ciEnvironmentsCreateProjectsEnvironmentsStop } from "./create-projects-environments-stop";
import { ciEnvironmentsCreateProjectsEnvironmentsStopStale } from "./create-projects-environments-stop-stale";
import { ciEnvironmentsDeleteProjectsEnvironments } from "./delete-projects-environments";
import { ciEnvironmentsDeleteProjectsEnvironmentsReviewApps } from "./delete-projects-environments-review-apps";
import { ciEnvironmentsGetProjectsEnvironments } from "./get-projects-environments";
import { ciEnvironmentsListProjectsEnvironments } from "./list-projects-environments";
import { ciEnvironmentsUpdateProjectsEnvironments } from "./update-projects-environments";

export const ciEnvironmentsTools = [
  ciEnvironmentsCreateProjectsEnvironments,
  ciEnvironmentsCreateProjectsEnvironmentsStop,
  ciEnvironmentsCreateProjectsEnvironmentsStopStale,
  ciEnvironmentsDeleteProjectsEnvironments,
  ciEnvironmentsDeleteProjectsEnvironmentsReviewApps,
  ciEnvironmentsGetProjectsEnvironments,
  ciEnvironmentsListProjectsEnvironments,
  ciEnvironmentsUpdateProjectsEnvironments,
];
