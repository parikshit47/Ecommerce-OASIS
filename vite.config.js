import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import envCompatible from 'vite-plugin-env-compatible';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000, 
    host: true, 
  },
  envPrefix:'REACT_APP_',
  plugins: [react(), envCompatible()],
 
})
