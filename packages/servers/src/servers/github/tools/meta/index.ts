import { metaCodesOfConductTools } from "./codes-of-conduct";
import { metaEmojisTools } from "./emojis";
import { metaGitignoreTools } from "./gitignore";
import { metaLicensesTools } from "./licenses";
import { metaMarkdownTools } from "./markdown";
import { metaMetaTools } from "./meta";
import { metaRateLimitTools } from "./rate-limit";

export const metaGroupTools = [
  ...metaCodesOfConductTools,
  ...metaEmojisTools,
  ...metaGitignoreTools,
  ...metaLicensesTools,
  ...metaMarkdownTools,
  ...metaMetaTools,
  ...metaRateLimitTools,
];
