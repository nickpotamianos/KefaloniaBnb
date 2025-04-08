import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Conditional imports for development-only plugins
const loadRuntimeErrorOverlay = async () => {
  try {
    // Only try to import in development mode
    if (process.env.NODE_ENV !== "production") {
      return (await import("@replit/vite-plugin-runtime-error-modal")).default();
    }
    return null;
  } catch (error) {
    console.warn('Runtime error overlay plugin not available, skipping');
    return null;
  }
};

// Conditional imports for Replit-specific plugins
const loadCartographer = async () => {
  try {
    // Only try to import in development mode on Replit
    if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
      return (await import("@replit/vite-plugin-cartographer")).cartographer();
    }
    return null;
  } catch (error) {
    console.warn('Cartographer plugin not available, skipping');
    return null;
  }
};

export default defineConfig(async () => {
  // Load optional plugins
  const runtimeErrorOverlay = await loadRuntimeErrorOverlay();
  const cartographer = await loadCartographer();
  
  // Create array of plugins, filtering out null values
  const plugins = [
    react(),
    themePlugin(),
  ].filter(Boolean);
  
  // Add optional plugins if they loaded successfully
  if (runtimeErrorOverlay) plugins.push(runtimeErrorOverlay);
  if (cartographer) plugins.push(cartographer);
  
  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
      },
    },
    root: path.resolve(__dirname, "client"),
    build: {
      outDir: path.resolve(__dirname, "dist/public"),
      emptyOutDir: true,
    },
  };
});
