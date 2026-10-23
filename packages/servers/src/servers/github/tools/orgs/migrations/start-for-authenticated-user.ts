import { defineTool } from "@usemcpkit/core";

export const orgsMigrationsStartForAuthenticatedUser = defineTool({
  name: "orgs:migrations:start_for_authenticated_user",
  description: "Start a user migration. Initiates the generation of a user migration archive.",
  input: {
    type: "object",
    properties: {
      lock_repositories: {
        type: "boolean",
        description: "Lock the repositories being migrated at the start of the migration",
      },
      exclude_metadata: {
        type: "boolean",
        description:
          "Indicates whether metadata should be excluded and only git source should be included for the migration.",
      },
      exclude_git_data: {
        type: "boolean",
        description: "Indicates whether the repository git data should be excluded from the migration.",
      },
      exclude_attachments: {
        type: "boolean",
        description: "Do not include attachments in the migration",
      },
      exclude_releases: {
        type: "boolean",
        description: "Do not include releases in the migration",
      },
      exclude_owner_projects: {
        type: "boolean",
        description: "Indicates whether projects owned by the organization or users should be excluded.",
      },
      org_metadata_only: {
        type: "boolean",
        description:
          "Indicates whether this should only include organization metadata (repositories array should be empty and will ignore other flags).",
        default: false,
      },
      exclude: {
        type: "array",
        description: "Exclude attributes from the API response to improve performance",
        items: {
          type: "string",
          description: "Allowed values that can be passed to the exclude param.",
          enum: ["repositories"],
        },
      },
      repositories: {
        type: "array",
        items: {
          type: "string",
          description: "Repository path, owner and name",
        },
      },
    },
    required: ["repositories"],
  },
  request: {
    method: "POST",
    path: "/user/migrations",
    body: [
      "lock_repositories",
      "exclude_metadata",
      "exclude_git_data",
      "exclude_attachments",
      "exclude_releases",
      "exclude_owner_projects",
      "org_metadata_only",
      "exclude",
      "repositories",
    ],
  },
});
