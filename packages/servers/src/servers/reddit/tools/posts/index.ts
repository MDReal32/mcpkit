import { postsCommentsTools } from "./comments";
import { postsPostsTools } from "./posts";

export const postsGroupTools = [...postsCommentsTools, ...postsPostsTools];
