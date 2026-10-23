import { defineGithubServer } from '../../providers/github';

import { codesOfConductGetAllCodesOfConduct } from './tools/codes-of-conduct/get-all-codes-of-conduct';
import { codesOfConductGetConductCode } from './tools/codes-of-conduct/get-conduct-code';
import { emojisGet } from './tools/emojis/get';
import { gitignoreGetAllTemplates } from './tools/gitignore/get-all-templates';
import { gitignoreGetTemplate } from './tools/gitignore/get-template';
import { licensesGet } from './tools/licenses/get';
import { licensesGetAllCommonlyUsed } from './tools/licenses/get-all-commonly-used';
import { licensesGetForRepo } from './tools/licenses/get-for-repo';
import { markdownRender } from './tools/markdown/render';
import { metaGet } from './tools/meta/get';
import { metaGetAllVersions } from './tools/meta/get-all-versions';
import { metaGetOctocat } from './tools/meta/get-octocat';
import { metaGetZen } from './tools/meta/get-zen';
import { metaRoot } from './tools/meta/root';
import { rateLimitGet } from './tools/rate-limit/get';

export const githubMeta = defineGithubServer({
  name: 'github_meta',
  description: 'GitHub REST API: meta, rate limit, emojis, gitignore templates, licenses, markdown, codes of conduct.',
  tools: [
    codesOfConductGetAllCodesOfConduct,
    codesOfConductGetConductCode,
    emojisGet,
    gitignoreGetAllTemplates,
    gitignoreGetTemplate,
    licensesGet,
    licensesGetAllCommonlyUsed,
    licensesGetForRepo,
    markdownRender,
    metaGet,
    metaGetAllVersions,
    metaGetOctocat,
    metaGetZen,
    metaRoot,
    rateLimitGet,
  ],
});
