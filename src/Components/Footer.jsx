import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        
        {/* Brand Section */}
        <div>
          <div className="flex items-center space-x-3">
            <img
              src="/img/logo3.jpg" // your MediSaathi logo here
              alt="MediSaathi"
              className="w-12 h-12 rounded-full"
            />
            <h2 className="text-xl font-bold text-white">MediSaathi</h2>
          </div>
          <p className="mt-3 text-sm text-gray-400">
            Your trusted healthcare companion bringing accessible medical 
            services to rural communities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/home" className="hover:text-blue-400">Home</a></li>
            <li><a href="/about" className="hover:text-blue-400">About Us</a></li>
            <li><a href="/services" className="hover:text-blue-400">Services</a></li>
            <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
          <p className="flex items-center space-x-2">
            <FaPhoneAlt className="text-blue-400" />
            <span>+91 98765 43210</span>
          </p>
          <p className="text-gray-400 mt-2 text-sm">
            Available 24/7 for emergency medical support and queries.
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Stay Connected</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-400"><FaInstagram /></a>
          </div>
          <p className="mt-3 text-sm text-gray-400">
            Join our mission to make healthcare accessible for all.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MediSaathi. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
