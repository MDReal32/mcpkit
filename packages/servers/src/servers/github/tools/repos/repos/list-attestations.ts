import { defineTool } from "@usemcpkit/core";

export const reposReposListAttestations = defineTool({
  name: "repos:repos:list_attestations",
  description:
    "List attestations. List a collection of artifact attestations with a given subject digest that are associated with a repository.",
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
      subject_digest: {
        type: "string",
        description:
          "The parameter should be set to the attestation's subject's SHA256 digest, in the form `sha256:HEX_DIGEST`.",
      },
      per_page: {
        type: "integer",
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      before: {
        type: "string",
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for results before this cursor. For more information, see "Using pagination in the REST API."',
      },
      after: {
        type: "string",
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for results after this cursor. For more information, see "Using pagination in the REST API."',
      },
      predicate_type: {
        type: "string",
        description:
          "Optional filter for fetching attestations with a given predicate type. This option accepts `provenance`, `sbom`, `release`, or freeform text for custom predicate types.",
      },
    },
    required: ["owner", "repo", "subject_digest"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/attestations/{subject_digest}",
    query: ["per_page", "before", "after", "predicate_type"],
  },
});
