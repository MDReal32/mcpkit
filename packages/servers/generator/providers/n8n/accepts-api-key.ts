import type { OpenApiOperation } from "../../utils/types/open-api-operation";
import { API_KEY_SCHEME } from "./const";

export const acceptsApiKey = ({ security }: OpenApiOperation) =>
  security === undefined ||
  security.some((requirement) => Object.keys(requirement).length === 0 || API_KEY_SCHEME in requirement);
