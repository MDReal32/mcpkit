import { defineTool } from "@usemcpkit/core";

export const cloudV1ContentSearchContentByCql = defineTool({
  name: "cloud_v1:content:search_content_by_cql",
  description:
    "[Cloud v1] Search content by CQL. Returns the list of content that matches a Confluence Query Language (CQL) query. For information on CQL, see: Advanced searching using CQL.",
  input: {
    type: "object",
    properties: {
      cql: {
        type: "string",
        description: "The CQL string that is used to find the requested content.",
      },
      cqlcontext: {
        type: "string",
        description:
          "The space, content, and content status to execute the search against. Specify this as an object with the following properties:",
      },
      expand: {
        type: "string",
        description: "A multi-value parameter indicating which properties of the content to expand. (comma-separated)",
      },
      cursor: {
        type: "string",
        description:
          "Pointer to a set of search results, returned as part of the `next` or `prev` URL from the previous search call.",
      },
      limit: {
        type: "integer",
        description:
          "The maximum number of content objects to return per page. Note, this may be restricted by fixed system limits.",
      },
    },
    required: ["cql"],
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/content/search",
    query: ["cql", "cqlcontext", "expand", "cursor", "limit"],
  },
});
