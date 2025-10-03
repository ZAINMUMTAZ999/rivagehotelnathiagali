import FAQSection from "./components/FAQs";
import GetallReviews from "./components/GetallReviews";
import GetHeroImageHomepage from "./components/GetHeroImage";
import HotelServicesSection from "./components/HotelServices";
export default function Home() {
  return (
  <section className="mt-0 overflow-hidden bg-white">

      {/* <HeroSection/> */}
      <GetHeroImageHomepage />

    
      <HotelServicesSection/>

        <h1 className="flex justify-center text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-gray-900">
          <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent inline-block">

            Customer&apos;s Reviews
          </span>
        </h1>
    
      
      <GetallReviews/>
      <FAQSection/>
       
      <section className="bg-white py-12 md:py-16 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl" >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-800 mb-8">
            Our Location 
          </h2>
  
          <div className="w-full max-w-4xl mx-auto">
            <div className="relative w-full h-96 md:h-[450px] rounded-lg overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16331.505839226038!2d73.07451985!3d33.73100910000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbf7769d89d8d%3A0x5d6d89877331b187!2sF-6%2C%20Islamabad!5e1!3m2!1sen!2s!4v1759513124803!5m2!1sen!2s"

                className="absolute top-0 left-0 w-full h-full border-0 touch-auto"

                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Arcadian Resort Nathia Gali  Location"
                style={{ pointerEvents: 'auto' }}
              />
            </div>
            <p className="text-center text-sm text-gray-600 mt-3 md:hidden">
              Use two fingers to zoom and pan the map
            </p>
          </div>
        </div>
      </section>
     
    </section>
  );
};

