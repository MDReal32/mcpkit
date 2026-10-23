export interface SpecSource {
  name: string;
  url: string;
  /** Only paths under this prefix are generated; the rest of the document is Connect or DevOps provider API. */
  pathPrefix: string;
  /** Forces every operation of the document into one server group; otherwise the tag decides. */
  group?: string;
}
