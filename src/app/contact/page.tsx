import ContactUS from "../components/contact";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "Contact Hotel – Luxury Hotel in Nathia Gali",
    template: "%s | Hotel"
  },
  description: 
    "Get in touch with Hotel in Nathia Gali for bookings, inquiries, and reservations. Enjoy luxury stays, breathtaking mountain views, and exceptional hospitality. Call +92 328 9330350."
};


// Add viewport and other important meta tags
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function ContactPage() {
  return (
    <>
      {/* Add breadcrumb navigation for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Contact Us - SekaiSpace',
            description: 'Contact SekaiSpace for professional web development services in Pakistan',
            url: 'https://sekaispace.vercel.app/contact',
            mainEntity: {
              '@type': 'ContactPage'
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://sekaispace.vercel.app'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Contact',
                  item: 'https://sekaispace.vercel.app/contact'
                }
              ]
            }
          })
        }}
      />
      <ContactUS />
    </>
  );
}