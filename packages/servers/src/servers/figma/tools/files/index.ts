import { filesCommentReactionsTools } from "./comment-reactions";
import { filesCommentsTools } from "./comments";
import { filesDevResourcesTools } from "./dev-resources";
import { filesFilesTools } from "./files";
import { filesOembedTools } from "./oembed";

export const filesGroupTools = [
  ...filesCommentReactionsTools,
  ...filesCommentsTools,
  ...filesDevResourcesTools,
  ...filesFilesTools,
  ...filesOembedTools,
];
