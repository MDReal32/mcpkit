import { defineTool } from "@usemcpkit/core";

export const cloudPagesGetPageVersionDetails = defineTool({
  name: "cloud:pages:get_page_version_details",
  description:
    "[Cloud] Get version details for page version. Retrieves version details for the specified page and version number.",
  input: {
    type: "object",
    properties: {
      page_id: {
        type: "integer",
        description: "The ID of the page for which version details should be returned.",
      },
      version_number: {
        type: "integer",
        description: "The version number of the page to be returned.",
      },
    },
    required: ["page_id", "version_number"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/pages/{page_id}/versions/{version_number}",
  },
});
