
import { Facebook, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8 sm:py-10 md:py-12 mt-12 md:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">

        {/* Brand */}
        <div>
          <span className="text-xl font-bold text-white">
            HotelWebApp
          </span>

          <p className="text-sm text-white mt-3 leading-relaxed">
            Full-service accommodation set in a scenic location, offering
            lodging plus on-site leisure, recreation, and dining amenities
            for a complete vacation experience.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Services
          </h3>

          <ul className="space-y-2 text-sm text-purple-100">
            <li>
              <Link
                href="/"
                className="underline hover:text-red-400 transition-colors"
              >
                Resort
              </Link>
            </li>

            <li>
              <Link
                href="/allrooms"
                className="hover:text-red-400 transition-colors"
              >
                Rooms
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            HotelWebApp
          </h3>

          <ul className="space-y-2 text-sm text-purple-100">
            <li>
              <Link
                href="/about"
                className="hover:text-red-400 transition-colors"
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className="hover:text-red-400 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social + Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Connect with Us
          </h3>

          {/* Social Media */}
          <div className="flex space-x-4 mb-5">
            <a
              href="https://www.facebook.com/share/1BLECe8ZMb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-400 transition-colors"
            >
              <Facebook size={20} />
            </a>
          </div>

          {/* Contact */}
          <div className="space-y-3">

            {/* Email */}
            <a
              href="mailto:mzainmumtaz99@gmail.com"
              className="text-sm text-white flex items-center group underline hover:text-red-400 transition-colors break-all"
            >
              <Mail
                size={16}
                className="mr-2 flex-shrink-0 text-white"
              />

              <span>
                mzainmumtaz99@gmail.com
              </span>
            </a>

            {/* Phone */}
            <a
              href="tel:+923246288217"
              className="text-sm text-white flex items-center group underline hover:text-red-400 transition-colors"
            >
              <Phone
                size={16}
                className="mr-2 flex-shrink-0 text-white"
              />

              <span>
                +92324-6288217
              </span>
            </a>

          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-10 md:mt-12 border-t border-purple-700 pt-5 md:pt-6 text-center text-xs sm:text-sm text-white">
        &copy; {new Date().getFullYear()} HotelWebApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;


// import { Facebook, Mail, Phone } from 'lucide-react';
// import Link from 'next/link';



// const Footer = () => {
//   return (
//     <footer className="bg-blue-900 text-white py-12 mt-20" >
//       <div className="max-w-7xl mx-auhref px-4 grid grid-cols-1 md:grid-cols-4 gap-8 container mx-auto">
//         {/* Brand */}
//         <div>

//             <span className="text-xl sm:text-xl font-bold text-white">
//                 <b>
//                   HotelWebApp
//                   </b>
              
//               </span>
//           <p className="text-sm  text-white">
//            Full-service accommodation set in a scenic location, offering lodging plus on-site leisure, recreation, and dining amenities for a complete vacation experience.
//           </p>
//         </div>

//         {/* Services */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4">Services</h3>
//           <ul className="space-y-2 text-sm underline text-purple-100  ">
//             <li><Link href="/" className="hover:text-white  underline  hover:text-red-400">Resort</Link></li>
//             <li><Link href="/allrooms" className="hover:text-white">Rooms</Link></li>
//             {/* <li><Link href="/cloudSolutions" className="hover:text-white">Gallery</Link></li> */}
//             {/* <li><Link href="/digitalmarketing" className="hover:text-white">Reviews</Link></li> */}
//           </ul>
//         </div>

//         {/* Company */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4">HotelWebApp</h3>
//           <ul className="space-y-2 text-sm text-purple-100 underline">
//             <li><Link href="/about" className="hover:text-white">About Us</Link></li>
//             {/* <li><Link href="/allBlogs" className="hover:text-white">Blogs</Link></li> */}
//             <li><Link href="/contact" className="hover:text-white  mt-5 ">Contact</Link></li>
//           </ul>
//         </div>

//         {/* Social + Contact */}
//       <div>
//   <h3 className="text-lg font-semibold mb-4 text-white">Connect with Us</h3>
  
//   {/* --- Social Media Links --- */}
//   <div className="flex space-x-4 mb-4 text-white">
//     <a href="https://www.facebook.com/share/1BLECe8ZMb" target="_blank" rel="noopener noreferrer" className="hover:text-white"><Facebook size={20} /></a>
//     {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><Twitter size={20} /></a> */}
//     {/* <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><Instagram size={20} /></a> */}
//     {/* <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><Linkedin size={20} /></a> */}
//   </div>

//   {/* --- Clickable Email and Phone with Icons --- */}
//    <div className="space-y-2">
//       {/* Clickable Email with Icon */}
//       <span
//         // href="mailhref:mzainmumtaz99@gmail.com"
//         className="text-sm text-black flex items-center group"
//       >
//         <Mail size={16} className="mr-2 flex-shrink-0 text-white group-hover:text-white transition-colors" />
//         {/* <span className="group-hover:underline group-hover:text-white transition-colors">
//           mzainmumtaz99@gmail.com
//         </span> */}

// <a
//   href="mailhref:mzainmumtaz99@gmail.com"
//   className="group-hover:underline text-white group-hover:text-white transition-colors underline  hover:text-red-400"
// >
//   mzainmumtaz99@gmail.com
// </a>

//       </span>

//       {/* Clickable Phone with Icon */}
//       <a
//         href="tel:+92 328 9330350"
//         className="text-sm text-white flex items-center group underline  hover:text-red-400"
//       >
//         <Phone size={16} className="mr-2 flex-shrink-0 text-gray-600 group-hover:text-white transition-colors" />
//         <span className="group-hover:underline group-hover:text-white transition-colors">
//           +92324-6288217
//         </span>
//       </a>
//     </div>
// </div>
//       </div>

//       {/* Bothrefm Line */}
//       <div className="mt-12  border-purple-700 pt-6 text-center text-sm text-white">
//         &copy; {new Date().getFullYear()} HotelWebApp. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;
