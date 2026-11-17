/** Whether the credentials below the host field wait for a host to be typed: the form asks for one and it is still empty. */
export const isAwaitingHost = (asksForHost: boolean, typedHost: string) => asksForHost && typedHost === "";
