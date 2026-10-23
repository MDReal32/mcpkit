export interface AuthorizationRequest {
  redirectUri: string;
  challenge: string;
  state: string;
}
