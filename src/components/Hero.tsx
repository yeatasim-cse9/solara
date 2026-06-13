import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { TextEffect } from './ui/text-effect';
import { WovenCanvas } from './ui/woven-light-hero';
import { useContent } from '../context/ContentContext';

export function Hero() {
  const { content } = useContent();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#050505] text-white overflow-hidden pb-20 pt-20">
      {/* Top gradient to blend seamlessly with the navbar */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-transparent pointer-events-none z-10" />

      {/* Interactive Background */}
      <div className="absolute inset-0 z-0 opacity-40">
         <WovenCanvas />
      </div>
      
      {/* Subtle radial glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-brand/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col items-center text-center mt-10">
        <TextEffect
          per="word"
          as="h1"
          className="font-bold text-[clamp(40px,8vw,110px)] tracking-tighter leading-[0.9] max-w-[1100px] uppercase font-sans text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/60 pb-4 text-glow"
          variants={{
            container: {
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 },
              },
            },
            item: {
              hidden: {
                opacity: 0,
                y: 60,
                rotateX: -20,
                scale: 0.95
              },
              visible: {
                opacity: 1,
                y: 0,
                rotateX: 0,
                scale: 1,
                transition: {
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            },
          }}
        >
          {content.hero.title}
        </TextEffect>
        
        <TextEffect
          per="word"
          preset="blur"
          delay={0.4}
          className="mt-6 md:mt-8 text-base sm:text-lg md:text-2xl text-white/50 max-w-3xl font-medium tracking-tight leading-relaxed"
        >
          {content.hero.subtitle}
        </TextEffect>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 sm:mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:w-auto px-4 sm:px-0 w-full"
        >
          <a 
            href="#projects"
            className="group w-full sm:w-auto btn-solid-brand text-[15px]"
          >
            Start a Project
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a 
            href="#services"
            className="w-full sm:w-auto btn-glass text-[15px]"
          >
            Our Services
          </a>
        </motion.div>
      </div>
    </section>
  );
}
