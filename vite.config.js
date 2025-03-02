import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), vueDevTools()],
    build: {
        rollupOptions: {
            external: ["vue", "echarts"],
            output: {
                globals: {
                    vue: "Vue",
                    echarts: "echarts",
                },
            },
        },
        lib: {
            entry: "./package/index.js",
            name: "sdl-app-component",
            formats: ["es", "umd"],
        },
    },
});
