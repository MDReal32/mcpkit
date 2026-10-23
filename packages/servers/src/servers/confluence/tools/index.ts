import { contentTools } from './content';
import { pageTools } from './page';
import { spaceTools } from './space';

export const confluenceTools = [...contentTools, ...pageTools, ...spaceTools];
