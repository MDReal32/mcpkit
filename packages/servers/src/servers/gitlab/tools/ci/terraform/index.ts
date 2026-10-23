import { ciTerraformCreateProjectsTerraformState } from "./create-projects-terraform-state";
import { ciTerraformCreateProjectsTerraformStateAuthorize } from "./create-projects-terraform-state-authorize";
import { ciTerraformCreateProjectsTerraformStateLock } from "./create-projects-terraform-state-lock";
import { ciTerraformDeleteProjectsTerraformState } from "./delete-projects-terraform-state";
import { ciTerraformDeleteProjectsTerraformStateLock } from "./delete-projects-terraform-state-lock";
import { ciTerraformDeleteProjectsTerraformStateVersions } from "./delete-projects-terraform-state-versions";
import { ciTerraformGetPackagesTerraformModulesV1 } from "./get-packages-terraform-modules-v1";
import { ciTerraformGetPackagesTerraformModulesV1Download } from "./get-packages-terraform-modules-v1-download";
import { ciTerraformGetPackagesTerraformModulesV1DownloadGet } from "./get-packages-terraform-modules-v1-download-get";
import { ciTerraformGetPackagesTerraformModulesV1File } from "./get-packages-terraform-modules-v1-file";
import { ciTerraformGetPackagesTerraformModulesV1Get } from "./get-packages-terraform-modules-v1-get";
import { ciTerraformGetProjectsPackagesTerraformModules } from "./get-projects-packages-terraform-modules";
import { ciTerraformGetProjectsPackagesTerraformModulesGet } from "./get-projects-packages-terraform-modules-get";
import { ciTerraformGetProjectsTerraformState } from "./get-projects-terraform-state";
import { ciTerraformGetProjectsTerraformStateVersions } from "./get-projects-terraform-state-versions";
import { ciTerraformListPackagesTerraformModulesV1Versions } from "./list-packages-terraform-modules-v1-versions";
import { ciTerraformUpdateProjectsPackagesTerraformModulesFile } from "./update-projects-packages-terraform-modules-file";
import { ciTerraformUpdateProjectsPackagesTerraformModulesFileAuthorize } from "./update-projects-packages-terraform-modules-file-authorize";

export const ciTerraformTools = [
  ciTerraformCreateProjectsTerraformState,
  ciTerraformCreateProjectsTerraformStateAuthorize,
  ciTerraformCreateProjectsTerraformStateLock,
  ciTerraformDeleteProjectsTerraformState,
  ciTerraformDeleteProjectsTerraformStateLock,
  ciTerraformDeleteProjectsTerraformStateVersions,
  ciTerraformGetPackagesTerraformModulesV1,
  ciTerraformGetPackagesTerraformModulesV1Download,
  ciTerraformGetPackagesTerraformModulesV1DownloadGet,
  ciTerraformGetPackagesTerraformModulesV1File,
  ciTerraformGetPackagesTerraformModulesV1Get,
  ciTerraformGetProjectsPackagesTerraformModules,
  ciTerraformGetProjectsPackagesTerraformModulesGet,
  ciTerraformGetProjectsTerraformState,
  ciTerraformGetProjectsTerraformStateVersions,
  ciTerraformListPackagesTerraformModulesV1Versions,
  ciTerraformUpdateProjectsPackagesTerraformModulesFile,
  ciTerraformUpdateProjectsPackagesTerraformModulesFileAuthorize,
];
