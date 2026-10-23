import { defineTool } from "@usemcpkit/core";

export const projectsKeysGetKeysGet = defineTool({
  name: "projects:keys:get_keys_get",
  description: "Retrieve user by SSH key fingerprint. Retrieves user by SSH key fingerprint. Administrators only.",
  input: {
    type: "object",
    properties: {
      fingerprint: {
        type: "string",
        description: "Fingerprint of an SSH key.",
      },
    },
    required: ["fingerprint"],
  },
  request: {
    method: "GET",
    path: "/keys",
    query: ["fingerprint"],
  },
});
