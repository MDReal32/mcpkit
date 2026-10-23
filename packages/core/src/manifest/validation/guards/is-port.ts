import { MAX_PORT } from "../../const";

export const isPort = (value: unknown) => Number.isInteger(value) && Number(value) >= 0 && Number(value) <= MAX_PORT;
