import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
        <div>
          <h3 className="text-lg font-bold mb-2">LinguaVeda</h3>
          <p>Bridging ancient wisdom with modern learning technology.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Courses</h4>
          <ul>
            <li>Sanskrit Basics</li>
            <li>Nepali Conversation</li>
            <li>Devanagari Script</li>
            <li>Cultural Studies</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Support</h4>
          <ul>
            <li>Help Center</li>
            <li>Community</li>
            <li>Contact Us</li>
            <li>Bug Reports</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Company</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Privacy</li>
            <li>Terms</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8 text-gray-400 text-sm">
        © 2024 LinguaVeda. All rights reserved. Made with ❤️ for language learners.
      </div>
    </footer>
  );
};

export default Footer;
