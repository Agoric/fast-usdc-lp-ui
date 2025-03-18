import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { Plugin } from 'vite';

// Custom plugin to handle production-only content
const htmlEnvPlugin = (): Plugin => {
  return {
    name: 'html-env-plugin',
    transformIndexHtml: {
      enforce: 'pre',
      transform(html, { server }) {
        // Check if we're in production mode
        const isProd = !server;

        if (isProd) {
          // In production: Remove the placeholder tags but keep the content
          return html
            .replace(/%PROD_ONLY_START%/g, '')
            .replace(/%PROD_ONLY_END%/g, '');
        } else {
          // In development: Remove the tags and their content
          return html.replace(
            /%PROD_ONLY_START%[\s\S]*?%PROD_ONLY_END%/g,
            '<!-- Analytics code removed in development -->',
          );
        }
      },
    },
  };
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), htmlEnvPlugin()],
});
