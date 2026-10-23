import { reposChecksTools } from "./checks";
import { reposCodeQualityTools } from "./code-quality";
import { reposGitTools } from "./git";
import { reposReposTools } from "./repos";

export const reposGroupTools = [...reposChecksTools, ...reposCodeQualityTools, ...reposGitTools, ...reposReposTools];
