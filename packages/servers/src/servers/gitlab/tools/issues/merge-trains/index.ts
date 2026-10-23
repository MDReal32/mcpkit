import { issuesMergeTrainsCreateProjectsMergeTrainsMergeRequests } from "./create-projects-merge-trains-merge-requests";
import { issuesMergeTrainsGetProjectsMergeTrainsMergeRequests } from "./get-projects-merge-trains-merge-requests";
import { issuesMergeTrainsListProjectsMergeTrains } from "./list-projects-merge-trains";
import { issuesMergeTrainsListProjectsMergeTrainsGet } from "./list-projects-merge-trains-get";

export const issuesMergeTrainsTools = [
  issuesMergeTrainsCreateProjectsMergeTrainsMergeRequests,
  issuesMergeTrainsGetProjectsMergeTrainsMergeRequests,
  issuesMergeTrainsListProjectsMergeTrains,
  issuesMergeTrainsListProjectsMergeTrainsGet,
];
