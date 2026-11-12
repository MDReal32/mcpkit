import { isValidManifest } from "@usemcpkit/native";
import { describe, expect, it } from "vitest";
import { jira } from "../src/servers/jira/jira";

describe("jira attachment download", () => {
  const download = jira.tools?.find((tool) => tool.name === "issues:issue_attachments:get_attachment_content");
  const thumbnail = jira.tools?.find((tool) => tool.name === "issues:issue_attachments:get_attachment_thumbnail");

  it("is a valid manifest", () => {
    expect(isValidManifest(jira)).toBe(true);
  });

  it("downloads from the Data Center servlet by default and from the REST endpoint on Cloud", () => {
    expect(download?.request).toEqual({
      method: "GET",
      path: "/secure/attachment/{id}/{filename}",
      saveToArg: "save_to",
    });
    expect(download?.editions?.cloud?.request).toEqual({
      method: "GET",
      path: "/rest/api/2/attachment/content/{id}",
      query: ["redirect"],
      saveToArg: "save_to",
    });
  });

  it("asks for the file name Data Center needs without requiring it on Cloud", () => {
    expect(Object.keys(download?.input.properties ?? {})).toEqual(["id", "redirect", "save_to", "filename"]);
    expect(download?.input.required).toEqual(["id", "save_to"]);
  });

  it("fetches the thumbnail from the Data Center servlet by default and from the REST endpoint on Cloud", () => {
    expect(thumbnail?.request).toEqual({
      method: "GET",
      path: "/secure/thumbnail/{id}/_thumb_{id}.png",
      saveToArg: "save_to",
    });
    expect(thumbnail?.editions?.cloud?.request).toEqual({
      method: "GET",
      path: "/rest/api/2/attachment/thumbnail/{id}",
      query: ["redirect", "fallbackToDefault", "width", "height"],
      saveToArg: "save_to",
    });
    expect(thumbnail?.input.required).toEqual(["id", "save_to"]);
  });
});
