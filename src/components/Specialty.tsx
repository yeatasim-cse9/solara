import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '../context/ContentContext';

gsap.registerPlugin(ScrollTrigger);

export function Specialty() {
  const { content } = useContent();
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const specialty = content.specialty;
  const coreFocus = specialty.coreFocus;
  const targetSectors = specialty.targetSectors;

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const textEls = containerRef.current?.querySelectorAll('.stagger-text');
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
      
      const cardEls = containerRef.current?.querySelectorAll('.stagger-card');
      if (cardEls && cardEls.length > 0) {
         gsap.fromTo(cardEls,
           { y: 40, autoAlpha: 0 },
           {
             y: 0,
             autoAlpha: 1,
             duration: 0.8,
             stagger: 0.1,
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

  const headingWords = specialty.heading.split(" ");

  return (
    <section id="specialty" ref={containerRef} className="py-16 md:py-20 lg:py-24 bg-[#080808] text-[#EBEBEB] w-full border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div ref={headerRef} className="flex flex-col items-center justify-center text-center gap-6 mb-16 md:mb-24">
          <div className="stagger-text invisible w-fit">
            <p className="text-white/40 font-mono text-sm tracking-[0.2em] uppercase">
              Our Specialty
            </p>
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "0px" }}
            className="text-[10vw] md:text-[80px] lg:text-[100px] font-bold uppercase tracking-tighter leading-[0.85] text-white"
          >
            {headingWords[0]} {headingWords.length > 1 && <><br className="hidden md:block"/> {headingWords.slice(1).join(" ")}</>}
          </motion.h2>
          
          <p className="stagger-text invisible mt-4 max-w-2xl text-lg md:text-[20px] font-medium text-white/50 leading-relaxed">
            {specialty.subtitle1}
          </p>
          <p className="stagger-text invisible max-w-2xl text-base md:text-lg font-medium text-white/40 leading-relaxed">
            {specialty.subtitle2}
          </p>
        </div>

        {/* Bento Grid layout for niches */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full mt-12">
          {/* Core Focus Area */}
          <div className="stagger-card invisible flex flex-col justify-between bg-white/[0.02] border border-white/5 rounded-3xl p-8 lg:p-12 hover:bg-white/[0.04] transition-colors relative h-full">
            <div className="mb-12 relative z-10">
              <span className="text-brand font-mono text-sm tracking-widest uppercase mb-4 block">Dominant Niche</span>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase mt-2">
                Core Focus
              </h3>
            </div>
            
            <ul className="flex flex-col gap-4 relative z-10">
              {coreFocus.map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-white/70 font-medium text-lg lg:text-xl group">
                  <span className="w-2 h-2 rounded-full bg-brand group-hover:scale-150 transition-transform"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Other Sectors */}
          <div className="stagger-card invisible flex flex-col justify-between bg-[#111] border border-white/5 rounded-3xl p-8 lg:p-12 hover:bg-white/[0.02] transition-colors relative h-full">
            <div className="mb-12 relative z-10">
              <span className="text-white/40 font-mono text-sm tracking-widest uppercase mb-4 block">Flexibility</span>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase mt-2">
                More Sectors
              </h3>
            </div>
            
            <ul className="flex flex-col gap-4 relative z-10">
              {targetSectors.map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-white/50 font-medium text-lg lg:text-xl group hover:text-white/80 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white/60 transition-colors"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
