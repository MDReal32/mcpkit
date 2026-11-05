import { defineTool } from "@usemcpkit/core";

export const webhooksWebhooksGetWebhooks = defineTool({
  name: "webhooks:webhooks:get_webhooks",
  description:
    "Get webhooks by context or plan. Returns a list of webhooks corresponding to the context or plan provided, if they exist. For plan, the webhooks for all contexts that you have access to will be returned, and theresponse is paginated",
  input: {
    type: "object",
    properties: {
      context: {
        type: "string",
        description: 'Context to create the resource on. Should be "team", "project", or "file".',
      },
      context_id: {
        type: "string",
        description:
          "The id of the context that you want to get attached webhooks for. If you're using context_id, you cannot use plan_api_id.",
      },
      plan_api_id: {
        type: "string",
        description:
          "The id of your plan. Use this to get all webhooks for all contexts you have access to. If you're using plan_api_id, you cannot use context or context_id. When you use plan_api_id, the response is paginated.",
      },
      cursor: {
        type: "string",
        description:
          "If you're using plan_api_id, this is the cursor to use for pagination. If you're using context or context_id, this parameter is ignored. Provide the next_page or prev_page value from the previous response to get the next or previous page of results.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/v2/webhooks",
    query: ["context", "context_id", "plan_api_id", "cursor"],
  },
});
