import { usersCommentsTools } from "./comments";
import { usersPostsTools } from "./posts";
import { usersUsersTools } from "./users";

export const usersGroupTools = [...usersCommentsTools, ...usersPostsTools, ...usersUsersTools];
