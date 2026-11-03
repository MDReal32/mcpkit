import { usersPaymentsTools } from "./payments";
import { usersUsersTools } from "./users";

export const usersGroupTools = [...usersPaymentsTools, ...usersUsersTools];
