import { defineTool } from "@usemcpkit/core";

export const copilotCopilotSpacesCreateForOrg = defineTool({
  name: "copilot:copilot_spaces:create_for_org",
  description:
    "Create an organization Copilot Space. Creates a new Copilot Space owned by an organization. The authenticated user must have permissions to create spaces in the organization.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      name: {
        type: "string",
        description: "The name of the Copilot Space.",
      },
      description: {
        type: "string",
        description: "A description of the Copilot Space.",
      },
      general_instructions: {
        type: "string",
        description: "General instructions for the Copilot Space.",
      },
      base_role: {
        type: "string",
        description:
          "The base role that determines default permissions for organization members. - `no_access`: No default access (default) - `reader`: Organization members can read the space - `writer`: Organization members can read and edit the space - `admin`: Organization members have full admin access to the space",
        default: "no_access",
        enum: ["reader", "writer", "admin", "no_access"],
      },
      resources_attributes: {
        type: "array",
        description: "Resources to attach to the space.",
        items: {
          type: "object",
          properties: {
            resource_type: {
              type: "string",
              description: "The type of resource.",
              enum: [
                "repository",
                "github_file",
                "free_text",
                "github_issue",
                "github_pull_request",
                "media_content",
                "uploaded_text_file",
              ],
            },
            metadata: {
              type: "object",
              description: "Metadata specific to the resource type.",
            },
          },
        },
      },
    },
    required: ["org", "name"],
  },
  request: {
    method: "POST",
    path: "/orgs/{org}/copilot-spaces",
    body: ["name", "description", "general_instructions", "base_role", "resources_attributes"],
  },
});
