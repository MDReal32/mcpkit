import { nameOperationsByTags } from "../../utils/naming/name-operations-by-tags";
import type { Operation } from "../../utils/types/operation";
import { SERVER_GROUPS } from "./const";

export const nameOperations = (operations: Operation[]) => nameOperationsByTags(operations, SERVER_GROUPS);
