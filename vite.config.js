import {createVuePlugin} from "vite-plugin-vue2"
import {defineConfig} from 'vite'
import path from "path";
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },
    base: "/",
    plugins: [
        createVuePlugin({ jsx: true }),
        require("tailwindcss"),
        require("autoprefixer")
        // vueJsx(),
        // vue(),
    ],
    // optimizeDeps: {
    //     include: ["lodash", 'ksc-components']
    // },
    css: {
        modules: {
            include: /\.css$/,
            exclude: /node_modules/
        },
        postcss: {

        }
    },
    server: {
        proxy: {
            '/i/damDs': {
                target: 'http://10.69.58.249:8848',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/i/, '')
            }
        }
    }
})
