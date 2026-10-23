import { securityDependencyManagementCreateGroupsDependencyListExports } from "./create-groups-dependency-list-exports";
import { securityDependencyManagementCreatePipelinesDependencyListExports } from "./create-pipelines-dependency-list-exports";
import { securityDependencyManagementCreateProjectsDependencyListExports } from "./create-projects-dependency-list-exports";
import { securityDependencyManagementGetDependencyListExports } from "./get-dependency-list-exports";
import { securityDependencyManagementGetDependencyListExportsDownload } from "./get-dependency-list-exports-download";
import { securityDependencyManagementGetOccurrencesVulnerabilities } from "./get-occurrences-vulnerabilities";
import { securityDependencyManagementListProjectsDependencies } from "./list-projects-dependencies";

export const securityDependencyManagementTools = [
  securityDependencyManagementCreateGroupsDependencyListExports,
  securityDependencyManagementCreatePipelinesDependencyListExports,
  securityDependencyManagementCreateProjectsDependencyListExports,
  securityDependencyManagementGetDependencyListExports,
  securityDependencyManagementGetDependencyListExportsDownload,
  securityDependencyManagementGetOccurrencesVulnerabilities,
  securityDependencyManagementListProjectsDependencies,
];
