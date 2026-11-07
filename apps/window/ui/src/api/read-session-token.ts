import { readWindowContext } from "../window/read-window-context";

export const readSessionToken = () => readWindowContext()?.session ?? decodeURIComponent(window.location.hash.slice(1));
