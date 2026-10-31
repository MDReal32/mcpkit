export const MEDIUM_POST_PROPERTIES = {
  title: {
    type: "string",
    description: "Post title for SEO and listings; titles over 100 characters are ignored and made from the content.",
  },
  content_format: {
    type: "string",
    enum: ["html", "markdown"],
    description: "Format of `content`.",
  },
  content: {
    type: "string",
    description: "The post body as an HTML fragment or Markdown. Medium side-loads images given by <img src>.",
  },
  tags: {
    type: "array",
    items: { type: "string" },
    description: "Tags for the post; only the first three are used and tags over 25 characters are ignored.",
  },
  canonical_url: {
    type: "string",
    description: "The original URL of the content, if it was published elsewhere first.",
  },
  publish_status: {
    type: "string",
    enum: ["public", "draft", "unlisted"],
    description: "Defaults to public, which publishes at once.",
  },
  license: {
    type: "string",
    enum: [
      "all-rights-reserved",
      "cc-40-by",
      "cc-40-by-sa",
      "cc-40-by-nd",
      "cc-40-by-nc",
      "cc-40-by-nc-nd",
      "cc-40-by-nc-sa",
      "cc-40-zero",
      "public-domain",
    ],
    description: "Defaults to all-rights-reserved.",
  },
  notify_followers: {
    type: "boolean",
    description: "Whether to notify the user's followers that the post was published.",
  },
} as const;

export const MEDIUM_POST_BODY = {
  title: "title",
  contentFormat: "content_format",
  content: "content",
  tags: "tags",
  canonicalUrl: "canonical_url",
  publishStatus: "publish_status",
  license: "license",
  notifyFollowers: "notify_followers",
};

export const MEDIUM_POST_RESPONSE = {
  root: "data",
  fields: ["id", "title", "authorId", "tags", "url", "canonicalUrl", "publishStatus", "publishedAt", "license"],
};
