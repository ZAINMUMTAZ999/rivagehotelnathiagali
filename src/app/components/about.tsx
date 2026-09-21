"use client";

import { Mountain, HeartHandshake, Stars } from "lucide-react";

import one from "../assets/p1.jpeg";
import two from "../assets/p2.jpeg";
import three from "../assets/p3.jpeg";

import Image from "next/image";
import Link from "next/link";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen text-gray-800">

      {/* Hero */}
      <div className="relative h-72 sm:h-80 md:h-96 lg:h-[500px]">
        <Image
          src={one}
          alt="Rivage Cottage Resort"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-center">

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight drop-shadow-2xl max-w-6xl">
            Our Story: A Legacy in the{" "}
            <span className="text-emerald-300">
              Heart of Nathia Gali
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white mt-4 sm:mt-5 max-w-3xl leading-relaxed">
            More than a hotel, we are a destination woven into the very fabric
            of Nathia Gali charm.
          </p>

        </div>
      </div>

      {/* The Origin Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16 lg:py-24">

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-center">

          {/* Image */}
          <div className="lg:order-2">
            <Image
              src={two}
              alt="Our Origin Story at Holiday Resort Hotel"
              className="rounded-xl shadow-2xl object-cover w-full h-64 sm:h-72 md:h-96 lg:h-[450px]"
            />
          </div>

          {/* Text */}
          <div className="lg:order-1 text-center lg:text-left">

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-800 mb-5 sm:mb-6 leading-snug">
              From a Vision to Your{" "}
              <span className="text-emerald-600">
                Perfect Retreat
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 mb-4">
              Our journey began over two decades ago with a simple, yet
              profound dream: to create a sanctuary where the majesty of Nathia
              Gali mountains meets unparalleled comfort. Born from a love for
              this serene landscape, Holiday Resort Hotel was meticulously
              designed not just as a place to stay, but as an experience to
              cherish.
            </p>

            <p className="text-base sm:text-lg leading-relaxed text-gray-600">
              Every stone laid, every view framed, and every service offered,
              reflects our commitment to harmonizing luxury with nature&apos;s
              tranquility. We invite you to step into a legacy of hospitality
              where every visit feels like coming home.
            </p>

          </div>
        </div>
      </section>

      {/* Nathia Gali Essence */}
      <section className="bg-white py-10 sm:py-12 md:py-16 lg:py-24">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center">

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-800 mb-8 sm:mb-10 md:mb-12">
            Where Hotel Charm{" "}
            <span className="text-emerald-600">
              Comes Alive
            </span>
          </h2>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-center">

            {/* Image */}
            <div className="order-2 lg:order-1">
              <Image
                src={three}
                alt="Nathia Gali Natural Beauty"
                width={800}
                height={600}
                className="rounded-xl shadow-2xl object-cover w-full h-64 sm:h-72 md:h-96 lg:h-[450px]"
              />
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2 text-center lg:text-left">

              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 mb-4">
                More than just a location, Nathia Gali is an integral part of
                your hotel experience. We celebrate its misty mornings, the
                whispering pines, and the invigorating mountain air. Our
                architecture and ambiance are designed to seamlessly blend
                with the natural surroundings, offering breathtaking views
                from every window.
              </p>

              <p className="text-base sm:text-lg leading-relaxed text-gray-600">
                Immerse yourself in the local culture, explore scenic trails,
                or simply unwind on our terraces, soaking in the serene beauty
                that only Nathia Gali can offer. At Rivage Cottage Resort,
                Nathia Gali isn&apos;t just outside your door; it&apos;s part
                of your stay.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* Hotel Promise */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16 lg:py-24">

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-indigo-800 mb-8 sm:mb-10 md:mb-12">
          The{" "}
          <span className="text-emerald-600">
            Hotel
          </span>{" "}
          Promise
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

          {/* Card 1 */}
          <div className="bg-white p-5 sm:p-6 md:p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center border-t-4 border-indigo-500">

            <Mountain className="h-10 w-10 sm:h-12 sm:w-12 text-indigo-600 mx-auto mb-4" />

            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              Panoramic Serenity
            </h4>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Wake up to stunning vistas and let the crisp mountain air
              rejuvenate your soul. Every room is a window to Nathia Gali&apos;s
              majestic beauty.
            </p>

          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 sm:p-6 md:p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center border-t-4 border-indigo-500">

            <HeartHandshake className="h-10 w-10 sm:h-12 sm:w-12 text-indigo-600 mx-auto mb-4" />

            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              Heartfelt Hospitality
            </h4>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Experience warmth and genuine care from a team dedicated to
              anticipating your needs and making your stay effortless.
            </p>

          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 sm:p-6 md:p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center border-t-4 border-indigo-500">

            <Stars className="h-10 w-10 sm:h-12 sm:w-12 text-indigo-600 mx-auto mb-4" />

            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              Unforgettable Moments
            </h4>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              From exquisite dining to curated local experiences, we craft
              memories that linger long after you&apos;ve left our hills.
            </p>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="text-black py-10 sm:py-12 md:py-16 lg:py-20 text-center">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Your Nathia Gali Story Starts Here.
          </h2>

          <p className="text-base sm:text-lg md:text-xl mb-7 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
            Discover the magic of Nathia Gali, enhanced by the comfort and
            authentic charm of Rivage Cottage Resort. We are ready to welcome
            you.
          </p>

          <Link
            href="/allrooms"
            className="inline-flex items-center justify-center bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 sm:py-4 px-7 sm:px-10 rounded-full shadow-xl transition-colors duration-300 text-sm sm:text-base md:text-lg uppercase tracking-wide"
          >
            Explore Our Rooms
          </Link>

        </div>
      </section>

    </div>
  );
};

export default AboutUs;