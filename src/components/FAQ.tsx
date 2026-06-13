import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';
import { useContent } from '../context/ContentContext';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "Do you only work with healthcare brands?",
    answer: "While we specialize and excel in the healthcare sector (hospitals, clinics, and diagnostic centers), we also partner with select clients in retail, real estate, education, and tech."
  },
  {
    question: "What is included in the monthly report?",
    answer: "Our monthly reports include detailed metrics on reach, engagement, conversion rates, and ROI. We also provide a strategic breakdown of what worked, what can be improved, and the plan for the upcoming month."
  },
  {
    question: "Do I need to sign a long-term contract?",
    answer: "We recommend a minimum 3-month commitment to see tangible growth and optimization results, but our packages operate on a month-to-month basis with no strict lock-in."
  },
  {
    question: "Who will be handling my account?",
    answer: "You will have a dedicated account manager and access to our team of specialized content creators, strategists, and performance marketers."
  },
  {
    question: "Are ad budgets included in the pricing?",
    answer: "No, the package prices cover our management and creative services. The ad budget (Google Ads, Facebook Ads, etc.) is separate and decided based on your specific goals and capacity."
  }
];

export function FAQ() {
  const { content } = useContent();
  const containerRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faq = content.faq;
  const faqs = faq.list;

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

      const items = containerRef.current?.querySelectorAll('.faq-item');
      if (items && items.length > 0) {
        gsap.fromTo(items,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" ref={containerRef} className="py-16 md:py-20 lg:py-24 bg-[#080808] text-[#EBEBEB] w-full border-b border-white/5 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-col items-center justify-center text-center gap-4 mb-12 md:mb-16">
          <span className="text-white/40 font-mono text-sm tracking-[0.2em] uppercase">
            {faq.subtitle}
          </span>
          <h2 className="text-[10vw] md:text-[80px] lg:text-[100px] font-bold uppercase tracking-tighter leading-[0.85] text-white">
            {faq.heading}
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="faq-item invisible bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden transition-colors hover:bg-white/[0.04]"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left px-6 py-6 md:px-8 flex justify-between items-center focus:outline-none"
                >
                  <span className="font-semibold text-lg md:text-xl pr-8 text-white/90">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="shrink-0 text-white/50"
                  >
                    <Plus size={24} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 md:px-8 text-white/60 leading-relaxed text-base md:text-lg">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
