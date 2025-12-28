import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      tailwindcss(),
      react({
        babel: {
          plugins: [
            ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
          ]
        }
      })
    ],

    // Build optimizations
    build: {
      target: 'es2015',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // Remove console logs in production
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            ui: ['framer-motion'],
          }
        }
      },
      chunkSizeWarningLimit: 1000,
      sourcemap: false, // Disable sourcemaps for faster builds
    },

    // Server config
    server: {
      host: '0.0.0.0',
      port: parseInt(process.env.PORT) || 5173,
      proxy: {
        '/api': {
          target: env.VITE_API_URL || "https://digicare-backend.onrender.com",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    // Preview config
    preview: {
      host: '0.0.0.0',
      port: parseInt(process.env.PORT) || 4173,
    },

    // Performance optimizations
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
    },
  };
});
