import { defineTool } from "@usemcpkit/core";

export const usersUsersDeleteAttestationsById = defineTool({
  name: "users:users:delete_attestations_by_id",
  description:
    "Delete attestations by ID. Delete an artifact attestation by unique ID that is associated with a repository owned by a user.",
  input: {
    type: "object",
    properties: {
      username: {
        type: "string",
        description: "The handle for the GitHub user account.",
      },
      attestation_id: {
        type: "integer",
        description: "Attestation ID",
      },
    },
    required: ["username", "attestation_id"],
  },
  request: {
    method: "DELETE",
    path: "/users/{username}/attestations/{attestation_id}",
  },
});
