import { defineTool } from "@usemcpkit/core";

export const hierarchyListsGetList = defineTool({
  name: "hierarchy:lists:get_list",
  description: "Get List. View information about a List.",
  input: {
    type: "object",
    properties: {
      list_id: {
        type: "number",
        description:
          "The List ID. To find the List ID, right-click the List in your Sidebar, select Copy link, and paste the link in your URL. The last string in the URL is your List ID.",
      },
    },
    required: ["list_id"],
  },
  request: {
    method: "GET",
    path: "/v2/list/{list_id}",
  },
});
