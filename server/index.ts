import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import * as bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Get the environment
const isProduction = process.env.NODE_ENV === 'production';

// Add WWW to non-WWW redirect middleware (before other middlewares)
app.use((req, res, next) => {
  if (isProduction && req.headers.host?.startsWith('www.')) {
    // Get the original host without 'www.' prefix
    const nonWwwHost = req.headers.host.replace(/^www\./, '');
    
    // Build the redirect URL
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const redirectUrl = `${protocol}://${nonWwwHost}${req.originalUrl}`;
    
    // Send a 301 permanent redirect
    return res.redirect(301, redirectUrl);
  }
  next();
});

// Configure CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://villafiscardo.com', 'https://www.villafiscardo.com']
    : 'http://localhost:5173',
  credentials: true
}));

// Parse JSON for regular routes
app.use((req, res, next) => {
  // Skip body parsing for Stripe webhook route
  if (req.originalUrl === '/api/stripe-webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Use PORT environment variable (set by many cloud providers)
  // or default to 8080 in production, 3000 in development
  const port = process.env.PORT || (isProduction ? 8080 : 3000);
  server.listen(port, () => {
    log(`serving on port ${port}`);
  });
})();
