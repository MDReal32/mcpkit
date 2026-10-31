import { defineTool } from "@usemcpkit/core";
import { MEDIUM_POST_BODY, MEDIUM_POST_PROPERTIES, MEDIUM_POST_RESPONSE } from "../const";

export const postsPostsCreatePublicationPost = defineTool({
  name: "posts:posts:create_publication_post",
  description:
    "Publish a post under a publication the user is an editor or writer of. A writer's post may wait for an editor. Use publish_status draft to keep it private.",
  input: {
    type: "object",
    properties: {
      publication_id: {
        type: "string",
        description: "Publication id (from publications:publications:list_user_publications).",
      },
      ...MEDIUM_POST_PROPERTIES,
    },
    required: ["publication_id", "title", "content_format", "content"],
  },
  request: {
    method: "POST",
    path: "/publications/{publication_id}/posts",
    body: MEDIUM_POST_BODY,
  },
  response: MEDIUM_POST_RESPONSE,
});
