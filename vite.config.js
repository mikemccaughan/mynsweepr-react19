import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vitePluginTypescriptTransform } from 'vite-plugin-typescript-transform'; 
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
const viteTSOptions = {
  tsconfig: {
    override: {
      strict: true,
      forceConsistentCasingInFileNames: true,
      allowSyntheticDefaultImports: true,
      esModuleInterop: true,
      jsx: 'react',
      jsxImportSource: 'react',
      module: 'esnext',
    }
  }
};
export default defineConfig({
  plugins: [vitePluginTypescriptTransform(viteTSOptions), react(), svgr()],
});
