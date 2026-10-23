import { defineTool } from "@usemcpkit/core";

export const orgsOrgsListAttestationsBulk = defineTool({
  name: "orgs:orgs:list_attestations_bulk",
  description:
    "List attestations by bulk subject digests. List a collection of artifact attestations associated with any entry in a list of subject digests owned by an organization.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
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
      subject_digests: {
        type: "array",
        description: "List of subject digests to fetch attestations for.",
        items: {
          type: "string",
        },
      },
      predicate_type: {
        type: "string",
        description:
          "Optional filter for fetching attestations with a given predicate type. This option accepts `provenance`, `sbom`, `release`, or freeform text for custom predicate types.",
      },
    },
    required: ["org", "subject_digests"],
  },
  request: {
    method: "POST",
    path: "/orgs/{org}/attestations/bulk-list",
    query: ["per_page", "before", "after"],
    body: ["subject_digests", "predicate_type"],
  },
});
