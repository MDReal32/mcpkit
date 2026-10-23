/** The client's own handshake lines, kept to replay them to a replacement worker. */
export interface HandshakeRecord {
  initialize?: string;
  initialized?: string;
}
