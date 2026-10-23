import { projectsProjectImportCreateImportBitbucket } from './create-import-bitbucket';
import { projectsProjectImportCreateImportBitbucketServer } from './create-import-bitbucket-server';
import { projectsProjectImportCreateImportGithub } from './create-import-github';
import { projectsProjectImportCreateImportGithubCancel } from './create-import-github-cancel';
import { projectsProjectImportCreateProjectsExport } from './create-projects-export';
import { projectsProjectImportCreateProjectsExportRelations } from './create-projects-export-relations';
import { projectsProjectImportCreateProjectsGithubWebhooks } from './create-projects-github-webhooks';
import { projectsProjectImportCreateProjectsImportAuthorize } from './create-projects-import-authorize';
import { projectsProjectImportCreateProjectsImportGit } from './create-projects-import-git';
import { projectsProjectImportCreateProjectsImportRelationAuthorize } from './create-projects-import-relation-authorize';
import { projectsProjectImportGetProjectsExport } from './get-projects-export';
import { projectsProjectImportGetProjectsExportDownload } from './get-projects-export-download';
import { projectsProjectImportGetProjectsExportRelationsDownload } from './get-projects-export-relations-download';
import { projectsProjectImportGetProjectsImport } from './get-projects-import';
import { projectsProjectImportGetProjectsRelationImports } from './get-projects-relation-imports';
import { projectsProjectImportListProjectsExportRelationsStatus } from './list-projects-export-relations-status';

export const projectsProjectImportTools = [
  projectsProjectImportCreateImportBitbucket,
  projectsProjectImportCreateImportBitbucketServer,
  projectsProjectImportCreateImportGithub,
  projectsProjectImportCreateImportGithubCancel,
  projectsProjectImportCreateProjectsExport,
  projectsProjectImportCreateProjectsExportRelations,
  projectsProjectImportCreateProjectsGithubWebhooks,
  projectsProjectImportCreateProjectsImportAuthorize,
  projectsProjectImportCreateProjectsImportGit,
  projectsProjectImportCreateProjectsImportRelationAuthorize,
  projectsProjectImportGetProjectsExport,
  projectsProjectImportGetProjectsExportDownload,
  projectsProjectImportGetProjectsExportRelationsDownload,
  projectsProjectImportGetProjectsImport,
  projectsProjectImportGetProjectsRelationImports,
  projectsProjectImportListProjectsExportRelationsStatus,
];
