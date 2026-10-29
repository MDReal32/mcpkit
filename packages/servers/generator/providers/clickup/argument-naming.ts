import { prefixIfTaken } from "../../utils/tool/prefix-if-taken";
import type { ArgumentNaming } from "../../utils/types/argument-naming";
import { toArgumentName } from "./to-argument-name";

export const argumentNaming: ArgumentNaming = {
  dropsQueryShadowedByPath: true,
  parameter: (parameter) => toArgumentName(parameter.name),
  bodyProperty: (key, taken) => prefixIfTaken(key, taken),
};
