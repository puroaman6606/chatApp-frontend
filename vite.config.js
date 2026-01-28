// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from 'tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- This must be @tailwindcss/vite

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
   server: {
    proxy: {
      '/api': {
        target: 'https://chatapp-backend-nj3a.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})


// frontend/vite.config.js
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000',
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// })