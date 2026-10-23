import { defineTool } from "@usemcpkit/core";

export const appsAppsListInstallations = defineTool({
  name: "apps:apps:list_installations",
  description:
    "List installations for the authenticated app. The permissions the installation has are included under the `permissions` key.",
  input: {
    type: "object",
    properties: {
      per_page: {
        type: "integer",
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: "integer",
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
      since: {
        type: "string",
        description:
          "Only show results that were last updated after the given time. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.",
      },
      outdated: {
        type: "string",
      },
    },
  },
  request: {
    method: "GET",
    path: "/app/installations",
    query: ["per_page", "page", "since", "outdated"],
  },
});
