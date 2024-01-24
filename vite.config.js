import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "@view", replacement: path.resolve(__dirname, "src/view") },
      { find: "@model", replacement: path.resolve(__dirname, "src/model") },
      { find: "@util", replacement: path.resolve(__dirname, "src/util") },
      { find: "@init", replacement: path.resolve(__dirname, "src/init") },
      { find: "@handler", replacement: path.resolve(__dirname, "src/handler") },
    ],
  },
});
