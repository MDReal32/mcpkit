import { defineTool } from "@usemcpkit/core";

export const groupsOrganizationsCreateOrganizations = defineTool({
  name: "groups:organizations:create_organizations",
  description:
    "Create an organization. Creates an organization. This feature was introduced in GitLab 17.5. This feature is behind the `allow_organization_creation` feature flag. In GitLab 18.3, the feature flag changed to `organization_switching`. In GitLab 19.4, the feature flag changed to `org_stage_experimental`.",
  input: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "The name of the organization",
      },
      path: {
        type: "string",
        description: "The path of the organization",
      },
      description: {
        type: "string",
        description: "The description of the organization",
      },
      visibility: {
        type: "string",
        description: "The visibility level of the organization",
        enum: ["private", "public"],
      },
      avatar: {
        type: "string",
        description: "Path of a local file to upload.",
      },
    },
    required: ["name", "path"],
  },
  request: {
    method: "POST",
    path: "/organizations",
    body: ["name", "path", "description", "visibility", "avatar"],
    contentType: "multipart/form-data",
    fileArgs: ["avatar"],
  },
});
