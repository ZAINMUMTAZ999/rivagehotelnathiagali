import ContactUS from "../components/contact";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "Contact Hotel – Luxury Hotel in Nathia Gali",
    template: "%s | Hotel"
  },
  description: 
    "Get in touch with Hotel in Nathia Gali for bookings, inquiries, and reservations. Enjoy luxury stays, breathtaking mountain views, and exceptional hospitality. Call +92 328 9330350.",
  keywords: [
    "Hotel contact Nathia Gali",
    "hotel bookings Nathia Gali",
    "luxury hotel Nathia Gali",
    "resort reservations Pakistan",
    "call +92 328 9330350",
    "mountain resort Nathia Gali",
    "family hotel stay Pakistan"
  ],
  icons: {
    icon: "/logo.svg"
  },
  openGraph: {
    title: "Contact ArcadianResort – Luxury Hotel in Nathia Gali",
    description: 
      "Reach out to Hotel in Nathia Gali for reservations, inquiries, and more. Experience comfort, nature, and top-class hospitality.",
    // url: "https://arcadianresort.com/contact",
    type: "website",
    siteName: "Hotel",
    images: [
      {
        url: "/contact-og-image.jpg", // add an image in /public
        width: 1200,
        height: 630,
        alt: "Hotel hotel contact page with mountain view"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Hotel – Luxury Hotel in Nathia Gali",
    description: 
      "Contact ArcadianResort in Nathia Gali for bookings, inquiries, and reservations. Enjoy luxury stays and stunning mountain views.",
    images: ["/contact-twitter-image.jpg"]
  },
  robots: {
    index: true,
    follow: true
  },
  // alternates: {
  //   canonical: "https://arcadianresort.com/contact"
  // },
  other: {
    'application/ld+json': JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "Hotel",
        name: "ArcadianResort",
        description: "Luxury hotel in Nathia Gali offering comfortable stays, scenic mountain views, and exceptional hospitality.",
        url: "https://arcadianresort.com",
        telephone: "+92-328-9330350",
        email: "info@arcadianresort.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Nathia Gali Road",
          addressLocality: "Nathia Gali",
          addressRegion: "Abbottabad",
          postalCode: "21010",
          addressCountry: "PK"
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "34.0750",
          longitude: "73.3611"
        },
        priceRange: "PKR 5,000 - PKR 25,000",
        checkinTime: "14:00",
        checkoutTime: "12:00",
        sameAs: [
          "https://wa.me/923289330350"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact ArcadianResort",
        description: "Reach out for reservations, inquiries, and bookings at ArcadianResort Nathia Gali.",
        url: "https://arcadianresort.com/contact",
        mainEntity: {
          "@type": "Organization",
          name: "ArcadianResort",
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+92-328-9330350",
              contactType: "customer service",
              email: "info@arcadianresort.com",
              availableLanguage: ["English", "Urdu"]
            }
          ]
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://arcadianresort.com"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Contact",
            item: "https://arcadianresort.com/contact"
          }
        ]
      }
    ])
  }
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