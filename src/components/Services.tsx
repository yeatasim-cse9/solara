import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { useContent } from '../context/ContentContext';
import * as THREE from 'three';
import {
  Share2,
  PenTool,
  Layout,
  Target,
  Video,
  Users,
  Code,
  LineChart,
  ArrowRight
} from 'lucide-react';
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
  useHoverSliderContext
} from './ui/animated-slideshow';

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  id: string;
  title: string;
  icon: React.ElementType;
  desc: string;
  image: string;
}

function HoverSliderText({ slide, index }: { slide: ServiceItem, index: number }) {
  const { activeSlide } = useHoverSliderContext();
  const isActive = activeSlide === index;

  return (
    <div
      className={`absolute inset-x-0 bottom-0 p-8 lg:p-12 transition-all duration-700 pointer-events-none hidden lg:block ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <p className="text-white font-medium text-lg lg:text-3xl max-w-lg mb-2 tracking-tight">{slide.title}</p>
      <p className="text-white/70 font-medium text-sm lg:text-base max-w-md">{slide.desc}</p>
    </div>
  );
}

const servicesList: ServiceItem[] = [
  {
    id: '01',
    title: 'Social Media',
    icon: Share2,
    desc: 'Strategic content planning, publishing, and community management across platforms.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2874&auto=format&fit=crop'
  },
  {
    id: '02',
    title: 'Content Creation',
    icon: PenTool,
    desc: 'Compelling copy, visuals, and multimedia content crafted for your target audience.',
    image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1500&auto=format&fit=crop'
  },
  {
    id: '03',
    title: 'Branding & Design',
    icon: Layout,
    desc: 'Visual identity systems, brand guidelines, and unforgettable creative assets.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '04',
    title: 'Paid Advertising',
    icon: Target,
    desc: 'High-ROI ad campaigns on Meta, Google, and beyond, built for maximum conversion.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop'
  },
  {
    id: '05',
    title: 'Video & Media',
    icon: Video,
    desc: 'Reels, anthems, testimonials, and motion graphics that tell your story with impact.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2940&auto=format&fit=crop'
  },
  {
    id: '06',
    title: 'Influencer Marketing',
    icon: Users,
    desc: 'Strategic influencer partnerships that amplify your brand\'s reach authentically.',
    image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=2940&auto=format&fit=crop'
  },
  {
    id: '07',
    title: 'Web Development',
    icon: Code,
    desc: 'Modern, responsive websites and landing pages engineered to convert visitors into customers.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2944&auto=format&fit=crop'
  },
  {
    id: '08',
    title: 'Data Analytics',
    icon: LineChart,
    desc: 'Transparent data dashboards and monthly reports that show exactly where your growth is coming from.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop'
  },
];

function ServicesCanvas({ activeIndex }: { activeIndex: number | null }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    const geometry = new THREE.IcosahedronGeometry(2, 2);
    const pos = geometry.attributes.position;
    const originalPos = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count * 3; i++) {
      originalPos[i] = pos.array[i];
    }

    const material = new THREE.MeshStandardMaterial({
      color: '#C96442',
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    let animationFrameId: number;
    let time = 0;

    const target = {
      rotationSpeed: 0.002,
      scale: 1,
      opacity: 0.15
    };
    const current = { ...target };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += current.rotationSpeed;

      if (activeIndex !== null) {
        target.rotationSpeed = 0.01;
        target.scale = 1.1;
        target.opacity = 0.25;
      } else {
        target.rotationSpeed = 0.002;
        target.scale = 1;
        target.opacity = 0.15;
      }

      current.rotationSpeed += (target.rotationSpeed - current.rotationSpeed) * 0.05;
      current.scale += (target.scale - current.scale) * 0.05;
      current.opacity += (target.opacity - current.opacity) * 0.05;

      mesh.scale.set(current.scale, current.scale, current.scale);
      material.opacity = current.opacity;

      for (let i = 0; i < pos.count; i++) {
        const x = originalPos[i * 3];
        const y = originalPos[i * 3 + 1];
        const z = originalPos[i * 3 + 2];

        const noise = Math.sin(x * 2 + time * 5) * Math.cos(y * 2 + time * 5) * 0.2;
        pos.setXYZ(i, x + x * noise, y + y * noise, z + z * noise);
      }
      pos.needsUpdate = true;

      mesh.rotation.x = time * 0.5;
      mesh.rotation.y = time;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.forceContextLoss();
      renderer.dispose();
    };
  }, [activeIndex]);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none opacity-50" />;
}

export function Services() {
  const { content } = useContent();
  const containerRef = useRef<HTMLElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = content.services;
  const servicesList = services.list;

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
      if (titleContainerRef.current) {
        const titleElements = titleContainerRef.current.querySelectorAll('.stagger-title');
        if (titleElements && titleElements.length > 0) {
          gsap.fromTo(titleElements,
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

      // Cards staggered reveal
      if (cardsRef.current) {
        if (cardsRef.current) {
          gsap.fromTo(cardsRef.current,
            { y: 50, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 75%",
                once: true,
              }
            }
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={containerRef} aria-labelledby="services-heading" className="relative py-16 md:py-20 lg:py-24 bg-[#050505] text-[#EBEBEB] w-full border-y border-white/5 overflow-hidden">
      <ServicesCanvas activeIndex={hoveredIndex} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10">

        {/* Top Header Section */}
        <div className="flex flex-col justify-center gap-6 mb-12 max-w-3xl">
          <div ref={titleContainerRef} className="flex flex-col justify-center gap-6">

            <motion.div
              className="stagger-title invisible w-fit"
            >
              <p className="text-white/40 font-mono text-sm tracking-[0.2em] uppercase">
                What We Do
              </p>
            </motion.div>

            <motion.h2
              id="services-heading"
              initial={{ opacity: 0, x: -100, rotate: -5 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.9, type: "spring", bounce: 0.3 }}
              viewport={{ once: true, margin: "0px" }}
              className="text-[10vw] md:text-[80px] lg:text-[100px] font-bold uppercase tracking-tighter leading-[0.85] text-white"
            >
              {services.heading}
            </motion.h2>

            <p className="stagger-title invisible text-white/50 text-base md:text-lg lg:text-[20px] font-medium leading-relaxed mt-4 max-w-2xl">
              {services.subtitle}
            </p>

            <div className="stagger-title invisible flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8 w-full">
              <a
                href="#contact"
                className="group w-full sm:w-auto btn-solid-brand text-[15px]"
              >
                Book a Free Call
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#projects"
                className="w-full sm:w-auto btn-glass text-[15px]"
              >
                See Projects
              </a>
            </div>
          </div>
        </div>

        {/* Services Hover Slider */}
        <div ref={cardsRef} className="mt-16 lg:mt-32">
          <HoverSlider className="w-full flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-16">
            <div className="flex flex-col justify-between w-full lg:w-[45%] xl:w-[40%] gap-4 lg:gap-0 lg:py-6">
              {servicesList.map((slide, index) => (
                <div key={slide.id} className="border-b border-white/10 lg:border-none pb-4 lg:pb-0">
                  <TextStaggerHover
                    index={index}
                    className="cursor-pointer text-4xl sm:text-5xl lg:text-[40px] xl:text-[48px] font-bold tracking-tighter text-white/50 hover:text-white transition-colors leading-[1.3]"
                    text={slide.title}
                  />
                  <div className="lg:hidden text-white/50 text-sm mt-3 lg:mt-0 font-medium leading-relaxed pr-8">
                    {slide.desc}
                  </div>
                </div>
              ))}
            </div>
            <HoverSliderImageWrap className="w-full lg:w-[55%] xl:w-[60%] h-[450px] sm:h-[550px] md:h-[600px] lg:h-auto lg:min-h-[640px] xl:min-h-[720px] rounded-[32px] overflow-hidden shadow-2xl relative border border-white/10">
              {servicesList.map((slide, index) => (
                <div key={slide.id} className="relative w-full h-full">
                  <HoverSliderImage
                    index={index}
                    imageUrl={slide.image}
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover origin-center scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Subtle info on hover for desktop */}
                  <HoverSliderText slide={slide} index={index} />
                </div>
              ))}
            </HoverSliderImageWrap>
          </HoverSlider>
        </div>
      </div>
    </section>
  );
}
