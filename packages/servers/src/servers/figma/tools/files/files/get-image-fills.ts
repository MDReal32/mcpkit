import { defineTool } from "@usemcpkit/core";

export const filesFilesGetImageFills = defineTool({
  name: "files:files:get_image_fills",
  description:
    "Get image fills. Returns download links for all images present in image fills in a document. Image fills are how Figma represents any user supplied images. When you drag an image into Figma, we create a rectangle with a single fill that represents the image, and the user is able to transform the rectangle (and properties on the fill) as they wish.",
  input: {
    type: "object",
    properties: {
      file_key: {
        type: "string",
        description:
          "File to get image URLs from. This can be a file key or branch key. Use `GET /v1/files/:key` with the `branch_data` query param to get the branch key.",
      },
    },
    required: ["file_key"],
  },
  request: {
    method: "GET",
    path: "/v1/files/{file_key}/images",
  },
});
