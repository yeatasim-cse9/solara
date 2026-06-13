import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';
import { useContent } from '../context/ContentContext';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Basic",
    title: "ESSENTIAL CARE PACKAGE",
    price: "6,999",
    features: [
      "7 Branded Visual & Patient-Engagement Posts",
      "Facebook Page Management",
      "1 Doctor Video + 1 Reels with Thumbnail & Subtitle",
      "Reputation Build-Up Strategy",
      "Basic Inbox & Comment Management",
      "1 Cover Design (Every 3 Months)",
      "Monthly Report & Consultation",
      "Boosting Setup (budget separate)",
    ],
    highlight: false,
  },
  {
    name: "Premium",
    title: "CARE ELITE PACKAGE",
    price: "23,999",
    features: [
      "25 Branded Visual & Patient-Engagement Posts",
      "Facebook Page Management",
      "4 Professional Videos + 4 Reels (On-spot video shoot, Thumbnail & Subtitle)",
      "Reputation Build-Up Strategy",
      "Full Facebook & Google Ads Management",
      "Inbox & Comment Management (active support)",
      "1 Cover Design (Every 3 Months)",
      "Customized Content Calendar",
      "Monthly Consultation & Strategic Report",
      "Boosting Setup (budget separate)",
      "Advanced Campaign Strategy",
      "24 Hour dedicated support",
    ],
    highlight: true,
  },
  {
    name: "Standard",
    title: "GROWTH PLUS PACKAGE",
    price: "16,999",
    features: [
      "14 Branded Visual & Patient-Engagement Posts",
      "Facebook Page Management",
      "3 Professional Videos + 1 Reels (On-spot video shoot - local area, Thumbnail & Subtitle)",
      "Reputation Build-Up Strategy",
      "Facebook & Google Ads Management",
      "Inbox & Comment Management (active support)",
      "1 Cover Design (Every 3 Months)",
      "Customized Content Calendar",
      "Monthly Report & Consultation",
      "Boosting Setup (budget separate)",
    ],
    highlight: false,
  }
];

export function Pricing() {
  const { content } = useContent();
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const pricing = content.pricing;
  const plans = pricing.list;

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Main section fade in and slide up
      gsap.fromTo(containerRef.current,
        { autoAlpha: 0, y: 60 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          }
        }
      );

      const textEls = containerRef.current?.querySelectorAll('.pricing-stagger-text');
      if (textEls && textEls.length > 0) {
        gsap.fromTo(textEls,
           { y: 30, autoAlpha: 0 },
           {
             y: 0,
             autoAlpha: 1,
             duration: 0.8,
             stagger: 0.1,
             ease: "power2.out",
             scrollTrigger: {
               trigger: containerRef.current,
               start: "top 70%",
               once: true,
             }
           }
         );
      }
      
      const cardEls = containerRef.current?.querySelectorAll('.pricing-stagger-card');
      if (cardEls && cardEls.length > 0) {
         gsap.fromTo(cardEls,
           { y: 40, autoAlpha: 0 },
           {
             y: 0,
             autoAlpha: 1,
             duration: 0.8,
             stagger: 0.15,
             ease: "power2.out",
             scrollTrigger: {
               trigger: containerRef.current,
               start: "top 60%",
               once: true,
             }
           }
         );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const headingWords = pricing.heading.split(" ");

  return (
    <section id="pricing" ref={containerRef} className="py-16 md:py-20 lg:py-24 bg-[#050505] text-[#EBEBEB] w-full border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div ref={headerRef} className="flex flex-col items-center justify-center text-center gap-6 mb-16 md:mb-24">
          <div className="pricing-stagger-text invisible w-fit">
             <span className="text-white/40 font-mono text-sm tracking-[0.2em] uppercase">
                Flexible Plans
             </span>
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "0px" }}
            className="text-[10vw] md:text-[80px] lg:text-[100px] font-bold uppercase tracking-tighter leading-[0.85] text-white"
          >
            {headingWords.slice(0, Math.ceil(headingWords.length / 2)).join(" ")} <br className="hidden md:block"/> {headingWords.slice(Math.ceil(headingWords.length / 2)).join(" ")}
          </motion.h2>
          
          <p className="pricing-stagger-text invisible mt-4 max-w-2xl text-lg md:text-[20px] font-medium text-white/50 leading-relaxed">
            {pricing.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 w-full items-stretch">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`pricing-stagger-card invisible flex flex-col justify-between rounded-3xl p-8 lg:p-10 transition-colors relative ${
                plan.highlight 
                  ? "bg-[#111] border border-brand/40 shadow-[0_0_40px_rgba(201,100,66,0.15)]" 
                  : "bg-white/[0.02] border border-white/5 hover:bg-white/[0.04]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className={`font-mono text-sm tracking-widest uppercase ${plan.highlight ? 'text-brand' : 'text-white/40'}`}>
                    {plan.name}
                  </span>
                  {plan.highlight && (
                    <span className="px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-medium tracking-wide uppercase">
                      Recommended
                    </span>
                  )}
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-white uppercase mb-4 h-16 flex items-start">
                  {plan.title}
                </h3>

                <div className="mb-8">
                  <span className="text-4xl lg:text-5xl font-bold text-white tracking-tighter">৳{plan.price}</span>
                  <span className="text-white/40 font-medium ml-2 uppercase text-sm tracking-widest">/ Month</span>
                </div>
                
                <div className="w-full h-px bg-white/5 mb-8"></div>
                
                <ul className="flex flex-col gap-4">
                  {plan.features.map((feature, idx) => {
                    if (!feature.trim()) return null;
                    return (
                      <li key={idx} className="flex items-start gap-4">
                        <div className={`mt-1 rounded-full p-0.5 shrink-0 ${plan.highlight ? 'bg-brand/20 text-brand' : 'bg-white/10 text-white/60'}`}>
                          <Check size={14} strokeWidth={3} />
                        </div>
                        <span className={`text-base lg:text-lg leading-snug font-medium ${plan.highlight ? 'text-white/80' : 'text-white/60'}`}>
                          {feature}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              
              <div className="mt-12">
                 <button className={`w-full py-4 rounded-xl flex items-center justify-center text-sm font-semibold tracking-wider uppercase transition-all ${
                   plan.highlight 
                    ? "bg-brand text-white hover:bg-[#b35636]" 
                    : "bg-white/5 text-white hover:bg-white/10"
                 }`}>
                   Get Started
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
