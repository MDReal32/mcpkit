import { defineTool } from "@usemcpkit/core";

export const projectsReleasesUpdateProjectsReleases = defineTool({
  name: "projects:releases:update_projects_releases",
  description:
    "Update a release. Updates a release. Developer level access to the project is required to update a release.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      tag_name: {
        type: "string",
        description: "Git tag the release is associated with.",
      },
      name: {
        type: "string",
        description: "Name of the release.",
      },
      description: {
        type: "string",
        description: "Description of the release. You can use Markdown.",
      },
      released_at: {
        type: "string",
        description: "Date when the release is or was ready.",
      },
      milestones: {
        type: "array",
        description:
          "Title of each milestone to associate with the release. GitLab Premium customers can specify group milestones. Cannot be combined with the `milestone_ids` parameter. To remove all milestones from the release, specify `[]`. Mutually exclusive with `milestone_ids`.",
        items: {
          type: "string",
        },
      },
      milestone_ids: {
        type: "string",
        description:
          "ID of each milestone the release is associated with. GitLab Premium customers can specify group milestones. Cannot be combined with the `milestones` parameter. To remove all milestones from the release, specify `[]`. Mutually exclusive with `milestones`.",
      },
    },
    required: ["id", "tag_name"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/releases/{tag_name}",
    body: ["name", "description", "released_at", "milestones", "milestone_ids"],
  },
});
