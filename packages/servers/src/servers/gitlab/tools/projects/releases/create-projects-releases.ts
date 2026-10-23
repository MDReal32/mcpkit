import { defineTool } from "@usemcpkit/core";

export const projectsReleasesCreateProjectsReleases = defineTool({
  name: "projects:releases:create_projects_releases",
  description:
    "Create a release. Creates a release. Developer level access to the project is required to create a release.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      tag_name: {
        type: "string",
        description: "Tag the release is created from.",
      },
      tag_message: {
        type: "string",
        description: "Message to use if creating a new annotated tag.",
      },
      name: {
        type: "string",
        description: "Name of the release.",
      },
      description: {
        type: "string",
        description: "Description of the release. You can use Markdown.",
      },
      ref: {
        type: "string",
        description:
          "If the tag named in `tag_name` doesn't exist, the release is created from this ref and tagged with `tag_name`. Can be a commit SHA, another tag name, or a branch name.",
      },
      assets: {
        type: "object",
        description: "Object that contains assets for the release.",
        properties: {
          links: {
            type: "array",
            description: "Array of links to include as release assets.",
            items: {
              type: "object",
            },
          },
        },
      },
      milestones: {
        type: "array",
        description:
          "Title of each milestone the release is associated with. GitLab Premium customers can specify group milestones. Cannot be combined with the `milestone_ids` parameter. Mutually exclusive with `milestone_ids`.",
        items: {
          type: "string",
        },
      },
      milestone_ids: {
        type: "string",
        description:
          "ID of each milestone the release is associated with. GitLab Premium customers can specify group milestones. Cannot be combined with the `milestones` parameter. Mutually exclusive with `milestones`.",
      },
      released_at: {
        type: "string",
        description:
          "Date and time for the release. Defaults to the current time. Only provide this field when creating an upcoming or historical release.",
      },
      legacy_catalog_publish: {
        type: "boolean",
        description:
          "If `true`, publishes the release to the CI catalog. This parameter is for internal use only and is planned for removal in a future release. If the `ci_release_cli_catalog_publish_option` feature flag is disabled, this parameter is ignored and the release publishes to the CI catalog as before.",
      },
    },
    required: ["id", "tag_name"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/releases",
    body: [
      "tag_name",
      "tag_message",
      "name",
      "description",
      "ref",
      "assets",
      "milestones",
      "milestone_ids",
      "released_at",
      "legacy_catalog_publish",
    ],
  },
});
