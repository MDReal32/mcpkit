import { cloudV1RelationCreateRelationship } from "./create-relationship";
import { cloudV1RelationDeleteRelationship } from "./delete-relationship";
import { cloudV1RelationFindSourcesForTarget } from "./find-sources-for-target";
import { cloudV1RelationFindTargetFromSource } from "./find-target-from-source";
import { cloudV1RelationGetRelationship } from "./get-relationship";

export const cloudV1RelationTools = [
  cloudV1RelationCreateRelationship,
  cloudV1RelationDeleteRelationship,
  cloudV1RelationFindSourcesForTarget,
  cloudV1RelationFindTargetFromSource,
  cloudV1RelationGetRelationship,
];
