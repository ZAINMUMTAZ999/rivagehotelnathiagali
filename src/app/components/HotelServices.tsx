"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Utensils, HeartPulse, Briefcase, BellDot, BedDouble } from 'lucide-react'; // Icons for services

// Define the type for a single service item
interface ServiceItem {
  id: number;
  icon: React.ElementType; // Type for Lucide React icons
  title: string;
  description: string;
}

// Data for Hotel Services
const services: ServiceItem[] = [
  {
    id: 1,
    icon: Sparkles,
    title: 'Impeccable Cleanliness',
    description: "Our commitment to hygiene is paramount. Enjoy pristine surroundings, sanitized spaces, and fresh linens daily, ensuring your peace of mind throughout your stay.",
  },
  {
    id: 2,
    icon: Utensils,
    title: 'Gourmet Culinary Journeys',
    description: "Savor exquisite local and international cuisines prepared by our master chefs. From casual cafes to fine dining, indulge your palate with fresh, seasonal ingredients.",
  },
  {
    id: 3,
    icon: HeartPulse,
    title: 'Wellness & Serenity',
    description: "Rejuvenate your senses at our serene spa, maintain your routine at the modern fitness center, or simply meditate amidst nature. Your well-being is our priority.",
  },
  {
    id: 4,
    icon: Briefcase,
    title: 'Seamless Events & Banquets',
    description: "Host your conferences, dream weddings, or social gatherings in our versatile, elegantly appointed spaces. Our dedicated team ensures every detail is perfect.",
  },
  {
    id: 5,
    icon: BellDot,
    title: 'Personalized Concierge',
    description: "Our attentive concierge team is available 24/7 to assist with anything from local excursions and transportation to special requests and personalized itineraries.",
  },
  {
    id: 6,
    icon: BedDouble,
    title: 'Luxurious Accommodations',
    description: "Retreat to elegantly appointed rooms and suites, each offering plush furnishings, modern amenities, and breathtaking vistas of Murree's majestic hills.",
  },
];

const HotelServicesSection: React.FC = () => {

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <motion.section
      className="bg-white py-16 md:py-24"
    //   variants={sectionVariants}
      initial="hidden"
      whileInView="visible" // Animate when the section comes into view
      viewport={{ once: true, amount: 0.2 }} // Trigger animation once when 20% visible
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center mb-16">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-indigo-800 mb-4"
          variants={itemVariants} // Animate the title
        >
          Our Signature Hotel Services
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto"
          variants={itemVariants} // Animate the description
        >
          At our hotel , every detail is crafted to ensure an extraordinary stay. Discover our range of world-class services designed for your ultimate comfort and delight.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-8 flex flex-col items-center text-center border-t-4 border-emerald-500"
              variants={itemVariants} // Animate each card
            >
              <div className="mb-6 bg-indigo-100 text-indigo-700 p-4 rounded-full inline-flex items-center justify-center shadow-inner">
                <service.icon size={40} className="stroke-2" /> {/* Render Lucide icon */}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
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