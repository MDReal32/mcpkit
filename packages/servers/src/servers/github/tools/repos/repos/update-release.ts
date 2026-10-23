import { defineTool } from "@usemcpkit/core";

export const reposReposUpdateRelease = defineTool({
  name: "repos:repos:update_release",
  description: "Update a release. Users with push access to the repository can edit a release.",
  input: {
    type: "object",
    properties: {
      owner: {
        type: "string",
        description: "The account owner of the repository. The name is not case sensitive.",
      },
      repo: {
        type: "string",
        description: "The name of the repository without the `.git` extension. The name is not case sensitive.",
      },
      release_id: {
        type: "integer",
        description: "The unique identifier of the release.",
      },
      tag_name: {
        type: "string",
        description: "The name of the tag.",
      },
      target_commitish: {
        type: "string",
        description:
          "Specifies the commitish value that determines where the Git tag is created from. Can be any branch or commit SHA. Unused if the Git tag already exists. Default: the repository's default branch.",
      },
      name: {
        type: "string",
        description: "The name of the release.",
      },
      body: {
        type: "string",
        description: "Text describing the contents of the tag.",
      },
      draft: {
        type: "boolean",
        description: "`true` makes the release a draft, and `false` publishes the release.",
      },
      prerelease: {
        type: "boolean",
        description:
          "`true` to identify the release as a prerelease, `false` to identify the release as a full release.",
      },
      make_latest: {
        type: "string",
        description:
          "Specifies whether this release should be set as the latest release for the repository. Drafts and prereleases cannot be set as latest. Defaults to `true` for newly published releases. `legacy` specifies that the latest release should be determined based on the release creation date and higher semantic version.",
        default: "true",
        enum: ["true", "false", "legacy"],
      },
      discussion_category_name: {
        type: "string",
        description:
          'If specified, a discussion of the specified category is created and linked to the release. The value must be a category that already exists in the repository. If there is already a discussion linked to the release, this parameter is ignored. For more information, see "Managing categories for discussions in your repository."',
      },
    },
    required: ["owner", "repo", "release_id"],
  },
  request: {
    method: "PATCH",
    path: "/repos/{owner}/{repo}/releases/{release_id}",
    body: [
      "tag_name",
      "target_commitish",
      "name",
      "body",
      "draft",
      "prerelease",
      "make_latest",
      "discussion_category_name",
    ],
  },
});
