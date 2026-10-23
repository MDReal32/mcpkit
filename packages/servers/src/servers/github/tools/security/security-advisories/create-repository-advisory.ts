import { defineTool } from "@usemcpkit/core";

export const securitySecurityAdvisoriesCreateRepositoryAdvisory = defineTool({
  name: "security:security_advisories:create_repository_advisory",
  description: "Create a repository security advisory. Creates a new repository security advisory.",
  input: {
    type: "object",
    properties: {
      owner: {
        type: "string",
        description: "The account owner of the repository. The name is not case sensitive.",
      },
      repo: {
        type: "string",
        description: "The name of the repository without the `.git` extension. The name is not case sensitive.",
      },
      summary: {
        type: "string",
        description: "A short summary of the advisory.",
      },
      description: {
        type: "string",
        description: "A detailed description of what the advisory impacts.",
      },
      cve_id: {
        type: "string",
        description: "The Common Vulnerabilities and Exposures (CVE) ID.",
      },
      vulnerabilities: {
        type: "array",
        description: "A product affected by the vulnerability detailed in a repository security advisory.",
        items: {
          type: "object",
          properties: {
            package: {
              type: "object",
              description: "The name of the package affected by the vulnerability.",
            },
            vulnerable_version_range: {
              type: "string",
              description: "The range of the package versions affected by the vulnerability.",
            },
            patched_versions: {
              type: "string",
              description: "The package version(s) that resolve the vulnerability.",
            },
            vulnerable_functions: {
              type: "array",
              description: "The functions in the package that are affected.",
              items: {
                type: "string",
              },
            },
          },
          required: ["package"],
        },
      },
      cwe_ids: {
        type: "array",
        description: "A list of Common Weakness Enumeration (CWE) IDs.",
        items: {
          type: "string",
        },
      },
      credits: {
        type: "array",
        description: "A list of users receiving credit for their participation in the security advisory.",
        items: {
          type: "object",
          properties: {
            login: {
              type: "string",
              description: "The username of the user credited.",
            },
            type: {
              type: "string",
              description: "The type of credit the user is receiving.",
              enum: [
                "analyst",
                "finder",
                "reporter",
                "coordinator",
                "remediation_developer",
                "remediation_reviewer",
                "remediation_verifier",
                "tool",
                "sponsor",
                "other",
              ],
            },
          },
          required: ["login", "type"],
        },
      },
      severity: {
        type: "string",
        description:
          "The severity of the advisory. You must choose between setting this field or `cvss_vector_string`.",
        enum: ["critical", "high", "medium", "low"],
      },
      cvss_vector_string: {
        type: "string",
        description:
          "The CVSS vector that calculates the severity of the advisory. You must choose between setting this field or `severity`.",
      },
      start_private_fork: {
        type: "boolean",
        description: "Whether to create a temporary private fork of the repository to collaborate on a fix.",
        default: false,
      },
    },
    required: ["owner", "repo", "summary", "description", "vulnerabilities"],
  },
  request: {
    method: "POST",
    path: "/repos/{owner}/{repo}/security-advisories",
    body: [
      "summary",
      "description",
      "cve_id",
      "vulnerabilities",
      "cwe_ids",
      "credits",
      "severity",
      "cvss_vector_string",
      "start_private_fork",
    ],
  },
});
