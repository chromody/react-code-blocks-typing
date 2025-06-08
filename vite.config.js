import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    preserveSymlinks: true
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: "react-code-blocks-typing",
      formats: ["es", "cjs"],
      fileName: (format) => `react-code-blocks-typing.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-code-blocks', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        }
      }
    },
    emptyOutDir: true,
  }
})
