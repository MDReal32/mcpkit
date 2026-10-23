import { defineTool } from "@usemcpkit/core";

export const collaborationDashboardsGetAllAvailableDashboardGadgets = defineTool({
  name: "collaboration:dashboards:get_all_available_dashboard_gadgets",
  description: "Get available gadgets. Gets a list of all available gadgets that can be added to all dashboards.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/rest/api/2/dashboard/gadgets",
  },
});
