import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ExpandingCards, CardItem } from './ui/expanding-cards';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '../context/ContentContext';

gsap.registerPlugin(ScrollTrigger);

type Category = "All Sectors" | "Healthcare" | "Lifestyle & Tech" | "Events & Orgs";

interface CaseStudy extends CardItem {
  category: Category;
}

const caseStudies: CaseStudy[] = [
  {
    id: "medinova",
    title: "Chatkhil Medinova General Hospital",
    description: "Social Media • Content • Anthem",
    category: "Healthcare",
    imgSrc: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&auto=format&fit=crop&q=60",
    linkHref: "https://example.com/medinova",
    icon: <span className="font-mono text-xs uppercase tracking-wider text-white">Hospital - Noakhali</span>,
  },
  {
    id: "rainbow",
    title: "Rainbow Hospital",
    description: "Digital Strategy • Content Production",
    category: "Healthcare",
    imgSrc: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=900&auto=format&fit=crop&q=60",
    linkHref: "https://example.com/rainbow",
    icon: <span className="font-mono text-xs uppercase tracking-wider text-white">Hospital - Chandpur</span>,
  },
  {
    id: "richpark",
    title: "Rich Park Menswear",
    description: "E-commerce Ads • Product Shoot",
    category: "Lifestyle & Tech",
    imgSrc: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=900&auto=format&fit=crop&q=60",
    linkHref: "https://example.com/richpark",
    icon: <span className="font-mono text-xs uppercase tracking-wider text-white">Menswear Brand</span>,
  },
  {
    id: "oviluxe",
    title: "Oviluxe",
    description: "Visual Identity • Growth Hacking",
    category: "Lifestyle & Tech",
    imgSrc: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=900&auto=format&fit=crop&q=60",
    linkHref: "https://example.com/oviluxe",
    icon: <span className="font-mono text-xs uppercase tracking-wider text-white">Premium Apparel</span>,
  },
  {
    id: "ssf",
    title: "SSF Marathon 2025 & 2026",
    description: "Event Branding • Digital Buzz • Registration",
    category: "Events & Orgs",
    imgSrc: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&auto=format&fit=crop&q=60",
    linkHref: "https://example.com/ssf",
    icon: <span className="font-mono text-xs uppercase tracking-wider text-white">National Sports Event</span>,
  },
  {
    id: "sajeda",
    title: "Sajeda Dental Care",
    description: "Branding • Social Media Presence",
    category: "Healthcare",
    imgSrc: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=900&auto=format&fit=crop&q=60",
    linkHref: "https://example.com/sajeda",
    icon: <span className="font-mono text-xs uppercase tracking-wider text-white">Dental Care</span>,
  },
  {
    id: "arabian",
    title: "Arabian World",
    description: "Premium Lifestyle Marketing",
    category: "Lifestyle & Tech",
    imgSrc: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&auto=format&fit=crop&q=60",
    linkHref: "https://example.com/arabian",
    icon: <span className="font-mono text-xs uppercase tracking-wider text-white">Luxury Boutique</span>,
  },
  {
    id: "sweetworld",
    title: "Sweet World",
    description: "Product Launch Campaigns",
    category: "Lifestyle & Tech",
    imgSrc: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=900&auto=format&fit=crop&q=60",
    linkHref: "https://example.com/sweetworld",
    icon: <span className="font-mono text-xs uppercase tracking-wider text-white">Confectionery & Goods</span>,
  },
  {
    id: "nroot",
    title: "Nroot Bangladesh",
    description: "Corporate Branding • Inbound Strategy",
    category: "Lifestyle & Tech",
    imgSrc: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&auto=format&fit=crop&q=60",
    linkHref: "https://example.com/nroot",
    icon: <span className="font-mono text-xs uppercase tracking-wider text-white">Tech Solutions</span>,
  },
];

const categories: Category[] = ["All Sectors", "Healthcare", "Lifestyle & Tech", "Events & Orgs"];

export function TrustedBy() {
  const { content } = useContent();
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("All Sectors");

  const projects = content.projects;
  const caseStudies = useMemo(() => {
    return projects.list.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      category: item.category as Category,
      imgSrc: item.imgSrc,
      linkHref: item.linkHref,
      icon: <span className="font-mono text-xs uppercase tracking-wider text-white">{item.iconText}</span>
    }));
  }, [projects.list]);

  const filteredCaseStudies = useMemo(() => {
    if (activeCategory === "All Sectors") return caseStudies;
    return caseStudies.filter(study => study.category === activeCategory);
  }, [activeCategory, caseStudies]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        const elements = headerRef.current.querySelectorAll('.stagger-text');
        if (elements && elements.length > 0) {
          gsap.fromTo(elements,
            { y: 30, autoAlpha: 0 },
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
      }
      
      const contentWrapper = containerRef.current.querySelector('.content-wrapper');
      if (contentWrapper) {
         gsap.fromTo(contentWrapper,
          { y: 50, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
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

  return (
    <section id="projects" ref={containerRef} className="py-16 md:py-20 lg:py-24 bg-black text-[#EBEBEB] w-full border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        
        <div ref={headerRef} className="flex flex-col items-center justify-center text-center gap-6 mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, scale: 1.2, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "0px" }}
            className="text-[10vw] md:text-[80px] lg:text-[100px] font-bold uppercase tracking-tighter leading-[0.85] text-white"
          >
            {projects.heading}
          </motion.h2>
          
          <p className="stagger-text invisible mt-4 max-w-2xl text-lg md:text-[20px] font-medium text-white/50 leading-relaxed">
            {projects.subtitle}
          </p>

          <div className="stagger-text invisible mt-8 flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-brand text-white shadow-[0_0_20px_rgba(201,100,66,0.3)]"
                    : "bg-white/5 text-white blur-none border border-white/10 hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="content-wrapper invisible w-full flex justify-center">
            <div className="w-full">
                {filteredCaseStudies.length > 0 ? (
                    <ExpandingCards
                      key={activeCategory} // Reset ExpandingCards state when category changes
                      items={filteredCaseStudies}
                      defaultActiveIndex={0}
                    />
                ) : (
                    <div className="flex h-[400px] items-center justify-center text-white/50">
                        No case studies found for this category.
                    </div>
                )}
            </div>
        </div>
        
      </div>
    </section>
  );
}
