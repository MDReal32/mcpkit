import { defineTool } from "@usemcpkit/core";

export const projectsKeysCreateUserGpgKeys = defineTool({
  name: "projects:keys:create_user_gpg_keys",
  description: "Add a GPG key. Adds a GPG key for the currently authenticated user.",
  input: {
    type: "object",
    properties: {
      key: {
        type: "string",
        description: "Public key value of the GPG key.",
      },
    },
    required: ["key"],
  },
  request: {
    method: "POST",
    path: "/user/gpg_keys",
    body: ["key"],
  },
});
