import { defineMediumServer } from "../../providers/medium";
import { mediumTools } from "./tools";

export const medium = defineMediumServer({
  name: "medium",
  description:
    "Medium's API (api.medium.com/v1), which Medium has archived and no longer supports: it needs an integration token you already have, since Medium stopped issuing new ones. Get the authenticated user (account:me:get_me), list their publications and a publication's contributors, publish posts as HTML or Markdown to the profile or a publication (as a draft, unlisted or public), and upload an image. The API cannot read, edit or delete posts. Tools are named '<group>:<resource>:<action>'. `posts:posts:create_*` publishes under the token owner's name, so prefer publishStatus draft.",
  tools: mediumTools,
});
