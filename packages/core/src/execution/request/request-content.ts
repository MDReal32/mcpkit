export interface RequestContent {
  body: string | FormData | Blob;
  headers: Readonly<Record<string, string>>;
}
