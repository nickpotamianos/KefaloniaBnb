// This script adds canonical meta tags to blog posts via a server-side script
// It can be placed in your server's middleware to modify HTML responses

const addCanonicalMetaTags = (html, url) => {
  // Extract slug from URL
  let slug = '';
  
  if (url.includes('/blog/')) {
    slug = url.split('/blog/')[1];
  }
  
  // Only modify blog post pages
  if (!slug || slug === '') {
    return html;
  }
  
  const canonicalUrl = `https://villafiscardo.com/blog/${slug}`;
  
  // Replace the commented canonical placeholder with actual canonical tag
  const modifiedHtml = html.replace(
    '<!-- Canonical URLs now dynamically set by React Helmet in each page component -->',
    `<!-- Canonical URLs now dynamically set by React Helmet in each page component -->
    <link rel="canonical" href="${canonicalUrl}" />`
  );
  
  return modifiedHtml;
};

module.exports = { addCanonicalMetaTags };
