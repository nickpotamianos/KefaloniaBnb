/**
 * This is a middleware function that adds canonical tags to HTML responses
 * It provides a server-side fallback if client-side solutions fail
 */

import { Request, Response, NextFunction } from 'express';

export default function addCanonicalTagsMiddleware(req: Request, res: Response, next: NextFunction) {
  // Store the original send method
  const originalSend = res.send;

  // Override the send method
  res.send = function(body) {
    // Only process HTML responses
    if (typeof body === 'string' && res.get('Content-Type')?.includes('text/html')) {
      // Extract the URL path
      const path = req.originalUrl || req.url;
      
      // Only modify blog pages
      if (path.startsWith('/blog/')) {
        const slug = path.split('/blog/')[1];
        
        if (slug && slug.length > 0) {
          const canonicalUrl = `https://villafiscardo.com/blog/${slug}`;
          
          // Add canonical tag if not present
          if (!body.includes('<link rel="canonical"')) {
            body = body.replace(
              '</head>',
              `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`
            );
          }
        }
      } else if (path === '/blog' || path === '/blog/') {
        const canonicalUrl = 'https://villafiscardo.com/blog';
        
        // Add canonical tag if not present
        if (!body.includes('<link rel="canonical"')) {
          body = body.replace(
            '</head>',
            `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`
          );
        }
      }
    }
    
    // Call the original send method
    return originalSend.call(this, body);
  };
  
  next();
}
