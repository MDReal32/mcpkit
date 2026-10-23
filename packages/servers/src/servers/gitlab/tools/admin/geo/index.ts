import { adminGeoCreateGeoFailures } from "./create-geo-failures";
import { adminGeoCreateGeoNodeProxyGraphql } from "./create-geo-node-proxy-graphql";
import { adminGeoCreateGeoNodes } from "./create-geo-nodes";
import { adminGeoCreateGeoNodesRepair } from "./create-geo-nodes-repair";
import { adminGeoCreateGeoProxyGitSshInfoRefsReceivePack } from "./create-geo-proxy-git-ssh-info-refs-receive-pack";
import { adminGeoCreateGeoProxyGitSshInfoRefsUploadPack } from "./create-geo-proxy-git-ssh-info-refs-upload-pack";
import { adminGeoCreateGeoProxyGitSshReceivePack } from "./create-geo-proxy-git-ssh-receive-pack";
import { adminGeoCreateGeoProxyGitSshUploadPack } from "./create-geo-proxy-git-ssh-upload-pack";
import { adminGeoCreateGeoSites } from "./create-geo-sites";
import { adminGeoCreateGeoSitesRepair } from "./create-geo-sites-repair";
import { adminGeoCreateGeoStatus } from "./create-geo-status";
import { adminGeoDeleteGeoNodes } from "./delete-geo-nodes";
import { adminGeoDeleteGeoSites } from "./delete-geo-sites";
import { adminGeoGetGeoNodes } from "./get-geo-nodes";
import { adminGeoGetGeoNodesStatus } from "./get-geo-nodes-status";
import { adminGeoGetGeoProxy } from "./get-geo-proxy";
import { adminGeoGetGeoRetrieve } from "./get-geo-retrieve";
import { adminGeoGetGeoSites } from "./get-geo-sites";
import { adminGeoGetGeoSitesStatus } from "./get-geo-sites-status";
import { adminGeoListGeoNodes } from "./list-geo-nodes";
import { adminGeoListGeoNodesStatus } from "./list-geo-nodes-status";
import { adminGeoListGeoRepositoriesPipelineRefs } from "./list-geo-repositories-pipeline-refs";
import { adminGeoListGeoSites } from "./list-geo-sites";
import { adminGeoListGeoSitesStatus } from "./list-geo-sites-status";
import { adminGeoUpdateGeoNodes } from "./update-geo-nodes";
import { adminGeoUpdateGeoSites } from "./update-geo-sites";

export const adminGeoTools = [
  adminGeoCreateGeoFailures,
  adminGeoCreateGeoNodeProxyGraphql,
  adminGeoCreateGeoNodes,
  adminGeoCreateGeoNodesRepair,
  adminGeoCreateGeoProxyGitSshInfoRefsReceivePack,
  adminGeoCreateGeoProxyGitSshInfoRefsUploadPack,
  adminGeoCreateGeoProxyGitSshReceivePack,
  adminGeoCreateGeoProxyGitSshUploadPack,
  adminGeoCreateGeoSites,
  adminGeoCreateGeoSitesRepair,
  adminGeoCreateGeoStatus,
  adminGeoDeleteGeoNodes,
  adminGeoDeleteGeoSites,
  adminGeoGetGeoNodes,
  adminGeoGetGeoNodesStatus,
  adminGeoGetGeoProxy,
  adminGeoGetGeoRetrieve,
  adminGeoGetGeoSites,
  adminGeoGetGeoSitesStatus,
  adminGeoListGeoNodes,
  adminGeoListGeoNodesStatus,
  adminGeoListGeoRepositoriesPipelineRefs,
  adminGeoListGeoSites,
  adminGeoListGeoSitesStatus,
  adminGeoUpdateGeoNodes,
  adminGeoUpdateGeoSites,
];
