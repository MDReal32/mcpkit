import { projectsRepositoriesCreateProjectsRepositoryBlobsBatch } from "./create-projects-repository-blobs-batch";
import { projectsRepositoriesCreateProjectsRepositoryChangelog } from "./create-projects-repository-changelog";
import { projectsRepositoriesGetProjectsRepositoryArchive } from "./get-projects-repository-archive";
import { projectsRepositoriesGetProjectsRepositoryBlobs } from "./get-projects-repository-blobs";
import { projectsRepositoriesGetProjectsRepositoryBlobsRaw } from "./get-projects-repository-blobs-raw";
import { projectsRepositoriesGetProjectsRepositoryChangelog } from "./get-projects-repository-changelog";
import { projectsRepositoriesGetProjectsRepositoryCompare } from "./get-projects-repository-compare";
import { projectsRepositoriesGetProjectsRepositoryContributors } from "./get-projects-repository-contributors";
import { projectsRepositoriesGetProjectsRepositoryDivergingCommits } from "./get-projects-repository-diverging-commits";
import { projectsRepositoriesGetProjectsRepositoryHealth } from "./get-projects-repository-health";
import { projectsRepositoriesGetProjectsRepositoryMergeBase } from "./get-projects-repository-merge-base";
import { projectsRepositoriesListProjectsRepositoryChangedPaths } from "./list-projects-repository-changed-paths";
import { projectsRepositoriesListProjectsRepositoryDiffStats } from "./list-projects-repository-diff-stats";
import { projectsRepositoriesListProjectsRepositoryTree } from "./list-projects-repository-tree";

export const projectsRepositoriesTools = [
  projectsRepositoriesCreateProjectsRepositoryBlobsBatch,
  projectsRepositoriesCreateProjectsRepositoryChangelog,
  projectsRepositoriesGetProjectsRepositoryArchive,
  projectsRepositoriesGetProjectsRepositoryBlobs,
  projectsRepositoriesGetProjectsRepositoryBlobsRaw,
  projectsRepositoriesGetProjectsRepositoryChangelog,
  projectsRepositoriesGetProjectsRepositoryCompare,
  projectsRepositoriesGetProjectsRepositoryContributors,
  projectsRepositoriesGetProjectsRepositoryDivergingCommits,
  projectsRepositoriesGetProjectsRepositoryHealth,
  projectsRepositoriesGetProjectsRepositoryMergeBase,
  projectsRepositoriesListProjectsRepositoryChangedPaths,
  projectsRepositoriesListProjectsRepositoryDiffStats,
  projectsRepositoriesListProjectsRepositoryTree,
];
