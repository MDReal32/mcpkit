import { datacenterContentCreate } from "./create";
import { datacenterContentCreateBlueprintInstance } from "./create-blueprint-instance";
import { datacenterContentCreateBulkPageDelete } from "./create-bulk-page-delete";
import { datacenterContentCreateBulkPageDeleteDeletableDescendantCounts } from "./create-bulk-page-delete-deletable-descendant-counts";
import { datacenterContentCreateBulkPageDeletePreview } from "./create-bulk-page-delete-preview";
import { datacenterContentCreateChildAttachment } from "./create-child-attachment";
import { datacenterContentCreateChildAttachmentData } from "./create-child-attachment-data";
import { datacenterContentCreateChildAttachmentMove } from "./create-child-attachment-move";
import { datacenterContentCreateLabel } from "./create-label";
import { datacenterContentCreateProperty } from "./create-property";
import { datacenterContentCreatePropertyByKey } from "./create-property-by-key";
import { datacenterContentDelete } from "./delete";
import { datacenterContentDeleteChildAttachment } from "./delete-child-attachment";
import { datacenterContentDeleteChildAttachmentVersion } from "./delete-child-attachment-version";
import { datacenterContentDeleteLabel } from "./delete-label";
import { datacenterContentDeleteLabelByLabel } from "./delete-label-by-label";
import { datacenterContentDeleteProperty } from "./delete-property";
import { datacenterContentDeleteVersion } from "./delete-version";
import { datacenterContentGet } from "./get";
import { datacenterContentGetBulkPageChildren } from "./get-bulk-page-children";
import { datacenterContentGetBulkPageDeleteLimits } from "./get-bulk-page-delete-limits";
import { datacenterContentGetBulkPageSpaceRoot } from "./get-bulk-page-space-root";
import { datacenterContentGetChild } from "./get-child";
import { datacenterContentGetChildAttachment } from "./get-child-attachment";
import { datacenterContentGetChildAttachmentExtractedtext } from "./get-child-attachment-extractedtext";
import { datacenterContentGetChildByType } from "./get-child-by-type";
import { datacenterContentGetChildComment } from "./get-child-comment";
import { datacenterContentGetDescendant } from "./get-descendant";
import { datacenterContentGetDescendantByType } from "./get-descendant-by-type";
import { datacenterContentGetDescendantPageCount } from "./get-descendant-page-count";
import { datacenterContentGetHistory } from "./get-history";
import { datacenterContentGetHistoryMacroHash } from "./get-history-macro-hash";
import { datacenterContentGetHistoryMacroId } from "./get-history-macro-id";
import { datacenterContentGetLabel } from "./get-label";
import { datacenterContentGetProperty } from "./get-property";
import { datacenterContentGetPropertyByKey } from "./get-property-by-key";
import { datacenterContentGetRestrictionByOperation } from "./get-restriction-by-operation";
import { datacenterContentGetRestrictionByOperationByOperationKey } from "./get-restriction-by-operation-by-operation-key";
import { datacenterContentGetRestrictionRelevantViewRestrictions } from "./get-restriction-relevant-view-restrictions";
import { datacenterContentGetScan } from "./get-scan";
import { datacenterContentGetSearch } from "./get-search";
import { datacenterContentGetWatchers } from "./get-watchers";
import { datacenterContentList } from "./list";
import { datacenterContentUpdate } from "./update";
import { datacenterContentUpdateBlueprintInstance } from "./update-blueprint-instance";
import { datacenterContentUpdateChildAttachment } from "./update-child-attachment";
import { datacenterContentUpdateProperty } from "./update-property";
import { datacenterContentUpdateRestriction } from "./update-restriction";

export const datacenterContentTools = [
  datacenterContentCreate,
  datacenterContentCreateBlueprintInstance,
  datacenterContentCreateBulkPageDelete,
  datacenterContentCreateBulkPageDeleteDeletableDescendantCounts,
  datacenterContentCreateBulkPageDeletePreview,
  datacenterContentCreateChildAttachment,
  datacenterContentCreateChildAttachmentData,
  datacenterContentCreateChildAttachmentMove,
  datacenterContentCreateLabel,
  datacenterContentCreateProperty,
  datacenterContentCreatePropertyByKey,
  datacenterContentDelete,
  datacenterContentDeleteChildAttachment,
  datacenterContentDeleteChildAttachmentVersion,
  datacenterContentDeleteLabel,
  datacenterContentDeleteLabelByLabel,
  datacenterContentDeleteProperty,
  datacenterContentDeleteVersion,
  datacenterContentGet,
  datacenterContentGetBulkPageChildren,
  datacenterContentGetBulkPageDeleteLimits,
  datacenterContentGetBulkPageSpaceRoot,
  datacenterContentGetChild,
  datacenterContentGetChildAttachment,
  datacenterContentGetChildAttachmentExtractedtext,
  datacenterContentGetChildByType,
  datacenterContentGetChildComment,
  datacenterContentGetDescendant,
  datacenterContentGetDescendantByType,
  datacenterContentGetDescendantPageCount,
  datacenterContentGetHistory,
  datacenterContentGetHistoryMacroHash,
  datacenterContentGetHistoryMacroId,
  datacenterContentGetLabel,
  datacenterContentGetProperty,
  datacenterContentGetPropertyByKey,
  datacenterContentGetRestrictionByOperation,
  datacenterContentGetRestrictionByOperationByOperationKey,
  datacenterContentGetRestrictionRelevantViewRestrictions,
  datacenterContentGetScan,
  datacenterContentGetSearch,
  datacenterContentGetWatchers,
  datacenterContentList,
  datacenterContentUpdate,
  datacenterContentUpdateBlueprintInstance,
  datacenterContentUpdateChildAttachment,
  datacenterContentUpdateProperty,
  datacenterContentUpdateRestriction,
];
