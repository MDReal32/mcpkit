import { checksTools } from './checks';
import { codeQualityTools } from './code-quality';
import { gitTools } from './git';
import { reposTools } from './repos';

export const githubReposTools = [...checksTools, ...codeQualityTools, ...gitTools, ...reposTools];
