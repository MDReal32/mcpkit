import { reposGitCreateBlob } from "./create-blob";
import { reposGitCreateCommit } from "./create-commit";
import { reposGitCreateRef } from "./create-ref";
import { reposGitCreateTag } from "./create-tag";
import { reposGitCreateTree } from "./create-tree";
import { reposGitDeleteRef } from "./delete-ref";
import { reposGitGetBlob } from "./get-blob";
import { reposGitGetCommit } from "./get-commit";
import { reposGitGetRef } from "./get-ref";
import { reposGitGetTag } from "./get-tag";
import { reposGitGetTree } from "./get-tree";
import { reposGitListMatchingRefs } from "./list-matching-refs";
import { reposGitUpdateRef } from "./update-ref";

export const reposGitTools = [
  reposGitCreateBlob,
  reposGitCreateCommit,
  reposGitCreateRef,
  reposGitCreateTag,
  reposGitCreateTree,
  reposGitDeleteRef,
  reposGitGetBlob,
  reposGitGetCommit,
  reposGitGetRef,
  reposGitGetTag,
  reposGitGetTree,
  reposGitListMatchingRefs,
  reposGitUpdateRef,
];
