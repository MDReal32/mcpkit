import { defineTool } from "@usemcpkit/core";

export const reposReposCreateRelease = defineTool({
  name: "repos:repos:create_release",
  description: "Create a release. Users with push access to the repository can create a release.",
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
        description: "`true` to create a draft (unpublished) release, `false` to create a published one.",
        default: false,
      },
      prerelease: {
        type: "boolean",
        description:
          "`true` to identify the release as a prerelease. `false` to identify the release as a full release.",
        default: false,
      },
      discussion_category_name: {
        type: "string",
        description:
          'If specified, a discussion of the specified category is created and linked to the release. The value must be a category that already exists in the repository. For more information, see "Managing categories for discussions in your repository."',
      },
      generate_release_notes: {
        type: "boolean",
        description:
          "Whether to automatically generate the name and body for this release. If `name` is specified, the specified name will be used; otherwise, a name will be automatically generated. If `body` is specified, the body will be pre-pended to the automatically generated notes.",
        default: false,
      },
      make_latest: {
        type: "string",
        description:
          "Specifies whether this release should be set as the latest release for the repository. Drafts and prereleases cannot be set as latest. Defaults to `true` for newly published releases. `legacy` specifies that the latest release should be determined based on the release creation date and higher semantic version.",
        default: "true",
        enum: ["true", "false", "legacy"],
      },
    },
    required: ["owner", "repo", "tag_name"],
  },
  request: {
    method: "POST",
    path: "/repos/{owner}/{repo}/releases",
    body: [
      "tag_name",
      "target_commitish",
      "name",
      "body",
      "draft",
      "prerelease",
      "discussion_category_name",
      "generate_release_notes",
      "make_latest",
    ],
  },
});
