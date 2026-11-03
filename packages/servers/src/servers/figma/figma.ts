import { defineFigmaServer } from "../../providers/figma";
import { figmaTools } from "./tools";

export const figma = defineFigmaServer({
  name: "figma",
  description:
    "Figma REST API: files and their nodes, rendered images and image fills, versions, comments and reactions, dev resources, published components, component sets, styles and variables, library analytics, teams' projects and folders, webhooks and the current user. Tools are named '<group>:<resource>:<action>'. A file key is the part after /design/ in a Figma link, and a node id looks like 1:2 (a link carries it as node-id=1-2). files:files:get_file returns the whole document and can be enormous: prefer files:files:get_file_nodes with ids, or pass depth. Variables need an Enterprise plan; operations that need an OAuth app or an organization token are not included.",
  tools: figmaTools,
});
