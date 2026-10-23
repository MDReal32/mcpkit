import { ciClustersCreateAdminClustersAdd } from "./create-admin-clusters-add";
import { ciClustersCreateGroupsClustersUser } from "./create-groups-clusters-user";
import { ciClustersCreateProjectsClustersUser } from "./create-projects-clusters-user";
import { ciClustersDeleteAdminClusters } from "./delete-admin-clusters";
import { ciClustersDeleteGroupsClusters } from "./delete-groups-clusters";
import { ciClustersDeleteProjectsClusters } from "./delete-projects-clusters";
import { ciClustersGetAdminClusters } from "./get-admin-clusters";
import { ciClustersGetGroupsClusters } from "./get-groups-clusters";
import { ciClustersGetProjectsClusters } from "./get-projects-clusters";
import { ciClustersListAdminClusters } from "./list-admin-clusters";
import { ciClustersListDiscoverCertBasedClusters } from "./list-discover-cert-based-clusters";
import { ciClustersListGroupsClusters } from "./list-groups-clusters";
import { ciClustersListProjectsClusters } from "./list-projects-clusters";
import { ciClustersUpdateAdminClusters } from "./update-admin-clusters";
import { ciClustersUpdateGroupsClusters } from "./update-groups-clusters";
import { ciClustersUpdateProjectsClusters } from "./update-projects-clusters";

export const ciClustersTools = [
  ciClustersCreateAdminClustersAdd,
  ciClustersCreateGroupsClustersUser,
  ciClustersCreateProjectsClustersUser,
  ciClustersDeleteAdminClusters,
  ciClustersDeleteGroupsClusters,
  ciClustersDeleteProjectsClusters,
  ciClustersGetAdminClusters,
  ciClustersGetGroupsClusters,
  ciClustersGetProjectsClusters,
  ciClustersListAdminClusters,
  ciClustersListDiscoverCertBasedClusters,
  ciClustersListGroupsClusters,
  ciClustersListProjectsClusters,
  ciClustersUpdateAdminClusters,
  ciClustersUpdateGroupsClusters,
  ciClustersUpdateProjectsClusters,
];
