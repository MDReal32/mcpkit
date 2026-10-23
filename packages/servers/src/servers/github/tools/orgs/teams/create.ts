import { defineTool } from "@usemcpkit/core";

export const orgsTeamsCreate = defineTool({
  name: "orgs:teams:create",
  description:
    'Create a team. To create a team, the authenticated user must be a member or owner of `{org}`. By default, organization members can create teams. Organization owners can limit team creation to organization owners. For more information, see "Setting team creation permissions."',
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      name: {
        type: "string",
        description: "The name of the team.",
      },
      description: {
        type: "string",
        description: "The description of the team.",
      },
      maintainers: {
        type: "array",
        description: "List GitHub usernames for organization members who will become team maintainers.",
        items: {
          type: "string",
        },
      },
      repo_names: {
        type: "array",
        description: 'The full name (e.g., "organization-name/repository-name") of repositories to add the team to.',
        items: {
          type: "string",
        },
      },
      privacy: {
        type: "string",
        description:
          "The level of privacy this team should have. The options are: **For a non-nested team:** * `secret` - only visible to organization owners and members of this team. * `closed` - visible to all members of this organization. Default: `secret` **For a parent or child team:** * `closed` - visible to all members of this organization. Default for child team: `closed`",
        enum: ["secret", "closed"],
      },
      notification_setting: {
        type: "string",
        description:
          "The notification setting the team has chosen. The options are: * `notifications_enabled` - team members receive notifications when the team is @mentioned. * `notifications_disabled` - no one receives notifications. Default: `notifications_enabled`",
        enum: ["notifications_enabled", "notifications_disabled"],
      },
      permission: {
        type: "string",
        description:
          "**Closing down notice**. The permission that new repositories will be added to the team with when none is specified.",
        default: "pull",
        enum: ["pull", "push"],
      },
      parent_team_id: {
        type: "integer",
        description: "The ID of a team to set as the parent team.",
      },
      parent_team_slug: {
        type: "string",
        description: "The slug of a team to set as the parent team. Ignored when `parent_team_id` is also provided.",
      },
    },
    required: ["org", "name"],
  },
  request: {
    method: "POST",
    path: "/orgs/{org}/teams",
    body: [
      "name",
      "description",
      "maintainers",
      "repo_names",
      "privacy",
      "notification_setting",
      "permission",
      "parent_team_id",
      "parent_team_slug",
    ],
  },
});
