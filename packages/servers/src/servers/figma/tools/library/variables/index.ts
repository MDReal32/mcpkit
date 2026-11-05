import { libraryVariablesGetLocalVariables } from "./get-local-variables";
import { libraryVariablesGetPublishedVariables } from "./get-published-variables";
import { libraryVariablesPostVariables } from "./post-variables";

export const libraryVariablesTools = [
  libraryVariablesGetLocalVariables,
  libraryVariablesGetPublishedVariables,
  libraryVariablesPostVariables,
];
