import path from "path";
import { app } from "electron";

export const isDev = (): boolean => {
  return process.env.NODE_ENV === "development";
};

export const getPreloadPath = (): string => {
  return path.join(
    app.getAppPath(),
    isDev() ? "." : "..",
    "/dist-electron/preload.cjs"
  );
};
