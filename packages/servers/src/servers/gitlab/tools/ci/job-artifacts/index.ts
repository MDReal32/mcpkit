import { ciJobArtifactsCreateProjectsJobsArtifactsKeep } from './create-projects-jobs-artifacts-keep';
import { ciJobArtifactsDeleteProjectsArtifacts } from './delete-projects-artifacts';
import { ciJobArtifactsDeleteProjectsJobsArtifacts } from './delete-projects-jobs-artifacts';
import { ciJobArtifactsGetProjectsJobsArtifacts } from './get-projects-jobs-artifacts';
import { ciJobArtifactsGetProjectsJobsArtifactsDownload } from './get-projects-jobs-artifacts-download';
import { ciJobArtifactsGetProjectsJobsArtifactsGet } from './get-projects-jobs-artifacts-get';
import { ciJobArtifactsGetProjectsJobsArtifactsRaw } from './get-projects-jobs-artifacts-raw';
import { ciJobArtifactsListProjectsJobsArtifactsTree } from './list-projects-jobs-artifacts-tree';

export const ciJobArtifactsTools = [
  ciJobArtifactsCreateProjectsJobsArtifactsKeep,
  ciJobArtifactsDeleteProjectsArtifacts,
  ciJobArtifactsDeleteProjectsJobsArtifacts,
  ciJobArtifactsGetProjectsJobsArtifacts,
  ciJobArtifactsGetProjectsJobsArtifactsDownload,
  ciJobArtifactsGetProjectsJobsArtifactsGet,
  ciJobArtifactsGetProjectsJobsArtifactsRaw,
  ciJobArtifactsListProjectsJobsArtifactsTree,
];
