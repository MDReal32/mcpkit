import type { DomainSource } from "@usemcpkit/core";
import { describe, expect, it } from "vitest";
import { compareVersions } from "../src/form/compare-versions";
import { findHostSource } from "../src/form/find-host-source";
import { isOptionOffered } from "../src/form/is-option-offered";

const cloud: DomainSource = { name: "cloud", label: "Cloud", hosts: [".atlassian.net"], versioned: false };

const datacenter: DomainSource = { name: "datacenter", label: "Data Center", versioned: true };

describe("findHostSource", () => {
  it("picks the first source whose hosts match, and the catch-all otherwise", () => {
    expect(findHostSource([cloud, datacenter], "acme.atlassian.net")).toBe(cloud);
    expect(findHostSource([cloud, datacenter], "ACME.Atlassian.net/wiki")).toBe(cloud);
    expect(findHostSource([cloud, datacenter], "jira.acme.com:8443")).toBe(datacenter);
  });

  it("finds nothing for a host that is not valid yet", () => {
    expect(findHostSource([cloud, datacenter], "")).toBeUndefined();
    expect(findHostSource([cloud, datacenter], "https://jira.acme.com")).toBeUndefined();
  });
});

describe("isOptionOffered", () => {
  const pat = { sources: ["datacenter"], from: "8.14" };

  it("narrows by source first and by version once it is known", () => {
    expect(isOptionOffered(undefined, "cloud", "1")).toBe(true);
    expect(isOptionOffered(pat, undefined, undefined)).toBe(true);
    expect(isOptionOffered(pat, "cloud", undefined)).toBe(false);
    expect(isOptionOffered(pat, "datacenter", undefined)).toBe(true);
    expect(isOptionOffered(pat, "datacenter", "8.13.9")).toBe(false);
    expect(isOptionOffered(pat, "datacenter", "10.3")).toBe(true);
    expect(isOptionOffered({ below: "9" }, "datacenter", "9.0")).toBe(false);
  });
});

describe("compareVersions", () => {
  it("compares the numbers of each part", () => {
    expect(compareVersions("3.9", "3.14")).toBe(-1);
    expect(compareVersions("10.3.27-ee", "10.3")).toBe(1);
    expect(compareVersions("10.3", "10.3.0")).toBe(0);
  });
});
