import { applicationsOauth2GetMyOauth2Application } from "./get-my-oauth2-application";
import { applicationsOauth2GetMyOauth2Authorization } from "./get-my-oauth2-authorization";
import { applicationsOauth2GetOpenidConnectUserinfo } from "./get-openid-connect-userinfo";
import { applicationsOauth2GetPublicKeys } from "./get-public-keys";

export const applicationsOauth2Tools = [
  applicationsOauth2GetMyOauth2Application,
  applicationsOauth2GetMyOauth2Authorization,
  applicationsOauth2GetOpenidConnectUserinfo,
  applicationsOauth2GetPublicKeys,
];
