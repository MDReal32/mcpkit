import { defineTool } from "@usemcpkit/core";

export const imagesImagesUploadImage = defineTool({
  name: "images:images:upload_image",
  description:
    "Upload a local image to Medium and get its URL, to use in a post. Medium also side-loads <img src> images in a post, so this is only needed for local files. JPEG, PNG, GIF and TIFF.",
  input: {
    type: "object",
    properties: {
      image: {
        type: "string",
        description: "Path of the image file on this machine.",
      },
    },
    required: ["image"],
  },
  request: {
    method: "POST",
    path: "/images",
    contentType: "multipart/form-data",
    fileArgs: ["image"],
  },
  response: {
    root: "data",
    fields: ["url", "md5"],
  },
});
