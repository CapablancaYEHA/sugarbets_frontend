import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), eslint()],
  //   build: {
  //     rollupOptions: {
  //       output: {
  //         manualChunks(id) {
  //           if (id.includes("node_modules")) {
  //             return id
  //               .toString()
  //               .split("node_modules/")[1]
  //               .split("/")[0]
  //               .toString();
  //           }
  //         },
  //       },
  //     },
  //   },
});
