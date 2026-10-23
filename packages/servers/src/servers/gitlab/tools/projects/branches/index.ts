import { projectsBranchesCreateProjectsRepositoryBranches } from './create-projects-repository-branches';
import { projectsBranchesDeleteProjectsRepositoryBranches } from './delete-projects-repository-branches';
import { projectsBranchesDeleteProjectsRepositoryMergedBranches } from './delete-projects-repository-merged-branches';
import { projectsBranchesGetProjectsRepositoryBranches } from './get-projects-repository-branches';
import { projectsBranchesListProjectsRepositoryBranches } from './list-projects-repository-branches';
import { projectsBranchesUpdateProjectsRepositoryBranchesProtect } from './update-projects-repository-branches-protect';
import { projectsBranchesUpdateProjectsRepositoryBranchesUnprotect } from './update-projects-repository-branches-unprotect';

export const projectsBranchesTools = [
  projectsBranchesCreateProjectsRepositoryBranches,
  projectsBranchesDeleteProjectsRepositoryBranches,
  projectsBranchesDeleteProjectsRepositoryMergedBranches,
  projectsBranchesGetProjectsRepositoryBranches,
  projectsBranchesListProjectsRepositoryBranches,
  projectsBranchesUpdateProjectsRepositoryBranchesProtect,
  projectsBranchesUpdateProjectsRepositoryBranchesUnprotect,
];
