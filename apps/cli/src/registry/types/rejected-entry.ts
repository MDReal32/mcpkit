export interface RejectedEntry {
  status: 'rejected';
  entry: string;
  errors: readonly string[];
}
