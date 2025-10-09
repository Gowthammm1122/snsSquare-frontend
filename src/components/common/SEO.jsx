import React from 'react';
import { Helmet } from '@dr.pogodin/react-helmet'; // <-- updated

const SEO = ({
  title = "SNS Square | Agentic AI for Smarter Business Automation",
  description = "SNS Square builds powerful Agentic AI solutions that transform businesses.",
  keywords = "SNS Square, Agentic AI, AI Agents",
  image = "/images/og/home-og.jpg",
  url = "",
}) => {
  const fullUrl = url ? `${window.location.origin}${url}` : window.location.href;
  const fullImageUrl = image.startsWith('http') ? image : `${window.location.origin}${image}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
    </Helmet>
  );
};

export default SEO;
