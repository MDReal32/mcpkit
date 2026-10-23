export interface CallbackListener {
  redirectUri: string;
  params: Promise<URLSearchParams>;
  close: () => Promise<void>;
}
