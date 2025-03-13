import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div>
        <img src="/img/logo.png" alt="logo" className="h-20 mx-auto" />
      </div>
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved.
        </p>
        <nav className="mt-2">
          <a
            href="/privacy-policy"
            className="text-gray-400 hover:text-white mx-2"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className="text-gray-400 hover:text-white mx-2"
          >
            Terms of Service
          </a>
          <a href="/contact" className="text-gray-400 hover:text-white mx-2">
            Contact Us
          </a>
        </nav>
      </div>
    </footer>
    // <footer className="bg-gray-900 text-white py-10">
    //   <div className="max-w-7xl mx-auto px-4 grid grid-cols-3 md:grid-cols-3 gap-6">
    //     {/* Company Info */}
    //     <div>
    //       <h3 className="text-lg font-semibold">WhatsAd</h3>
    //       <div>
    //         <img src="/img/logo.png" alt="logo" className="h-20 mx-auto" />{" "}
    //       </div>
    //       <p className="text-sm mt-2">
    //         Connecting businesses with WhatsApp influencers.
    //       </p>
    //     </div>

    //     {/* Quick Links */}
    //     <div>
    //       <h3 className="text-lg font-semibold">Quick Links</h3>
    //       <ul className="mt-2 space-y-1">
    //         <li>
    //           <a href="#" className="hover:text-gray-400">
    //             About Us
    //           </a>
    //         </li>
    //         <li>
    //           <a href="#" className="hover:text-gray-400">
    //             Services
    //           </a>
    //         </li>
    //         <li>
    //           <a href="#" className="hover:text-gray-400">
    //             Pricing
    //           </a>
    //         </li>
    //         <li>
    //           <a href="#" className="hover:text-gray-400">
    //             Contact
    //           </a>
    //         </li>
    //       </ul>
    //     </div>

    //     {/* Contact Info */}
    //     <div>
    //       <h3 className="text-lg font-semibold">Contact Us</h3>
    //       <p className="text-sm mt-2">Email: support@yourcompany.com</p>
    //       <p className="text-sm">Phone: +123 456 7890</p>
    //     </div>
    //   </div>

    //   <div className="text-center text-sm mt-6 border-t border-gray-700 pt-4">
    //     &copy; {new Date().getFullYear()} WhatsAd. All rights reserved.
    //   </div>
    // </footer>
  );
};

export default Footer;
