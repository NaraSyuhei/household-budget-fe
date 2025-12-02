import { defineConfig as defineViteConfig, mergeConfig } from 'vite'
import { defineConfig as defineVitestConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react-swc'

const viteConfig = defineViteConfig({
  plugins: [react(), tsconfigPaths()],
})

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
  },
})

export default mergeConfig(viteConfig, vitestConfig)
