import { confluence } from './confluence/confluence';
import { githubServers } from './github';
import { gitlab } from './gitlab/gitlab';
import { jira } from './jira/jira';

export const servers = [confluence, ...githubServers, gitlab, jira];
