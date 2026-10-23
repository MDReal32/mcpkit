import { describeError } from "../../../errors";
import { AuthError } from "../../auth-error";

export const readJsonBody = async (response: Response, serverName: string) => {
  const text = await response.text();
  try {
    const body: unknown = JSON.parse(text);
    return body;
  } catch (error) {
    throw new AuthError(
      `${serverName}: token endpoint returned ${response.status} with invalid JSON: ${describeError(error)}`,
    );
  }
};
