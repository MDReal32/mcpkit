import { randomBytes } from "node:crypto";
import { RANDOM_TOKEN_BYTES } from "../../const";

export const createRandomToken = () => randomBytes(RANDOM_TOKEN_BYTES).toString("base64url");
