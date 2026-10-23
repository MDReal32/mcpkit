import { ciSecureFilesDeleteProjectsSecureFiles } from './delete-projects-secure-files';
import { ciSecureFilesGetProjectsSecureFiles } from './get-projects-secure-files';
import { ciSecureFilesGetProjectsSecureFilesDownload } from './get-projects-secure-files-download';
import { ciSecureFilesListProjectsSecureFiles } from './list-projects-secure-files';

export const ciSecureFilesTools = [
  ciSecureFilesDeleteProjectsSecureFiles,
  ciSecureFilesGetProjectsSecureFiles,
  ciSecureFilesGetProjectsSecureFilesDownload,
  ciSecureFilesListProjectsSecureFiles,
];
