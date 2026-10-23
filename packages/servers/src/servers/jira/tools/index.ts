import { commentTools } from './comment';
import { issueTools } from './issue';
import { projectTools } from './project';
import { transitionTools } from './transition';
import { userTools } from './user';

export const jiraTools = [...commentTools, ...issueTools, ...projectTools, ...transitionTools, ...userTools];
