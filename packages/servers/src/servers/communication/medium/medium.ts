import { defineServer } from "@usemcpkit/core";
import { MEDIUM_BASE, MEDIUM_SOURCES } from "./const";

export const medium = defineServer({
  ...MEDIUM_BASE,
  name: "medium",
  description:
    "Medium's API (api.medium.com/v1), which Medium has archived and no longer supports: it needs an integration token you already have, since Medium stopped issuing new ones. Get the authenticated user (me:get), list their publications and a publication's contributors, publish posts as HTML or Markdown to the profile or a publication (as a draft, unlisted or public), and upload an image. The API cannot read, edit or delete posts. Tools are named after their endpoint, '<path>:<method>'. users/{authorId}/posts:post publishes under the token owner's name, so prefer publishStatus draft.",
  openapi: { sources: MEDIUM_SOURCES },
  tools: [],
});
