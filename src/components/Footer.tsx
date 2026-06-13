import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin
} from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "./ui/hover-footer";

export function Footer() {
  // Footer link data
  const footerLinks = [
    {
      title: "Services",
      links: [
        { label: "Social Media App & Web", href: "#" },
        { label: "Motion & Graphic Design", href: "#" },
        { label: "Video Ads & Anthem", href: "#" },
        { label: "Branding & Visual", href: "#" },
      ],
    },
    {
      title: "Helpful Links",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        {
          label: "Live Chat",
          href: "mailto:solarainfo2024@gmail.com",
          pulse: true,
        },
      ],
    },
  ];

  // Social media icons
  const socialLinks = [
    { icon: <Facebook size={20} />, label: "Facebook", href: "https://www.facebook.com/thesolarabd" },
    { icon: <Instagram size={20} />, label: "Instagram", href: "https://www.instagram.com/solarabd" },
    { icon: <Twitter size={20} />, label: "Twitter / X", href: "https://x.com/solara_official" },
    { icon: <Youtube size={20} />, label: "Youtube", href: "https://www.youtube.com/@SolaraBD" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://www.linkedin.com/company/solarabd" },
  ];

  return (
    <footer className="bg-black relative h-fit rounded-t-[40px] overflow-hidden mt-8 border-t border-white/5 shadow-[0_-20px_40px_rgba(201,100,66,0.05)]">
      <div className="max-w-7xl mx-auto p-10 md:p-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-brand text-3xl font-extrabold">
                ❁
              </span>
              <span className="text-white text-3xl font-bold tracking-tight">SOLARA</span>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Solara Squad - A modern digital agency crafting experiences that leave lasting impressions.
            </p>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-lg font-semibold mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative w-fit">
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-brand transition-colors"
                    >
                      {link.label}
                    </a>
                    {link.pulse && (
                      <span className="absolute top-0 -right-4 w-2 h-2 rounded-full bg-brand animate-pulse"></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="border-t border-white/10 my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0 text-white/60">
          {/* Social icons */}
          <div className="flex space-x-6 text-white/60">
            {socialLinks.map(({ icon, label, href }) => (
               <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-brand transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Solara Squad. All rights reserved.
          </p>
        </div>
      </div>

      {/* Text hover effect */}
      <div className="lg:flex hidden h-[18rem] md:h-[22rem] -mt-10 md:-mt-24 pointer-events-auto">
        <TextHoverEffect text="SOLARA" className="z-50" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}
