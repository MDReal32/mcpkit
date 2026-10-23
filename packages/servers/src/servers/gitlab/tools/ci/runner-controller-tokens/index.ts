import { ciRunnerControllerTokensCreateRunnerControllersTokens } from "./create-runner-controllers-tokens";
import { ciRunnerControllerTokensCreateRunnerControllersTokensRotate } from "./create-runner-controllers-tokens-rotate";
import { ciRunnerControllerTokensDeleteRunnerControllersTokens } from "./delete-runner-controllers-tokens";
import { ciRunnerControllerTokensGetRunnerControllersTokens } from "./get-runner-controllers-tokens";

export const ciRunnerControllerTokensTools = [
  ciRunnerControllerTokensCreateRunnerControllersTokens,
  ciRunnerControllerTokensCreateRunnerControllersTokensRotate,
  ciRunnerControllerTokensDeleteRunnerControllersTokens,
  ciRunnerControllerTokensGetRunnerControllersTokens,
];
