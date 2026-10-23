import { defineTool } from "@usemcpkit/core";

export const metaMetaGetOctocat = defineTool({
  name: "meta:meta:get_octocat",
  description: "Get Octocat. Get the octocat as ASCII art",
  input: {
    type: "object",
    properties: {
      s: {
        type: "string",
        description: "The words to show in Octocat's speech bubble",
      },
      save_to: {
        type: "string",
        description: "Local path the downloaded file is saved to.",
      },
    },
    required: ["save_to"],
  },
  request: {
    method: "GET",
    path: "/octocat",
    query: ["s"],
    saveToArg: "save_to",
  },
});
