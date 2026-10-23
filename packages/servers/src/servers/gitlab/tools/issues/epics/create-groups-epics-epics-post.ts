import { defineTool } from "@usemcpkit/core";

export const issuesEpicsCreateGroupsEpicsEpicsPost = defineTool({
  name: "issues:epics:create_groups_epics_epics_post",
  description:
    "Relate epics. Creates an association between two epics, designating one as the parent epic and the other as the child epic.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      epic_iid: {
        type: "integer",
        description: "Internal ID of the epic.",
      },
      child_epic_id: {
        type: "integer",
        description:
          "Global ID of the child epic. The internal ID can't be used because internal IDs can conflict with epics from other groups.",
      },
    },
    required: ["id", "epic_iid", "child_epic_id"],
  },
  request: {
    method: "POST",
    path: "/groups/{id}/(-/)epics/{epic_iid}/epics/{child_epic_id}",
  },
});
