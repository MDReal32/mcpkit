import { issueTools } from './issue';
import { mergeRequestTools } from './merge-request';
import { pipelineTools } from './pipeline';
import { projectTools } from './project';
import { userTools } from './user';

export const gitlabTools = [...issueTools, ...mergeRequestTools, ...pipelineTools, ...projectTools, ...userTools];
