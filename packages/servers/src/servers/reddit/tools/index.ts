import { accountGroupTools } from "./account";
import { postsGroupTools } from "./posts";
import { subredditsGroupTools } from "./subreddits";
import { usersGroupTools } from "./users";

export const redditTools = [...postsGroupTools, ...subredditsGroupTools, ...usersGroupTools, ...accountGroupTools];
