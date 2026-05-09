import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  const version = process.env.VITE_APP_VERSION || 'v1';
  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      assetsDir: '',
      cssCodeSplit: false, // Fuerza un solo archivo CSS monolítico
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: `DopplerMap_${version}.js`,
          assetFileNames: `DopplerMap_${version}.[ext]`,
          chunkFileNames: `DopplerMap_${version}.js`
        }
      }
    }
  }
})
