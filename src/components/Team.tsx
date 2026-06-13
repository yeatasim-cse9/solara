import React, { useRef, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { 
  Users,
  Briefcase,
  Share2,
  PenTool,
  Lightbulb
} from "lucide-react";
import { CardStack, CardStackItem } from "./ui/card-stack";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContent } from "../context/ContentContext";

gsap.registerPlugin(ScrollTrigger);

interface TeamMember extends CardStackItem {
  icon: React.ReactNode;
}

const teamMembers: TeamMember[] = [
  {
    id: "01",
    title: "Jafor Sadek",
    tag: "Head of Operations",
    description: "Driving operational excellence and team velocity.",
    imageSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&auto=format&fit=crop&q=60",
    icon: <Briefcase size={24} className="text-white/80" />,
  },
  {
    id: "02",
    title: "Samir Al Mahmud",
    tag: "Head of Creative",
    description: "Crafting narratives that leave lasting impressions.",
    imageSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&auto=format&fit=crop&q=60",
    icon: <Lightbulb size={24} className="text-white/80" />,
  },
  {
    id: "03",
    title: "Md Murshedul Islam",
    tag: "Social Media",
    description: "Building communities and digital momentum.",
    imageSrc: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=900&q=60",
    icon: <Share2 size={24} className="text-white/80" />,
  },
  {
    id: "04",
    title: "Mohammad Fahad Hossain",
    tag: "Creative Exec",
    description: "Designing the visual language of tomorrow.",
    imageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&auto=format&fit=crop&q=60",
    icon: <PenTool size={24} className="text-white/80" />,
  },
  {
    id: "05",
    title: "Tapshe Kalam Tanha",
    tag: "Creative Exec",
    description: "Executing pixel-perfect brand experiences.",
    imageSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&auto=format&fit=crop&q=60",
    icon: <PenTool size={24} className="text-white/80" />,
  },
];

export function Team() {
  const { content } = useContent();
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const team = content.team;
  const teamMembers = useMemo(() => {
    return team.list.map(member => {
      let icon = <Briefcase size={24} className="text-white/80" />;
      if (member.tag.toLowerCase().includes("creative")) {
        icon = <PenTool size={24} className="text-white/80" />;
      } else if (member.tag.toLowerCase().includes("social")) {
        icon = <Share2 size={24} className="text-white/80" />;
      } else if (member.title.includes("Samir")) {
        icon = <Lightbulb size={24} className="text-white/80" />;
      }
      return {
        id: member.id,
        title: member.title,
        tag: member.tag,
        description: member.description,
        imageSrc: member.imageSrc,
        icon: icon
      };
    });
  }, [team.list]);

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

      // Header text animations
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
      
      const cardsWrapper = containerRef.current.querySelector('.cards-wrapper');
      if (cardsWrapper) {
         gsap.fromTo(cardsWrapper,
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
    <section ref={containerRef} className="py-16 md:py-20 lg:py-24 text-[#EBEBEB] w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div ref={headerRef} className="flex flex-col items-center justify-center text-center gap-6 mb-12 md:mb-16">
          <div className="stagger-text invisible w-fit">
            <p className="text-white/40 font-mono text-sm tracking-[0.2em] uppercase">
              The Architects
            </p>
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, rotateX: 90, z: -100 }}
            whileInView={{ opacity: 1, rotateX: 0, z: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            viewport={{ once: true, margin: "0px" }}
            className="text-[10vw] md:text-[80px] lg:text-[100px] font-bold uppercase tracking-tighter leading-[0.85] text-white"
          >
            {team.heading}
          </motion.h2>
          
          <p className="stagger-text invisible mt-4 max-w-2xl text-lg md:text-[20px] font-medium text-white/50 leading-relaxed">
            {team.subtitle}
          </p>
        </div>
        
        <div className="cards-wrapper invisible w-full flex justify-center">
            <div className="w-full max-w-5xl">
                <CardStack
                  items={teamMembers}
                  initialIndex={0}
                  autoAdvance={true}
                  intervalMs={3000}
                  pauseOnHover={true}
                  showArrows={true}
                  cardWidth={340}
                  cardHeight={400}
                  renderCard={(item: any, state) => (
                    <div className="relative h-full w-full">
                      <div className="absolute inset-0">
                        {item.imageSrc ? (
                          <img
                            src={item.imageSrc}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                            draggable={false}
                            loading="eager"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-white/5 text-sm text-white/50">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl flex items-center justify-center border border-white/10">
                            {item.icon}
                          </div>
                          {item.tag && (
                            <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-mono tracking-widest text-white uppercase backdrop-blur-md border border-white/10">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <div className="truncate text-xl md:text-2xl font-medium tracking-tight text-white mb-2">
                          {item.title}
                        </div>
                        {item.description ? (
                          <div className="line-clamp-2 text-[15px] text-white/70">
                            {item.description}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  )}
                />
            </div>
        </div>
      </div>
    </section>
  );
}
