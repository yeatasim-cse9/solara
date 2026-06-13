import React from 'react';
import { Mail, Phone, Globe, Facebook, Instagram, Linkedin, Twitter, Youtube, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useContent } from '../context/ContentContext';

export function Contact() {
  const { content } = useContent();
  const contact = content.contact;
  return (
    <section id="contact" className="py-16 md:py-20 lg:py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        <div className="flex flex-col items-center justify-center text-center gap-6 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-fit"
          >
            <p className="text-white/40 font-mono text-sm tracking-[0.2em] uppercase">
              {contact.subtitle}
            </p>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, letterSpacing: "-0.1em", y: -40 }}
            whileInView={{ opacity: 1, letterSpacing: "-0.05em", y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "0px" }}
            className="text-[10vw] md:text-[80px] lg:text-[100px] font-bold uppercase tracking-tighter leading-[0.85] text-white"
          >
            {contact.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 max-w-2xl text-lg md:text-[20px] font-medium text-white/50 leading-relaxed"
          >
            {contact.description}
          </motion.p>
        </div>

        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto">
          
          {/* Form Box */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-[#111] border border-white/5 rounded-2xl md:rounded-[32px] p-6 md:p-12 mb-12"
          >
            <h3 className="text-2xl font-bold text-white mb-8">Send a Message</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Your Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70" htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/50 transition-all text-sm"
                  />
                </div>
                {/* Email Address */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70" htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email address"
                    className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/50 transition-all text-sm"
                  />
                </div>
                {/* Contact Number */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70" htmlFor="phone">Contact Number / WhatsApp</label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Your contact number"
                    className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/50 transition-all text-sm"
                  />
                </div>
                {/* Business Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70" htmlFor="business">Business / Organization Name</label>
                  <input
                    type="text"
                    id="business"
                    placeholder="Your business name"
                    className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/50 transition-all text-sm"
                  />
                </div>
                {/* Service Needed */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70" htmlFor="service">Service Needed</label>
                  <select
                    id="service"
                    defaultValue=""
                    className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/50 transition-all text-sm"
                  >
                    <option value="" disabled>Select a service</option>
                    <option value="social">Social Media</option>
                    <option value="content">Content Creation</option>
                    <option value=" branding">Branding & Design</option>
                    <option value="ads">Paid Advertising</option>
                    <option value="web">Web Development</option>
                  </select>
                </div>
                {/* Estimated Budget */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70" htmlFor="budget">Estimated Monthly Budget</label>
                  <select
                    id="budget"
                    defaultValue=""
                    className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/50 transition-all text-sm"
                  >
                    <option value="" disabled>Select a budget</option>
                    <option value="<1k">Under $1,000</option>
                    <option value="1k-5k">$1,000 - $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value=">10k">$10,000+</option>
                  </select>
                </div>
              </div>

              {/* Tell us about your project */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70" htmlFor="message">Tell us about your project (Goals & Timeline...)</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Write something..."
                  className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/50 transition-all text-sm resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="button"
                  className="group inline-flex items-center gap-2 bg-brand text-white px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-brand transition-all duration-300 w-full sm:w-auto justify-center"
                >
                  SEND PROPOSAL REQUEST
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </motion.div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-[#111] border border-white/5 rounded-2xl p-6 flex flex-col gap-4 hover:border-white/20 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Email us</h4>
                <a href={`mailto:${contact.email}`} className="text-white/60 text-sm hover:text-brand transition-colors">
                  {contact.email}
                </a>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-[#111] border border-white/5 rounded-2xl p-6 flex flex-col gap-4 hover:border-white/20 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Give us a call</h4>
                <a href={`tel:${contact.phone}`} className="text-white/60 text-sm hover:text-brand transition-colors">
                  {contact.phone}
                </a>
              </div>
            </motion.div>

            {/* Website/Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-[#111] border border-white/5 rounded-2xl p-6 flex flex-col gap-4 hover:border-white/20 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Visit us</h4>
                <a href={contact.website.startsWith('http') ? contact.website : `https://${contact.website}`} target="_blank" rel="noopener noreferrer" className="text-white/60 text-sm hover:text-brand transition-colors mb-3 block">
                  {contact.website}
                </a>
                <div className="flex items-center gap-3">
                  <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-brand transition-colors"><Facebook className="w-4 h-4" /></a>
                  <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-brand transition-colors"><Instagram className="w-4 h-4" /></a>
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-brand transition-colors"><Linkedin className="w-4 h-4" /></a>
                  <a href={contact.twitter} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-brand transition-colors"><Twitter className="w-4 h-4" /></a>
                  <a href={contact.youtube} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-brand transition-colors"><Youtube className="w-4 h-4" /></a>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
