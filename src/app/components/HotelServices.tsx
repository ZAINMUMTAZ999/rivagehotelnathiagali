"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Utensils, HeartPulse, Briefcase, BellDot, BedDouble } from 'lucide-react';

// Define the type for a single service item
interface ServiceItem {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
}

// Data for Hotel Services
const services: ServiceItem[] = [
  {
    id: 1,
    icon: Sparkles,
    title: 'Impeccable Cleanliness',
    description:
      "Our commitment to hygiene is paramount. Enjoy pristine surroundings, sanitized spaces, and fresh linens daily, ensuring your peace of mind throughout your stay.",
  },
  {
    id: 2,
    icon: Utensils,
    title: 'Gourmet Culinary Journeys',
    description:
      "Savor exquisite local and international cuisines prepared by our master chefs. From casual cafes to fine dining, indulge your palate with fresh, seasonal ingredients.",
  },
  {
    id: 3,
    icon: HeartPulse,
    title: 'Wellness & Serenity',
    description:
      "Rejuvenate your senses at our serene spa, maintain your routine at the modern fitness center, or simply meditate amidst nature. Your well-being is our priority.",
  },
  {
    id: 4,
    icon: Briefcase,
    title: 'Seamless Events & Banquets',
    description:
      "Host your conferences, dream weddings, or social gatherings in our versatile, elegantly appointed spaces. Our dedicated team ensures every detail is perfect.",
  },
  {
    id: 5,
    icon: BellDot,
    title: 'Personalized Concierge',
    description:
      "Our attentive concierge team is available 24/7 to assist with anything from local excursions and transportation to special requests and personalized itineraries.",
  },
  {
    id: 6,
    icon: BedDouble,
    title: 'Luxurious Accommodations',
    description:
      "Retreat to elegantly appointed rooms and suites, each offering plush furnishings, modern amenities, and breathtaking vistas of Murree's majestic hills.",
  },
];

const HotelServicesSection: React.FC = () => {
 
  return (
    <motion.section
      className="bg-white py-4 sm:py-6 md:py-8 lg:py-24 xl:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-8 md:mb-16">
        <motion.h2
          className="text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-extrabold text-indigo-800 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Our Signature Hotel Services
        </motion.h2>

        <motion.p
          className="text-sm md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          At our hotel, every detail is crafted to ensure an extraordinary stay.
          Discover our range of world-class services designed for your ultimate
          comfort and delight.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              custom={index}
              variants={{
                hidden: {
                  opacity: 0,
                  x: index % 2 === 0 ? -50 : 50,
                  y: 20,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: {
                    duration: 0.7,
                    delay: index * 0.1,
                    ease: "easeOut",
                  },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-2 sm:p-4 md:p-8 flex flex-col items-center text-center border-t-4 border-blue-500"
            >
              <div className="mb-6 bg-indigo-100 text-indigo-700 p-2 md:p-4 rounded-full inline-flex items-center justify-center shadow-inner">
                <service.icon size={40} className="stroke-2" />
              </div>

              <h3 className="text-base md:text-xl lg:text-2xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>

              <p className="text-sm md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default HotelServicesSection;