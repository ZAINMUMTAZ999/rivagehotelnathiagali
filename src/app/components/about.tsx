"use client";
import { motion } from 'framer-motion';
import { Mountain,  HeartHandshake,  Stars } from 'lucide-react'; // More evocative icons



import one from '../assets/p1.jpeg';
import two from'../assets/p2.jpeg'; // Optional: if you want a visual for the story
import three from '../assets/p3.jpeg'; // Optional: an image that captures Murree's spirit
import Image from 'next/image';
import Link from 'next/link';

const AboutUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Slightly faster stagger for a fluid feel
      },
    },
  };

  // const itemVariants = {
  //   hidden: { opacity: 0, y: 30 },
  //   visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10 } },
  // };

  return (
    <motion.div
      className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen text-gray-800"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
 

      <div className="relative h-72 md:h-96 lg:h-[500px] bg-cover bg-center" style={{ backgroundImage: `url(${[one.src]})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center p-4">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white text-center drop-shadow-2xl leading-tight"
            initial={{ y: -70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            Our Story: A Legacy in the <span className="text-emerald-300">Heart of Nathia Gali</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white text-center mt-4 max-w-3xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          >
            More than a hotel, we are a destination woven into the very fabric of Nathia Gali charm.
          </motion.p>
        </div>
      </div>

      {/* The Origin Story */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div className="lg:order-2">
            {two && (
              <Image
                src={two}
                alt="Our Origin Story at Holiday Resort Hotel"
                className="rounded-xl shadow-2xl object-cover w-full h-72 md:h-96 lg:h-auto max-w-full lg:max-w-none transform hover:scale-105 transition-transform duration-500 ease-in-out"
              />
            )}
          </motion.div>
          <motion.div className="lg:order-1 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-6 leading-snug">
              From a Vision to Your <span className="text-emerald-600">Perfect Retreat</span>
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-4">
              Our journey began over two decades ago with a simple, yet profound dream: to create a sanctuary where the majesty of Nathia  Gali mountains meets unparalleled comfort. Born from a love for this serene landscape, Holiday Resort Hotel was meticulously designed not just as a place to stay, but as an experience to cherish.
            </p>
            <p className="text-md md:text-lg leading-relaxed text-gray-600">
              Every stone laid, every view framed, and every service offered, reflects our commitment to harmonizing luxury with nature&lsquo;s tranquility. We invite you to step into a legacy of hospitality where every visit feels like coming home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Murree Essence */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-10" >
            Where Nathia Gali Charm <span className="text-emerald-600">Comes Alive</span>
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {three && (
              <motion.div className="order-2 lg:order-1">
                <Image
                 src={three}
                  alt="Nathia Gali Natural Beauty"
                   width={400}
  height={300}
  unoptimized
                  className="rounded-xl shadow-2xl object-cover w-full h-72 md:h-96 max-w-full transform hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </motion.div>
            )}
            <motion.div className="order-1 lg:order-2 text-center lg:text-left">
              <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-4">
                More than just a location, Nathia Gali is an integral part of your Rivage Cottage Resort Nathia Gali experience. We celebrate its misty mornings, the whispering pines, and the invigorating mountain air. Our architecture and ambiance are designed to seamlessly blend with the natural surroundings, offering breathtaking views from every window.
              </p>
              <p className="text-md md:text-lg leading-relaxed text-gray-600">
                Immerse yourself in the local culture, explore scenic trails, or simply unwind on our terraces, soaking in the serene beauty that only Nathi Gali can offer. At Rivage Cottage Resort, Nathia Gali isn&lsquo;t just outside your door; it&lsquo;s part of your stay.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Promise: What Makes Us Unique */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-800 mb-12">
          The <span className="text-emerald-600">Rivage Cottage Resort</span> Promise
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
           <motion.div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center border-t-4 border-indigo-500" 
          >
            <Mountain className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Panoramic Serenity</h4>
            <p className="text-gray-700">
              Wake up to stunning vistas and let the crisp mountain air rejuvenate your soul. Every room is a window NathiaGali  majestic beauty.
            </p>
          </motion.div>
          <motion.div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center border-t-4 border-indigo-500" 
          >
            <HeartHandshake className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Heartfelt Hospitality</h4>
            <p className="text-gray-700">
              Experience warmth and genuine care from a team dedicated to anticipating your needs and making your stay effortless.
            </p>
          </motion.div>
          <motion.div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center border-t-4 border-indigo-500" >
            <Stars className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Unforgettable Moments</h4>
            <p className="text-gray-700">
              From exquisite dining to curated local experiences, we craft memories that linger long after you&lsquo;ve left our hills.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action/Invitation */}
      <section className="bg-indigo-700 text-white py-16 md:py-24 text-center">
        <motion.div className="container mx-auto px-4" >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Your Nathia Gali Story Starts Here.
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Discover the magic of Nathia Gali, enhanced by the comfort and authentic charm of Rivage Cottage Resort. We are ready to welcome you.
          </p>
          <Link
            href="/allrooms" 
            className="inline-block bg-emerald-400 text-indigo-900 font-bold py-4 px-10 rounded-full shadow-xl hover:bg-emerald-300 hover:scale-105 transition-all duration-300 ease-in-out text-lg uppercase tracking-wide"
          >
            Explore Our Rooms
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default AboutUs;
