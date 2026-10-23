import { projectsCommitsCreateProjectsRepositoryCommits } from "./create-projects-repository-commits";
import { projectsCommitsCreateProjectsRepositoryCommitsCherryPick } from "./create-projects-repository-commits-cherry-pick";
import { projectsCommitsCreateProjectsRepositoryCommitsComments } from "./create-projects-repository-commits-comments";
import { projectsCommitsCreateProjectsRepositoryCommitsRevert } from "./create-projects-repository-commits-revert";
import { projectsCommitsGetProjectsRepositoryCommits } from "./get-projects-repository-commits";
import { projectsCommitsGetProjectsRepositoryCommitsSequence } from "./get-projects-repository-commits-sequence";
import { projectsCommitsGetProjectsRepositoryCommitsSignature } from "./get-projects-repository-commits-signature";
import { projectsCommitsListProjectsRepositoryCommits } from "./list-projects-repository-commits";
import { projectsCommitsListProjectsRepositoryCommitsComments } from "./list-projects-repository-commits-comments";
import { projectsCommitsListProjectsRepositoryCommitsDiff } from "./list-projects-repository-commits-diff";
import { projectsCommitsListProjectsRepositoryCommitsMergeRequests } from "./list-projects-repository-commits-merge-requests";
import { projectsCommitsListProjectsRepositoryCommitsRefs } from "./list-projects-repository-commits-refs";

export const projectsCommitsTools = [
  projectsCommitsCreateProjectsRepositoryCommits,
  projectsCommitsCreateProjectsRepositoryCommitsCherryPick,
  projectsCommitsCreateProjectsRepositoryCommitsComments,
  projectsCommitsCreateProjectsRepositoryCommitsRevert,
  projectsCommitsGetProjectsRepositoryCommits,
  projectsCommitsGetProjectsRepositoryCommitsSequence,
  projectsCommitsGetProjectsRepositoryCommitsSignature,
  projectsCommitsListProjectsRepositoryCommits,
  projectsCommitsListProjectsRepositoryCommitsComments,
  projectsCommitsListProjectsRepositoryCommitsDiff,
  projectsCommitsListProjectsRepositoryCommitsMergeRequests,
  projectsCommitsListProjectsRepositoryCommitsRefs,
];
