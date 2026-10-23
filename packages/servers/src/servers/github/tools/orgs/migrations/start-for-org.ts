import { defineTool } from "@usemcpkit/core";

export const orgsMigrationsStartForOrg = defineTool({
  name: "orgs:migrations:start_for_org",
  description: "Start an organization migration. Initiates the generation of a migration archive.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      repositories: {
        type: "array",
        description: "A list of arrays indicating which repositories should be migrated.",
        items: {
          type: "string",
        },
      },
      lock_repositories: {
        type: "boolean",
        description: "Indicates whether repositories should be locked (to prevent manipulation) while migrating data.",
        default: false,
      },
      exclude_metadata: {
        type: "boolean",
        description:
          "Indicates whether metadata should be excluded and only git source should be included for the migration.",
        default: false,
      },
      exclude_git_data: {
        type: "boolean",
        description: "Indicates whether the repository git data should be excluded from the migration.",
        default: false,
      },
      exclude_attachments: {
        type: "boolean",
        description:
          "Indicates whether attachments should be excluded from the migration (to reduce migration archive file size).",
        default: false,
      },
      exclude_releases: {
        type: "boolean",
        description:
          "Indicates whether releases should be excluded from the migration (to reduce migration archive file size).",
        default: false,
      },
      exclude_owner_projects: {
        type: "boolean",
        description:
          "Indicates whether projects owned by the organization or users should be excluded. from the migration.",
        default: false,
      },
      org_metadata_only: {
        type: "boolean",
        description:
          "Indicates whether this should only include organization metadata (repositories array should be empty and will ignore other flags).",
        default: false,
      },
      exclude: {
        type: "array",
        description:
          "Exclude related items from being returned in the response in order to improve performance of the request.",
        items: {
          type: "string",
          enum: ["repositories"],
        },
      },
    },
    required: ["org", "repositories"],
  },
  request: {
    method: "POST",
    path: "/orgs/{org}/migrations",
    body: [
      "repositories",
      "lock_repositories",
      "exclude_metadata",
      "exclude_git_data",
      "exclude_attachments",
      "exclude_releases",
      "exclude_owner_projects",
      "org_metadata_only",
      "exclude",
    ],
  },
});
