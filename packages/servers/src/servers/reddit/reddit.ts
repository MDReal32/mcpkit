import { defineRedditServer } from "../../providers/reddit";
import { redditTools } from "./tools";

export const reddit = defineRedditServer({
  name: "reddit",
  description:
    "Reddit's OAuth API (read-only): a subreddit's posts, a post with its comment tree, search for posts and subreddits, subreddit info and rules, user profiles and their posts and comments. Tools are named '<group>:<resource>:<action>'. Posts and comments are identified by fullnames (t3_<id>, t1_<id>); listings page with `after` set to the last item's `name`.",
  tools: redditTools,
});
