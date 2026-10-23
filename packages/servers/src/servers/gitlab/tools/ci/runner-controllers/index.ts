import { ciRunnerControllersCreateRunnerControllers } from './create-runner-controllers';
import { ciRunnerControllersCreateRunnerControllersScopesInstance } from './create-runner-controllers-scopes-instance';
import { ciRunnerControllersCreateRunnerControllersScopesRunners } from './create-runner-controllers-scopes-runners';
import { ciRunnerControllersDeleteRunnerControllers } from './delete-runner-controllers';
import { ciRunnerControllersDeleteRunnerControllersScopesInstance } from './delete-runner-controllers-scopes-instance';
import { ciRunnerControllersDeleteRunnerControllersScopesRunners } from './delete-runner-controllers-scopes-runners';
import { ciRunnerControllersGetRunnerControllers } from './get-runner-controllers';
import { ciRunnerControllersListRunnerControllersScopes } from './list-runner-controllers-scopes';
import { ciRunnerControllersUpdateRunnerControllers } from './update-runner-controllers';

export const ciRunnerControllersTools = [
  ciRunnerControllersCreateRunnerControllers,
  ciRunnerControllersCreateRunnerControllersScopesInstance,
  ciRunnerControllersCreateRunnerControllersScopesRunners,
  ciRunnerControllersDeleteRunnerControllers,
  ciRunnerControllersDeleteRunnerControllersScopesInstance,
  ciRunnerControllersDeleteRunnerControllersScopesRunners,
  ciRunnerControllersGetRunnerControllers,
  ciRunnerControllersListRunnerControllersScopes,
  ciRunnerControllersUpdateRunnerControllers,
];
