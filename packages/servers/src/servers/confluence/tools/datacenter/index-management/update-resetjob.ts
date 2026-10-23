import { defineTool } from "@usemcpkit/core";

export const datacenterIndexManagementUpdateResetjob = defineTool({
  name: "datacenter:index_management:update_resetjob",
  description:
    "[Data Center] Reset reindex job status. Resets the status of the current in-progress reindex job. This is useful when a reindex job has failed/stalled and needs to be cleared before starting a new reindex operation. This operation is only available to system administrators.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "PUT",
    path: "/rest/api/index/resetjob",
  },
});
