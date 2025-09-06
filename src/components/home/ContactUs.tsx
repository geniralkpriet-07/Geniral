import React from "react";
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from "lucide-react";

const ContactUs: React.FC = () => {
  return (
    <footer className="relative bg-[rgba(20,20,50,0.5)] border-t border-[rgba(255,255,255,0.1)]">
      {/* Wave Divider */}
      <div className="absolute -top-1 left-0 w-full overflow-hidden leading-[0] z-0">
        <svg
          className="relative block w-full h-16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(20,20,50,0.5)" 
            d="M0,224L48,208C96,192,192,160,288,133.3C384,107,480,85,576,96C672,107,768,149,864,165.3C960,181,1056,171,1152,170.7C1248,171,1344,181,1392,186.7L1440,192L1440,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="py-16 max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          Contact{" "}
          <span className="bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent">
            Us
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {/* Contact Info */}
          <div className="space-y-6 text-white/80">
            <p className="text-lg">
              Have questions or want to collaborate? Reach out to us anytime.
            </p>
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-blue-400" />
              <span>ramyagobi2005@example.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-blue-400" />
              <span>+91 95972 63619</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-blue-400" />
              <span>Department of CSE, KPRIET , Coimbatore</span>
            </div>

            {/* Social Icons */}
            <div className="flex gap-6 mt-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-blue-400 transition"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-blue-400 transition"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-blue-400 transition"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="mailto:ramyagobi2005@example.com"
                className="text-white/70 hover:text-blue-400 transition"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form
            action="https://formspree.io/f/your-form-id"
            method="POST"
            className="bg-[rgba(255,255,255,0.05)] rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-[rgba(128,128,255,0.1)] space-y-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full p-3 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.2)] text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full p-3 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.2)] text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              name="message"
              rows={4}
              placeholder="Your Message"
              required
              className="w-full p-3 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.2)] text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Copyright */}
        <p className="text-center text-white/60 text-sm">
          © {new Date().getFullYear()} Department of CSE. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default ContactUs;

