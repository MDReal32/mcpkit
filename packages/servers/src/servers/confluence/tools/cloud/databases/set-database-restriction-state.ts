import { defineTool } from "@usemcpkit/core";

export const cloudDatabasesSetDatabaseRestrictionState = defineTool({
  name: "cloud:databases:set_database_restriction_state",
  description: "[Cloud] Set database restriction state. Sets the restriction state of a database.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the database.",
      },
      allow_self_lockout: {
        type: "boolean",
        description:
          "If `false` (default), the request is rejected when it would remove the calling user's own edit access. Set to `true` to allow the operation even when it locks out the caller.",
      },
      state: {
        type: "string",
        description:
          "The direct restriction state of a content item. Inherited restrictions are not represented by this REST enum. - `OPEN` – No direct restrictions. Effective access may still be restricted by a parent. - `EDIT_RESTRICTED` – Direct viewing is open but editing is restricted to explicitly granted users/groups. - `VIEW_RESTRICTED` – Direct viewing and editing are restricted to explicitly granted users/g…",
        enum: ["OPEN", "EDIT_RESTRICTED", "VIEW_RESTRICTED"],
      },
    },
    required: ["id", "state"],
  },
  request: {
    method: "PUT",
    path: "/wiki/api/v2/databases/{id}/restriction-state",
    query: {
      "allow-self-lockout": "allow_self_lockout",
    },
    body: ["state"],
  },
});
