import { defineTool } from "@usemcpkit/core";

export const workflowsIssuePrioritiesCreatePriority = defineTool({
  name: "workflows:issue_priorities:create_priority",
  description: "Create priority. Creates an issue priority.",
  input: {
    type: "object",
    properties: {
      avatarId: {
        type: "integer",
        description:
          "The ID for the avatar for the priority. Either the iconUrl or avatarId must be defined, but not both. This parameter is nullable and will become mandatory once the iconUrl parameter is deprecated.",
      },
      description: {
        type: "string",
        description: "The description of the priority.",
      },
      iconUrl: {
        type: "string",
        description:
          "The URL of an icon for the priority. Accepted protocols are HTTP and HTTPS. Built in icons can also be used. Either the iconUrl or avatarId must be defined, but not both.",
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
    required: ["name", "statusColor"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/priority",
    body: ["avatarId", "description", "iconUrl", "name", "statusColor"],
  },
});
