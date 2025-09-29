// app/contact/page.tsx (Server Component)
import ContactUS from "../components/contact";
import type { Metadata } from 'next';

// Comprehensive SEO Metadata for Contact Page
export const metadata: Metadata = {
  title: "Contact Us - Rivage cottage NathiaGali",
  description: "Get in touch with Rivage cottage NathiaGali for resorts/rooms, daily basis, weekly basis, bi-weelkly basis and monthly basis. Located in Nathi Gali. Call +92 328 9330350",
  
  keywords: [
    "contact  Rivage cottage NathiaGali Abbottabad",
    "resort  NathiaGali Abbottabad",
    "call :  +92 328 9330350",
    "Resort Northern areas nathia gali Abbottabad"
     ],
  
  // openGraph: {
  //   title: "Contact SekaiSpace - Professional Web Development Services",
  //   description: "Ready to start your project? Contact our expert web development team in Islamabad. Free consultation, custom solutions, and professional support.",
  //   url: "https://sekaispace.vercel.app/contact",
  //   type: "website",
  //   siteName: "SekaiSpace",
  //   locale: "en_US",
  //   images: [
  //     {
  //       url: "/contact-og-image.jpg",
  //       width: 1200,
  //       height: 630,
  //       alt: "Contact SekaiSpace - Web Development Services in Islamabad"
  //     }
  //   ]
  // },
  
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@sekaispace",
  //   creator: "@sekaispace", 
  //   title: "Contact SekaiSpace - Web Development Services",
  //   description: "Get in touch for custom web development, mobile apps, and digital solutions. Located in Islamabad, Pakistan.",
  //   images: ["/contact-twitter-image.jpg"]
  // },
  
  // alternates: {
  //   canonical: "https://sekaispace.vercel.app/contact"
  // },
  
  // robots: {
  //   index: true,
  //   follow: true,
  //   googleBot: {
  //     index: true,
  //     follow: true,
  //     'max-video-preview': -1,
  //     'max-image-preview': 'large',
  //     'max-snippet': -1,
  //   },
  // },
  
  // // Enhanced structured data for local business
  // other: {
  //   'application/ld+json': JSON.stringify([
  //     {
  //       '@context': 'https://schema.org',
  //       '@type': 'LocalBusiness',
  //       name: 'SekaiSpace',
  //       description: 'Professional web development and digital solutions company',
  //       url: 'https://sekaispace.vercel.app',
  //       telephone: '+92-3246288217',
  //       email: 'mzainmumtaz99@gmail.com',
  //       address: {
  //         '@type': 'PostalAddress',
  //         streetAddress: 'Bank Square Plaza, F-11 Markaz',
  //         addressLocality: 'Islamabad',
  //         addressCountry: 'Pakistan'
  //       },
  //       geo: {
  //         '@type': 'GeoCoordinates',
  //         latitude: '33.7077', // Approximate coordinates for F-11 Islamabad
  //         longitude: '73.0946'
  //       },
  //       openingHours: 'Mo-Fr 09:00-18:00',
  //       priceRange: 'PKR 25,000 - PKR 500,000',
  //       serviceArea: {
  //         '@type': 'Country',
  //         name: 'Pakistan'
  //       },
  //       sameAs: [
  //         'https://wa.me/923246288217'
  //       ]
  //     },
  //     {
  //       '@context': 'https://schema.org',
  //       '@type': 'ContactPage',
  //       name: 'Contact SekaiSpace',
  //       description: 'Get in touch with our web development team',
  //       url: 'https://sekaispace.vercel.app/contact',
  //       mainEntity: {
  //         '@type': 'Organization',
  //         name: 'SekaiSpace',
  //         contactPoint: [
  //           {
  //             '@type': 'ContactPoint',
  //             telephone: '+92-3246288217',
  //             contactType: 'customer service',
  //             email: 'mzainmumtaz99@gmail.com',
  //             availableLanguage: ['English', 'Urdu'],
  //             hoursAvailable: {
  //               '@type': 'OpeningHoursSpecification',
  //               dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  //               opens: '09:00',
  //               closes: '18:00'
  //             }
  //           }
  //         ]
  //       }
  //     },
  //     {
  //       '@context': 'https://schema.org',
  //       '@type': 'BreadcrumbList',
  //       itemListElement: [
  //         {
  //           '@type': 'ListItem',
  //           position: 1,
  //           name: 'Home',
  //           item: 'https://sekaispace.vercel.app'
  //         },
  //         {
  //           '@type': 'ListItem',
  //           position: 2,
  //           name: 'Contact',
  //           item: 'https://sekaispace.vercel.app/contact'
  //         }
  //       ]
  //     }
  //   ])
  // }
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