import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Fix: Property 'cwd' does not exist on type 'Process'
  // We use process.cwd() to load env vars from .env files if they exist locally
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Safely replace process.env.API_KEY with the string value
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      // Polyfill process.env to an empty object so access doesn't crash the app
      'process.env': JSON.stringify({})
    }
  }
})