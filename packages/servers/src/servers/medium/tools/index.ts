import { accountGroupTools } from "./account";
import { imagesGroupTools } from "./images";
import { postsGroupTools } from "./posts";
import { publicationsGroupTools } from "./publications";

export const mediumTools = [...accountGroupTools, ...publicationsGroupTools, ...postsGroupTools, ...imagesGroupTools];
