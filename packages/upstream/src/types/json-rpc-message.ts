export interface JsonRpcError {
  code: number;
  message: string;
}

export interface JsonRpcMessage {
  id?: number | string;
  method?: string;
  result?: unknown;
  error?: JsonRpcError;
}
