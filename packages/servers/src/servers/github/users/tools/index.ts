import { activityTools } from './activity';
import { gistsTools } from './gists';
import { searchTools } from './search';
import { usersTools } from './users';

export const githubUsersTools = [...activityTools, ...gistsTools, ...searchTools, ...usersTools];
