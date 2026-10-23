import { usersApplicationsCreateApplications } from "./create-applications";
import { usersApplicationsCreateApplicationsRenewSecret } from "./create-applications-renew-secret";
import { usersApplicationsCreateUserApplications } from "./create-user-applications";
import { usersApplicationsDeleteApplications } from "./delete-applications";
import { usersApplicationsDeleteUserApplications } from "./delete-user-applications";
import { usersApplicationsGetUserApplications } from "./get-user-applications";
import { usersApplicationsListApplications } from "./list-applications";
import { usersApplicationsListUserApplications } from "./list-user-applications";
import { usersApplicationsUpdateUserApplications } from "./update-user-applications";

export const usersApplicationsTools = [
  usersApplicationsCreateApplications,
  usersApplicationsCreateApplicationsRenewSecret,
  usersApplicationsCreateUserApplications,
  usersApplicationsDeleteApplications,
  usersApplicationsDeleteUserApplications,
  usersApplicationsGetUserApplications,
  usersApplicationsListApplications,
  usersApplicationsListUserApplications,
  usersApplicationsUpdateUserApplications,
];
