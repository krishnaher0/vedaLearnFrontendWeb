import React from "react";
import {
  FaGlobe,
  FaYoutube,
  FaBookOpen,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-200 pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">VedLingo</h3>
          <p className="text-sm">
            Bridging ancient wisdom with modern technology. Learn heritage
            languages in an immersive, intuitive way.
          </p>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://www.duolingo.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-400 transition"
              >
                Duolingo
              </a>
            </li>
            <li>
              <a
                href="https://www.memrise.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-400 transition"
              >
                Memrise
              </a>
            </li>
            <li>
              <a
                href="https://www.livelingua.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-400 transition"
              >
                LiveLingua
              </a>
            </li>
            <li>
              <a
                href="https://omniglot.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-400 transition"
              >
                Omniglot (Writing Systems)
              </a>
            </li>
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-green-400 transition">
                All Courses
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-400 transition">
                Grammar Guides
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-400 transition">
                Vocabulary Packs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-400 transition">
                Cultural Stories
              </a>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Connect with Us</h4>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-400 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://youtube.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-red-500 transition"
            >
              <FaYoutube />
            </a>
          </div>
          <p className="text-xs mt-3 text-gray-400">
            Join our growing language learning community!
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        © 2024 <span className="text-white font-medium">VedLingo</span>. All rights reserved.
        Made with ❤️ for language learners.
      </div>
    </footer>
  );
};

export default Footer;
