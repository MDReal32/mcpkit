import { defineTool } from "@usemcpkit/core";

export const cloudV1ContentbodyBulkAsyncConvertContentBodyRequest = defineTool({
  name: "cloud_v1:contentbody:bulk_async_convert_content_body_request",
  description:
    "[Cloud v1] Create asynchronous content body conversion tasks in bulk. Asynchronously converts content bodies from one format to another format in bulk. Use the Content body REST API to get the status of conversion tasks. Note that there is a maximum limit of 10 conversions per request to this endpoint.",
  input: {
    type: "object",
    properties: {
      conversionInputs: {
        type: "array",
        items: {
          type: "object",
        },
      },
    },
  },
  request: {
    method: "POST",
    path: "/wiki/rest/api/contentbody/convert/async/bulk/tasks",
    body: ["conversionInputs"],
  },
});
