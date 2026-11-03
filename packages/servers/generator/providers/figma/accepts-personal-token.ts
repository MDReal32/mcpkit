import type { OpenApiOperation } from "../../utils/types/open-api-operation";
import { PERSONAL_TOKEN_SCHEME } from "./const";

export const acceptsPersonalToken = ({ security }: OpenApiOperation) =>
  security === undefined ||
  security.some((requirement) => Object.keys(requirement).length === 0 || PERSONAL_TOKEN_SCHEME in requirement);
