import { createServer } from "node:http";
import { CALLBACK_PAGE, CALLBACK_PATH, LOOPBACK_HOST } from "../../const";
import type { CallbackListener } from "../../types/oauth/callback-listener";

/** Starts the loopback redirect target (RFC 8252) and resolves with the first callback's query. */
export const listenForCallback = async (port: number) => {
  const server = createServer();
  const params = new Promise<URLSearchParams>((resolve) => {
    server.on("request", (request, response) => {
      const url = new URL(request.url ?? "/", `http://${LOOPBACK_HOST}`);
      if (url.pathname !== CALLBACK_PATH) {
        response.writeHead(404).end();
        return;
      }
      response.writeHead(200, { "content-type": "text/html; charset=utf-8" }).end(CALLBACK_PAGE);
      resolve(url.searchParams);
    });
  });
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, LOOPBACK_HOST, resolve);
  });
  const address = server.address();
  if (address === null || typeof address === "string") {
    server.close();
    throw new Error("callback server has no TCP address");
  }
  const listener: CallbackListener = {
    redirectUri: `http://${LOOPBACK_HOST}:${address.port}${CALLBACK_PATH}`,
    params,
    close: () =>
      new Promise<void>((resolve, reject) => {
        server.closeAllConnections();
        server.close((error) => (error ? reject(error) : resolve()));
      }),
  };
  return listener;
};
