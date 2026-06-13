import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '../context/ContentContext';

gsap.registerPlugin(ScrollTrigger);

function AnimatedNumber({ value, suffix, isString, theme = "light" }: { value: number | string, suffix: string, isString?: boolean, theme?: "light" | "dark" }) {
  const ref = useRef<HTMLSpanElement>(null);
  const colorClass = theme === "dark" ? "text-black" : "text-white";

  useEffect(() => {
    if (!ref.current) return;
    
    if (isString) {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          if (ref.current) ref.current.textContent = (value as string) + suffix;
        }
      });
      return;
    }

    gsap.fromTo(ref.current, 
      { textContent: "0" },
      {
        textContent: value as number,
        duration: 2.5,
        ease: "power3.out",
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
        onUpdate: function() {
          if (ref.current) {
            ref.current.textContent = this.targets()[0].textContent + suffix;
          }
        }
      }
    );
  }, [value, suffix, isString]);

  return <span ref={ref} className={`font-bold inline-block tabular-nums ${colorClass}`}>{!isString ? "0" + suffix : ""}</span>;
}

export function About() {
  const { content } = useContent();
  const containerRef = useRef<HTMLElement>(null);
  const headerGroupRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const about = content.about;
  const pillars = about.pillars;

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

      // Header text animation
      const headers = headerGroupRef.current?.querySelectorAll('.stagger-header');
      if (headers && headers.length > 0) {
         gsap.fromTo(headers,
           { y: 50, autoAlpha: 0 },
           {
             y: 0,
             autoAlpha: 1,
             duration: 0.8,
             stagger: 0.15,
             ease: "power3.out",
             scrollTrigger: {
               trigger: containerRef.current,
               start: "top 80%",
               once: true,
             }
           }
         );
      }

      const textEls = headerGroupRef.current?.querySelectorAll('.stagger-text');
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
      
      const gridItems = gridRef.current?.querySelectorAll('.stagger-grid');
      if (gridItems && gridItems.length > 0) {
         gsap.fromTo(gridItems,
           { y: 40, autoAlpha: 0 },
           {
             y: 0,
             autoAlpha: 1,
             duration: 0.8,
             stagger: 0.1,
             ease: "power2.out",
             scrollTrigger: {
               trigger: gridRef.current,
               start: "top 75%",
               once: true,
             }
           }
         );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-16 md:py-20 lg:py-24 text-[#EBEBEB] w-full overflow-hidden border-t border-white/5 bg-[#050505]">
       <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
          <div ref={headerGroupRef} className="flex flex-col lg:flex-row lg:items-stretch gap-12 lg:gap-20 xl:gap-24 mb-16 md:mb-20">
             {/* Intro Content */}
             <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <motion.h2 
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true, margin: "0px" }}
                  className="text-[10vw] md:text-[80px] lg:text-[100px] font-bold uppercase tracking-tighter leading-[0.85] text-white mb-8 sm:mb-12"
                >
                  {about.heading} <span className="text-brand">{about.headingHighlight}</span>
                </motion.h2>
                <div className="flex flex-col gap-6 stagger-text opacity-0">
                   <p className="text-white/70 text-lg sm:text-xl lg:text-2xl leading-[1.6] font-medium max-w-xl">
                     {about.paragraph1}
                   </p>
                   <p className="text-white/60 text-base sm:text-lg lg:text-xl leading-[1.6] max-w-xl">
                     {about.paragraph2}
                   </p>
                   <div className="mt-8">
                     <a href="#about" className="text-sm tracking-[0.2em] uppercase font-mono text-white pb-2 border-b-2 border-white/40 hover:text-brand hover:border-brand transition-colors inline-block font-bold">
                       {about.linkText}
                     </a>
                   </div>
                </div>
             </div>
             
             {/* Image */}
             <div className="w-full lg:w-1/2">
                <div className="w-full h-[400px] sm:h-[500px] lg:h-full min-h-[500px] xl:min-h-[600px] rounded-[32px] overflow-hidden bg-white/5 border border-white/10 relative stagger-text opacity-0">
                  <img 
                    src={about.imageUrl} 
                    alt="Our Team" 
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#050505]/40 to-transparent pointer-events-none" />
                </div>
             </div>
          </div>
          
          {/* Bento Grid */}
          <div ref={gridRef} className="border border-white/10 flex flex-col w-full relative">
             {/* Top Row */}
             <div className="flex flex-col md:flex-row border-b border-white/10 group">
               <div className="w-full md:w-1/3 p-8 lg:p-12 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-end min-h-[280px] md:min-h-[320px] hover:bg-white/[0.02] transition-colors duration-500 stagger-grid opacity-0">
                 <span className="text-white/50 text-xs md:text-sm font-mono tracking-widest uppercase mb-4 block">{about.stats[0].label}</span>
                 <div className="text-[100px] lg:text-[120px] font-bold tracking-tighter leading-none text-white">
                    <AnimatedNumber value={about.stats[0].value} suffix={about.stats[0].suffix} theme="light" />
                 </div>
               </div>
               <div className="w-full md:w-2/3 p-8 lg:p-12 relative min-h-[280px] md:min-h-[320px] flex items-center hover:bg-white/[0.02] transition-colors duration-500 stagger-grid opacity-0">
                 <span className="absolute top-6 left-6 text-white/20 font-mono text-xs">01</span>
                 <h3 className="text-3xl sm:text-4xl lg:text-[50px] font-medium leading-[1.2] text-white tracking-tight max-w-4xl">
                   We Build Brands That Last with <span className="text-brand">Creative Excellence</span> and <span className="text-brand">Data-Driven Strategy</span>
                 </h3>
               </div>
             </div>

             {/* Middle Row */}
             <div className="flex flex-col md:flex-row border-b border-white/10">
                <div className="w-full md:w-1/3 min-h-[280px] md:min-h-[320px] bg-[#f4f4f5] text-black p-8 lg:p-12 relative flex flex-col justify-end border-b md:border-b-0 md:border-r border-white/10 hover:bg-white transition-colors duration-500 stagger-grid opacity-0">
                   <span className="absolute top-6 left-6 text-black/20 font-mono text-xs">02</span>
                   <span className="text-black/50 text-xs md:text-sm font-mono tracking-widest uppercase mb-4 block">{about.stats[1].label}</span>
                   <div className="text-[100px] lg:text-[120px] font-bold tracking-tighter leading-none text-black">
                      <AnimatedNumber value={about.stats[1].value} suffix={about.stats[1].suffix} theme="dark" />
                   </div>
                </div>
                <div className="w-full md:w-1/3 min-h-[280px] md:min-h-[320px] p-8 lg:p-12 relative flex flex-col justify-end border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/[0.02] transition-colors duration-500 stagger-grid opacity-0">
                   <span className="absolute top-6 left-6 text-white/20 font-mono text-xs">03</span>
                   <span className="text-white/50 text-xs md:text-sm font-mono tracking-widest uppercase mb-4 block">{about.stats[2].label}</span>
                   <div className="text-[100px] lg:text-[120px] font-bold tracking-tighter leading-none text-white">
                      <AnimatedNumber value={about.stats[2].value} suffix={about.stats[2].suffix} theme="light" />
                   </div>
                </div>
                <div className="w-full md:w-1/3 min-h-[280px] md:min-h-[320px] p-8 lg:p-12 relative flex flex-col justify-end hover:bg-white/[0.02] transition-colors duration-500 stagger-grid opacity-0 bg-[#0a0a0a]">
                   <span className="absolute top-6 left-6 text-white/20 font-mono text-xs">04</span>
                   <span className="text-white/50 text-xs md:text-sm font-mono tracking-widest uppercase mb-4 block">{about.stats[3].label}</span>
                   <div className="text-[100px] lg:text-[120px] font-bold tracking-tighter leading-none uppercase text-white">
                      <AnimatedNumber value={about.stats[3].value} suffix={about.stats[3].suffix} isString={about.stats[3].isString} theme="light" />
                   </div>
                </div>
             </div>
             
             {/* Bottom Row - Pillars */}
             <div className="flex flex-col sm:flex-row items-center justify-between p-8 lg:p-12 gap-8 hover:bg-white/[0.02] transition-colors duration-500 stagger-grid opacity-0">
                <span className="text-white/50 text-xs md:text-sm font-mono tracking-widest uppercase shrink-0">Core Pillars</span>
                <div className="flex flex-wrap items-center justify-end gap-x-8 gap-y-4 font-medium text-white/80">
                  {pillars.map((pillar: string, idx: number) => (
                    <span key={idx} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-brand/50 rounded-full relative"><span className="absolute inset-0 bg-brand blur-[2px] animate-pulse"></span></span>
                      {pillar}
                    </span>
                  ))}
                </div>
             </div>
          </div>
       </div>
    </section>
  );
}
