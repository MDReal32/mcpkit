import { defineGithubServer } from '../../../providers/github';
import { githubMetaTools } from './tools';

export const githubMeta = defineGithubServer({
  name: 'github_meta',
  description: 'GitHub REST API: meta, rate limit, emojis, gitignore templates, licenses, markdown, codes of conduct.',
  tools: githubMetaTools,
});
