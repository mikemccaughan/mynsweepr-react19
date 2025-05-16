import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
const options = {
    plugins: [react(), svgr()],
    server: {
        port: 3000,
        strictPort: true,
        host: 'localhost'
    }
} as UserConfig;
export default defineConfig(options);
