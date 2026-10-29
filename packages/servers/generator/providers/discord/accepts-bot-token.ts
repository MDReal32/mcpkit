import type { OpenApiOperation } from "../../utils/types/open-api-operation";
import { BOT_TOKEN_SCHEME } from "./const";

export const acceptsBotToken = ({ security }: OpenApiOperation) =>
  security === undefined ||
  security.some((requirement) => Object.keys(requirement).length === 0 || BOT_TOKEN_SCHEME in requirement);
