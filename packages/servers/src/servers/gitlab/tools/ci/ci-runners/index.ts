import { ciCiRunnersCreateRunners } from "./create-runners";
import { ciCiRunnersCreateRunnersResetAuthenticationToken } from "./create-runners-reset-authentication-token";
import { ciCiRunnersCreateRunnersVerify } from "./create-runners-verify";
import { ciCiRunnersDeleteRunners } from "./delete-runners";
import { ciCiRunnersDeleteRunnersManagers } from "./delete-runners-managers";
import { ciCiRunnersGetRunnersRouterDiscovery } from "./get-runners-router-discovery";

export const ciCiRunnersTools = [
  ciCiRunnersCreateRunners,
  ciCiRunnersCreateRunnersResetAuthenticationToken,
  ciCiRunnersCreateRunnersVerify,
  ciCiRunnersDeleteRunners,
  ciCiRunnersDeleteRunnersManagers,
  ciCiRunnersGetRunnersRouterDiscovery,
];
