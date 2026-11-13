/** A JSON listing of the published versions, for example GitHub's folder listing or jsDelivr's npm versions. */
export interface VersionList {
  url: string;
  /** Dotted path to the array (or object, whose keys are read) in the answer; the answer itself when absent. */
  items?: string;
  /** Field of each item when the items are objects, for example `name`. */
  field?: string;
  /** Regex whose first capture is the version, for example `^ghes-(\d+\.\d+)$`; items it does not match are skipped. */
  match: string;
}
