import { defineServer } from "@usemcpkit/core";
import { REDDIT_BASE, REDDIT_SOURCES } from "./const";

export const reddit = defineServer({
  ...REDDIT_BASE,
  name: "reddit",
  description:
    "Reddit's OAuth API (read-only): a subreddit's posts, a post with its comment tree, search for posts and subreddits, subreddit info and rules, user profiles and their posts and comments. Tools are named after their endpoint, '<path>:<method>' (r/{subreddit}/{sort}:get). Posts and comments are identified by fullnames (t3_<id>, t1_<id>); listings page with `after` set to the last item's `name`.",
  openapi: { sources: REDDIT_SOURCES },
  tools: [],
});
