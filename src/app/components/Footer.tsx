import { Facebook, Mail, Phone } from 'lucide-react';
import Link from 'next/link';



const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-12 mt-20" >
      <div className="max-w-7xl mx-auhref px-4 grid grid-cols-1 md:grid-cols-4 gap-8 container mx-auto">
        {/* Brand */}
        <div>

            <span className="text-xl sm:text-xl font-bold text-white">
                <b>
                  ArcadianResort
                  </b>
              
              </span>
          <p className="text-sm  text-white">
           Full-service accommodation set in a scenic location, offering lodging plus on-site leisure, recreation, and dining amenities for a complete vacation experience.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm underline text-purple-100  ">
            <li><Link href="/" className="hover:text-white  underline  hover:text-red-400">Resort</Link></li>
            <li><Link href="/allrooms" className="hover:text-white">Rooms</Link></li>
            {/* <li><Link href="/cloudSolutions" className="hover:text-white">Gallery</Link></li> */}
            {/* <li><Link href="/digitalmarketing" className="hover:text-white">Reviews</Link></li> */}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4">ArcadianResort</h3>
          <ul className="space-y-2 text-sm text-purple-100 underline">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            {/* <li><Link href="/allBlogs" className="hover:text-white">Blogs</Link></li> */}
            <li><Link href="/contact" className="hover:text-white  mt-5 ">Contact</Link></li>
          </ul>
        </div>

        {/* Social + Contact */}
      <div>
  <h3 className="text-lg font-semibold mb-4 text-white">Connect with Us</h3>
  
  {/* --- Social Media Links --- */}
  <div className="flex space-x-4 mb-4 text-white">
    <a href="https://www.facebook.com/share/1BLECe8ZMb" target="_blank" rel="noopener noreferrer" className="hover:text-white"><Facebook size={20} /></a>
    {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><Twitter size={20} /></a> */}
    {/* <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><Instagram size={20} /></a> */}
    {/* <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><Linkedin size={20} /></a> */}
  </div>

  {/* --- Clickable Email and Phone with Icons --- */}
   <div className="space-y-2">
      {/* Clickable Email with Icon */}
      <span
        // href="mailhref:mzainmumtaz99@gmail.com"
        className="text-sm text-black flex items-center group"
      >
        <Mail size={16} className="mr-2 flex-shrink-0 text-white group-hover:text-white transition-colors" />
        {/* <span className="group-hover:underline group-hover:text-white transition-colors">
          mzainmumtaz99@gmail.com
        </span> */}

<a
  href="mailhref:mzainmumtaz99@gmail.com"
  className="group-hover:underline text-white group-hover:text-white transition-colors underline  hover:text-red-400"
>
  awaissardar944@gmail.com
</a>

      </span>

      {/* Clickable Phone with Icon */}
      <a
        href="tel:+92 328 9330350"
        className="text-sm text-white flex items-center group underline  hover:text-red-400"
      >
        <Phone size={16} className="mr-2 flex-shrink-0 text-gray-600 group-hover:text-white transition-colors" />
        <span className="group-hover:underline group-hover:text-white transition-colors">
          +92328-9330350
        </span>
      </a>
    </div>
</div>
      </div>

      {/* Bothrefm Line */}
      <div className="mt-12  border-purple-700 pt-6 text-center text-sm text-white">
        &copy; {new Date().getFullYear()} ArcadianResort. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
