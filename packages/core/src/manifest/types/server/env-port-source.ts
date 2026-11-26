/** A port held by an environment variable of the calling process. */
export interface EnvPortSource {
  type: "env";
  name: string;
}
