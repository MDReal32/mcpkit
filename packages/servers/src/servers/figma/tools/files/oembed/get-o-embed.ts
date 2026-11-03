import { defineTool } from "@usemcpkit/core";

export const filesOembedGetOEmbed = defineTool({
  name: "files:oembed:get_o_embed",
  description:
    "Get oEmbed data. Returns oEmbed data for a Figma file or published Make site URL, following the oEmbed specification.",
  input: {
    type: "object",
    properties: {
      url: {
        type: "string",
        description: "The URL of the Figma file or published Make site to retrieve oEmbed data for.",
      },
      maxwidth: {
        type: "integer",
        default: 800,
        description:
          "Maximum width of the embed in pixels. Defaults to 800. The response width will be adjusted to maintain a 16:9 aspect ratio with maxheight.",
      },
      maxheight: {
        type: "integer",
        default: 450,
        description:
          "Maximum height of the embed in pixels. Defaults to 450. The response height will be adjusted to maintain a 16:9 aspect ratio with maxwidth.",
      },
    },
    required: ["url"],
  },
  request: {
    method: "GET",
    path: "/v1/oembed",
    query: ["url", "maxwidth", "maxheight"],
  },
});
