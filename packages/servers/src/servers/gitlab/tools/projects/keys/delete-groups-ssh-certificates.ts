import { defineTool } from "@usemcpkit/core";

export const projectsKeysDeleteGroupsSshCertificates = defineTool({
  name: "projects:keys:delete_groups_ssh_certificates",
  description: "Delete a group SSH certificate. Deletes a specified group SSH certificate.",
  input: {
    type: "object",
    properties: {
      ssh_certificates_id: {
        type: "integer",
        description: "ID of the group SSH certificate.",
      },
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
    },
    required: ["ssh_certificates_id", "id"],
  },
  request: {
    method: "DELETE",
    path: "/groups/{id}/ssh_certificates/{ssh_certificates_id}",
  },
});
