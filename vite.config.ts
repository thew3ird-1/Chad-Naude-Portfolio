import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Use process.cwd() via type casting to avoid TS errors in some environments
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Safely replace process.env.API_KEY. Defaults to empty string if undefined.
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
      // Polyfill process.env to an empty object
      'process.env': JSON.stringify({})
    }
  }
})