import { defineTool } from "@usemcpkit/core";

export const workflowsIssuePrioritiesUpdatePriority = defineTool({
  name: "workflows:issue_priorities:update_priority",
  description: "Update priority. Updates an issue priority.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the issue priority.",
      },
      avatarId: {
        type: "integer",
        description:
          "The ID for the avatar for the priority. This parameter is nullable and both iconUrl and avatarId cannot be defined.",
      },
      description: {
        type: "string",
        description: "The description of the priority.",
      },
      iconUrl: {
        type: "string",
        description:
          "The URL of an icon for the priority. Accepted protocols are HTTP and HTTPS. Built in icons can also be used. Both iconUrl and avatarId cannot be defined.",
        enum: [
          "/images/icons/priorities/blocker.png",
          "/images/icons/priorities/critical.png",
          "/images/icons/priorities/high.png",
          "/images/icons/priorities/highest.png",
          "/images/icons/priorities/low.png",
          "/images/icons/priorities/lowest.png",
          "/images/icons/priorities/major.png",
          "/images/icons/priorities/medium.png",
          "/images/icons/priorities/minor.png",
          "/images/icons/priorities/trivial.png",
          "/images/icons/priorities/blocker_new.png",
          "/images/icons/priorities/critical_new.png",
          "/images/icons/priorities/high_new.png",
          "/images/icons/priorities/highest_new.png",
          "/images/icons/priorities/low_new.png",
          "/images/icons/priorities/lowest_new.png",
          "/images/icons/priorities/major_new.png",
          "/images/icons/priorities/medium_new.png",
          "/images/icons/priorities/minor_new.png",
          "/images/icons/priorities/trivial_new.png",
        ],
      },
      name: {
        type: "string",
        description: "The name of the priority. Must be unique.",
      },
      statusColor: {
        type: "string",
        description: "The status color of the priority in 3-digit or 6-digit hexadecimal format.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/priority/{id}",
    body: ["avatarId", "description", "iconUrl", "name", "statusColor"],
  },
});
