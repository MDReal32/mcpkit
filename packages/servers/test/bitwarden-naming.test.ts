import { nameUpstreamTool } from "@usemcpkit/core";
import { describe, expect, it } from "vitest";
import { bitwarden } from "../src/servers/bitwarden/bitwarden";

const UPSTREAM_TOOLS =
  "lock unlock sync status list get generate create_item create_folder edit_item edit_folder delete confirm create_org_collection edit_org_collection edit_item_collections move device_approval_list device_approval_approve device_approval_approve_all device_approval_deny device_approval_deny_all restore create_text_send create_file_send list_send get_send edit_send delete_send remove_send_password create_attachment list_org_collections get_org_collection update_org_collection delete_org_collection list_org_members get_org_member get_org_member_groups invite_org_member update_org_member update_org_member_groups remove_org_member reinvite_org_member revoke_org_member restore_org_member list_org_groups get_org_group get_org_group_members create_org_group update_org_group delete_org_group update_org_group_members list_org_policies get_org_policy update_org_policy get_org_events get_org_subscription update_org_subscription import_org_users_and_groups".split(
    " ",
  );
const MAX_NAME_LENGTH = 51;

const naming = bitwarden.upstream?.naming;

describe("bitwarden naming rules", () => {
  const names = UPSTREAM_TOOLS.map((tool) => nameUpstreamTool(naming, tool));

  it("name every tool of the server as <group>:<resource>:<action>", () => {
    expect(names.filter((name) => name === undefined)).toEqual([]);
  });

  it("never give two tools the same name", () => {
    expect(new Set(names).size).toBe(UPSTREAM_TOOLS.length);
  });

  it("keep every MCP tool name within the client's limit", () => {
    const tooLong = names.filter((name) => `security_bitwarden_${name?.replaceAll(":", "_")}`.length > MAX_NAME_LENGTH);

    expect(tooLong).toEqual([]);
  });

  it("file a few tools where their object says", () => {
    expect(nameUpstreamTool(naming, "create_org_group")).toBe("org:groups:create");
    expect(nameUpstreamTool(naming, "device_approval_approve_all")).toBe("device:approvals:approve_all");
    expect(nameUpstreamTool(naming, "edit_item_collections")).toBe("vault:items:edit_collections");
    expect(nameUpstreamTool(naming, "something_new")).toBeUndefined();
  });
});
