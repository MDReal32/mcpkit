import { gitCreateBlob } from './create-blob';
import { gitCreateCommit } from './create-commit';
import { gitCreateRef } from './create-ref';
import { gitCreateTag } from './create-tag';
import { gitCreateTree } from './create-tree';
import { gitDeleteRef } from './delete-ref';
import { gitGetBlob } from './get-blob';
import { gitGetCommit } from './get-commit';
import { gitGetRef } from './get-ref';
import { gitGetTag } from './get-tag';
import { gitGetTree } from './get-tree';
import { gitListMatchingRefs } from './list-matching-refs';
import { gitUpdateRef } from './update-ref';

export const gitTools = [
  gitCreateBlob,
  gitCreateCommit,
  gitCreateRef,
  gitCreateTag,
  gitCreateTree,
  gitDeleteRef,
  gitGetBlob,
  gitGetCommit,
  gitGetRef,
  gitGetTag,
  gitGetTree,
  gitListMatchingRefs,
  gitUpdateRef,
];
