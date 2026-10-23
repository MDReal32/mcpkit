import { defineTool } from "@usemcpkit/core";

export const aiCodeSuggestionsCreateCodeSuggestionsDirectAccess = defineTool({
  name: "ai:code_suggestions:create_code_suggestions_direct_access",
  description:
    "Retrieve direct connection details for the AI Gateway. Retrieves user-specific connection details which can be used by IDEs or clients to send `completion` requests to Code Suggestions directly through the AI Gateway.",
  input: {
    type: "object",
    properties: {
      project_path: {
        type: "string",
        description: "Path of the project.",
      },
    },
  },
  request: {
    method: "POST",
    path: "/code_suggestions/direct_access",
    body: ["project_path"],
  },
});
