import React from 'react';
import { Helmet } from 'react-helmet-async';

const DashboardMeta = () => {
  const url = 'https://yourdomain.com/dashboard'; // Absolute URL of the dashboard
  const title = 'Admin Dashboard | Your E-commerce Site';
  const description = 'Secure access to e-commerce sales, orders, and inventory management.';
  const image = 'https://yourdomain.com/images/dashboard-login-share.jpg'; // Generic login/brand image

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph Tags (Facebook, LinkedIn, etc.) */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter Card Tags (X) */}
      <meta name="twitter:card" content="summary" /> {/* Or summary_large_image */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default DashboardMeta;