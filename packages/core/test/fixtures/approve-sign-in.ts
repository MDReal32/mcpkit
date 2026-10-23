/** Plays the browser: follows the authorization URL straight back to the loopback redirect with a code. */
export const approveSignIn = (url: string) => {
  const params = new URL(url).searchParams;
  void fetch(`${params.get("redirect_uri") ?? ""}?code=code-1&state=${params.get("state") ?? ""}`);
};
