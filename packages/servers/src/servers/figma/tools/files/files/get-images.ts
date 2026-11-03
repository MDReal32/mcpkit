import { defineTool } from "@usemcpkit/core";

export const filesFilesGetImages = defineTool({
  name: "files:files:get_images",
  description: "Render images of file nodes. Renders images from a file.",
  input: {
    type: "object",
    properties: {
      file_key: {
        type: "string",
        description:
          "File to export images from. This can be a file key or branch key. Use `GET /v1/files/:key` with the `branch_data` query param to get the branch key.",
      },
      ids: {
        type: "string",
        description: "A comma separated list of node IDs to render.",
      },
      version: {
        type: "string",
        description: "A specific version ID to get. Omitting this will get the current version of the file.",
      },
      scale: {
        type: "number",
        description: "A number between 0.01 and 4, the image scaling factor.",
      },
      format: {
        type: "string",
        default: "png",
        enum: ["jpg", "png", "svg", "pdf"],
        description: "A string enum for the image output format.",
      },
      svg_outline_text: {
        type: "boolean",
        default: true,
        description: "Whether text elements are rendered as outlines (vector paths) or as `<text>` elements in SVGs.",
      },
      svg_include_id: {
        type: "boolean",
        default: false,
        description:
          "Whether to include id attributes for all SVG elements. Adds the layer name to the `id` attribute of an svg element.",
      },
      svg_include_node_id: {
        type: "boolean",
        default: false,
        description:
          "Whether to include node id attributes for all SVG elements. Adds the node id to a `data-node-id` attribute of an svg element.",
      },
      svg_simplify_stroke: {
        type: "boolean",
        default: true,
        description:
          "Whether to simplify inside/outside strokes and use stroke attribute if possible instead of `<mask>`.",
      },
      contents_only: {
        type: "boolean",
        default: true,
        description:
          "Whether content that overlaps the node should be excluded from rendering. Passing false (i.e., rendering overlaps) may increase processing time, since more of the document must be included in rendering.",
      },
      use_absolute_bounds: {
        type: "boolean",
        default: false,
        description:
          "Use the full dimensions of the node regardless of whether or not it is cropped or the space around it is empty. Use this to export text nodes without cropping.",
      },
    },
    required: ["file_key", "ids"],
  },
  request: {
    method: "GET",
    path: "/v1/images/{file_key}",
    query: [
      "ids",
      "version",
      "scale",
      "format",
      "svg_outline_text",
      "svg_include_id",
      "svg_include_node_id",
      "svg_simplify_stroke",
      "contents_only",
      "use_absolute_bounds",
    ],
  },
});
