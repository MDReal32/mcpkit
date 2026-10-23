import { defineTool } from "@usemcpkit/core";

export const administrationAnnouncementBannerGetBanner = defineTool({
  name: "administration:announcement_banner:get_banner",
  description: "Get announcement banner configuration. Returns the current announcement banner configuration.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/rest/api/2/announcementBanner",
  },
});
