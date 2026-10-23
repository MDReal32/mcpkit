import { projectsTemplatesGetTemplatesDockerfiles } from './get-templates-dockerfiles';
import { projectsTemplatesGetTemplatesGitignores } from './get-templates-gitignores';
import { projectsTemplatesGetTemplatesGitlabCiYmls } from './get-templates-gitlab-ci-ymls';
import { projectsTemplatesGetTemplatesLicenses } from './get-templates-licenses';
import { projectsTemplatesListTemplatesDockerfiles } from './list-templates-dockerfiles';
import { projectsTemplatesListTemplatesGitignores } from './list-templates-gitignores';
import { projectsTemplatesListTemplatesGitlabCiYmls } from './list-templates-gitlab-ci-ymls';
import { projectsTemplatesListTemplatesLicenses } from './list-templates-licenses';

export const projectsTemplatesTools = [
  projectsTemplatesGetTemplatesDockerfiles,
  projectsTemplatesGetTemplatesGitignores,
  projectsTemplatesGetTemplatesGitlabCiYmls,
  projectsTemplatesGetTemplatesLicenses,
  projectsTemplatesListTemplatesDockerfiles,
  projectsTemplatesListTemplatesGitignores,
  projectsTemplatesListTemplatesGitlabCiYmls,
  projectsTemplatesListTemplatesLicenses,
];
