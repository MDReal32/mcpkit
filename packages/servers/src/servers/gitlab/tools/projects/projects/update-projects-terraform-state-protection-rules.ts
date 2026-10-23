import { defineTool } from "@usemcpkit/core";

export const projectsProjectsUpdateProjectsTerraformStateProtectionRules = defineTool({
  name: "projects:projects:update_projects_terraform_state_protection_rules",
  description: "Update a Terraform state protection rule for a project. This feature was introduced in GitLab 19.0.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      terraform_state_protection_rule_id: {
        type: "integer",
        description: "ID of the Terraform state protection rule.",
      },
      state_name: {
        type: "string",
        description: "Terraform state name to protect.",
      },
      minimum_access_level_for_write: {
        type: "string",
        description: "Minimum GitLab access level required to write to the Terraform state.",
        enum: ["developer", "maintainer", "owner", "admin"],
      },
      allowed_from: {
        type: "string",
        description: "Restricts write requests to a specific source.",
        enum: ["anywhere", "ci_only", "ci_on_protected_branch_only"],
      },
    },
    required: ["id", "terraform_state_protection_rule_id"],
  },
  request: {
    method: "PATCH",
    path: "/projects/{id}/terraform/state_protection_rules/{terraform_state_protection_rule_id}",
    body: ["state_name", "minimum_access_level_for_write", "allowed_from"],
  },
});
