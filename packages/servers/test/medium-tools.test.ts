import { isValidManifest } from "@usemcpkit/core";
import { describe, expect, it } from "vitest";
import { medium } from "../src/servers/medium/medium";

describe("medium server", () => {
  it("is a valid manifest", () => {
    expect(isValidManifest(medium)).toBe(true);
  });

  it("names every tool as <group>:<resource>:<action>", () => {
    expect(medium.tools.map((tool) => tool.name)).toEqual([
      "account:me:get_me",
      "publications:contributors:list_publication_contributors",
      "publications:publications:list_user_publications",
      "posts:posts:create_post",
      "posts:posts:create_publication_post",
      "images:images:upload_image",
    ]);
  });

  it("sends the arguments of a post under the keys Medium's documentation names", () => {
    const createPost = medium.tools.find((tool) => tool.name === "posts:posts:create_post");

    expect(createPost?.request.path).toBe("/users/{authorId}/posts");
    expect(createPost?.request.body).toEqual([
      "title",
      "contentFormat",
      "content",
      "tags",
      "canonicalUrl",
      "publishStatus",
      "license",
      "notifyFollowers",
    ]);
  });

  it("uploads an image as multipart form data from a local file", () => {
    const upload = medium.tools.find((tool) => tool.name === "images:images:upload_image");

    expect(upload?.request).toMatchObject({ contentType: "multipart/form-data", fileArgs: ["image"] });
  });
});
