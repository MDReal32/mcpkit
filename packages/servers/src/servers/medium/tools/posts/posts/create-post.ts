import { defineTool } from "@usemcpkit/core";
import { MEDIUM_POST_BODY, MEDIUM_POST_PROPERTIES, MEDIUM_POST_RESPONSE } from "../const";

export const postsPostsCreatePost = defineTool({
  name: "posts:posts:create_post",
  description:
    "Publish a post on the authenticated user's own profile. It goes out under their name; use publish_status draft to keep it private. The title field is used for SEO and listings only: put the title in the content as well for it to show on the page.",
  input: {
    type: "object",
    properties: {
      author_id: {
        type: "string",
        description: "Id of the authenticated user (from account:me:get_me).",
      },
      ...MEDIUM_POST_PROPERTIES,
    },
    required: ["author_id", "title", "content_format", "content"],
  },
  request: {
    method: "POST",
    path: "/users/{author_id}/posts",
    body: MEDIUM_POST_BODY,
  },
  response: MEDIUM_POST_RESPONSE,
});
