import React from 'react';
import { restaurantData } from '../data/restaurantData';

export const SeoJsonLd: React.FC = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": restaurantData.name,
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    "telephone": restaurantData.phone,
    "priceRange": restaurantData.priceRange,
    "servesCuisine": [
      "North Indian",
      "Rajasthani",
      "Chinese",
      "Fast Food",
      "Street Food",
      "Sandwiches",
      "Pasta",
      "Momos",
      "Cafe"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Sainthal Road, Vinayak Nagar",
      "addressLocality": "Dausa",
      "addressRegion": "Rajasthan",
      "postalCode": "303303",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "09:00",
        "closes": "23:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": restaurantData.rating.score.toString(),
      "reviewCount": restaurantData.rating.reviewCount.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "url": "https://mannatcafedausa.com/",
    "hasMenu": "https://mannatcafedausa.com/#menu",
    "potentialAction": {
      "@type": "OrderAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `https://wa.me/${restaurantData.whatsappNumber}`,
        "inLanguage": "en-US",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};
