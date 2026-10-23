import { issuesPullRequestStacksAdd } from "./add";
import { issuesPullRequestStacksCreate } from "./create";
import { issuesPullRequestStacksGet } from "./get";
import { issuesPullRequestStacksList } from "./list";
import { issuesPullRequestStacksUnstack } from "./unstack";

export const issuesPullRequestStacksTools = [
  issuesPullRequestStacksAdd,
  issuesPullRequestStacksCreate,
  issuesPullRequestStacksGet,
  issuesPullRequestStacksList,
  issuesPullRequestStacksUnstack,
];
