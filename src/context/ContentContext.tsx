import React, { createContext, useContext, useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

// Define TypeScript interfaces for the dynamic landing page content
export interface LandingPageContent {
  hero: {
    title: string;
    subtitle: string;
  };
  about: {
    heading: string;
    headingHighlight: string;
    paragraph1: string;
    paragraph2: string;
    linkText: string;
    imageUrl: string;
    stats: Array<{
      id: string;
      label: string;
      value: number | string;
      suffix: string;
      isString?: boolean;
    }>;
    pillars: string[];
  };
  services: {
    heading: string;
    subtitle: string;
    list: Array<{
      id: string;
      title: string;
      desc: string;
      image: string;
    }>;
  };
  specialty: {
    heading: string;
    subtitle1: string;
    subtitle2: string;
    coreFocus: string[];
    targetSectors: string[];
  };
  projects: {
    heading: string;
    subtitle: string;
    list: Array<{
      id: string;
      title: string;
      description: string;
      category: string;
      imgSrc: string;
      linkHref: string;
      iconText: string;
    }>;
  };
  team: {
    heading: string;
    subtitle: string;
    list: Array<{
      id: string;
      title: string;
      tag: string;
      description: string;
      imageSrc: string;
    }>;
  };
  pricing: {
    heading: string;
    subtitle: string;
    list: Array<{
      name: string;
      title: string;
      price: string;
      features: string[];
      highlight: boolean;
    }>;
  };
  faq: {
    subtitle: string;
    heading: string;
    list: Array<{
      question: string;
      answer: string;
    }>;
  };
  contact: {
    subtitle: string;
    heading: string;
    description: string;
    email: string;
    phone: string;
    website: string;
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    youtube: string;
  };
}

// Default/fallback content matching the original site's hardcoded copy
const defaultContent: LandingPageContent = {
  hero: {
    title: "ELEVATING BRANDS TO DIGITAL DOMINANCE",
    subtitle: "We partner with visionary brands to create digital products, campaigns, and identities that command attention."
  },
  about: {
    heading: "About",
    headingHighlight: "Us",
    paragraph1: "Solara is a fully remote digital marketing agency built for the modern era. We combine sharp creative vision with performance-driven strategy to deliver results that move businesses forward.",
    paragraph2: "From healthcare giants to emerging lifestyle brands, we understand that every client needs a unique, commanding voice, and we're here to build it.",
    linkText: "Explore Our Story",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    stats: [
      { id: "01", label: "Campaigns Executed", value: 50, suffix: "+" },
      { id: "02", label: "Clients Served", value: 20, suffix: "+" },
      { id: "03", label: "Remote & Agile", value: 100, suffix: "%" },
      { id: "04", label: "Based In", value: "BD", suffix: "", isString: true }
    ],
    pillars: [
      "Data-Driven Strategy",
      "Healthcare Authority",
      "High-End Aesthetics",
      "Remote Excellence"
    ]
  },
  services: {
    heading: "Services",
    subtitle: "Comprehensive digital solutions tailored to elevate your brand, engage your audience, and drive measurable results across all platforms.",
    list: [
      { 
        id: '01', 
        title: 'Social Media', 
        desc: 'Strategic content planning, publishing, and community management across platforms.',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2874&auto=format&fit=crop'
      },
      { 
        id: '02', 
        title: 'Content Creation', 
        desc: 'Compelling copy, visuals, and multimedia content crafted for your target audience.',
        image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1500&auto=format&fit=crop'
      },
      { 
        id: '03', 
        title: 'Branding & Design', 
        desc: 'Visual identity systems, brand guidelines, and unforgettable creative assets.',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop'
      },
      { 
        id: '04', 
        title: 'Paid Advertising', 
        desc: 'High-ROI ad campaigns on Meta, Google, and beyond, built for maximum conversion.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop'
      },
      { 
        id: '05', 
        title: 'Video & Media', 
        desc: 'Reels, anthems, testimonials, and motion graphics that tell your story with impact.',
        image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2940&auto=format&fit=crop'
      },
      { 
        id: '06', 
        title: 'Influencer Marketing', 
        desc: 'Strategic influencer partnerships that amplify your brand\'s reach authentically.',
        image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=2940&auto=format&fit=crop'
      },
      { 
        id: '07', 
        title: 'Web Development', 
        desc: 'Modern, responsive websites and landing pages engineered to convert visitors into customers.',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2944&auto=format&fit=crop'
      },
      { 
        id: '08', 
        title: 'Data Analytics', 
        desc: 'Transparent data dashboards and monthly reports that show exactly where your growth is coming from.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop'
      }
    ]
  },
  specialty: {
    heading: "Healthcare Experts",
    subtitle1: "While we serve brands across industries, healthcare is where we truly excel. We understand the nuances of hospital branding, patient communication, and medical campaign compliance.",
    subtitle2: "From awareness days to targeted local reach, we create trust-driven campaigns that make hospitals a household name.",
    coreFocus: [
      "Hospitals & Clinics",
      "Diagnostic Centers",
      "Healthcare Brands"
    ],
    targetSectors: [
      "Retail & E-Commerce",
      "Education",
      "Real Estate",
      "F&B",
      "Tech & SaaS"
    ]
  },
  projects: {
    heading: "Trusted By Brands",
    subtitle: "From healthcare giants to emerging lifestyle brands, we partner with visionary teams across all sectors to create digital impact.",
    list: [
      {
        id: "medinova",
        title: "Chatkhil Medinova General Hospital",
        description: "Social Media • Content • Anthem",
        category: "Healthcare",
        imgSrc: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&auto=format&fit=crop&q=60",
        linkHref: "https://example.com/medinova",
        iconText: "Hospital - Noakhali"
      },
      {
        id: "rainbow",
        title: "Rainbow Hospital",
        description: "Digital Strategy • Content Production",
        category: "Healthcare",
        imgSrc: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=900&auto=format&fit=crop&q=60",
        linkHref: "https://example.com/rainbow",
        iconText: "Hospital - Chandpur"
      },
      {
        id: "richpark",
        title: "Rich Park Menswear",
        description: "E-commerce Ads • Product Shoot",
        category: "Lifestyle & Tech",
        imgSrc: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=900&auto=format&fit=crop&q=60",
        linkHref: "https://example.com/richpark",
        iconText: "Menswear Brand"
      },
      {
        id: "oviluxe",
        title: "Oviluxe",
        description: "Visual Identity • Growth Hacking",
        category: "Lifestyle & Tech",
        imgSrc: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=900&auto=format&fit=crop&q=60",
        linkHref: "https://example.com/oviluxe",
        iconText: "Premium Apparel"
      },
      {
        id: "ssf",
        title: "SSF Marathon 2025 & 2026",
        description: "Event Branding • Digital Buzz • Registration",
        category: "Events & Orgs",
        imgSrc: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&auto=format&fit=crop&q=60",
        linkHref: "https://example.com/ssf",
        iconText: "National Sports Event"
      },
      {
        id: "sajeda",
        title: "Sajeda Dental Care",
        description: "Branding • Social Media Presence",
        category: "Healthcare",
        imgSrc: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=900&auto=format&fit=crop&q=60",
        linkHref: "https://example.com/sajeda",
        iconText: "Dental Care"
      },
      {
        id: "arabian",
        title: "Arabian World",
        description: "Premium Lifestyle Marketing",
        category: "Lifestyle & Tech",
        imgSrc: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&auto=format&fit=crop&q=60",
        linkHref: "https://example.com/arabian",
        iconText: "Luxury Boutique"
      },
      {
        id: "sweetworld",
        title: "Sweet World",
        description: "Product Launch Campaigns",
        category: "Lifestyle & Tech",
        imgSrc: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=900&auto=format&fit=crop&q=60",
        linkHref: "https://example.com/sweetworld",
        iconText: "Confectionery & Goods"
      },
      {
        id: "nroot",
        title: "Nroot Bangladesh",
        description: "Corporate Branding • Inbound Strategy",
        category: "Lifestyle & Tech",
        imgSrc: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&auto=format&fit=crop&q=60",
        linkHref: "https://example.com/nroot",
        iconText: "Tech Solutions"
      }
    ]
  },
  team: {
    heading: "Solara Squad",
    subtitle: "Meet the strategic minds and creative force behind every campaign, design, and growth story we launch.",
    list: [
      {
        id: "01",
        title: "Jafor Sadek",
        tag: "Head of Operations",
        description: "Driving operational excellence and team velocity.",
        imageSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&auto=format&fit=crop&q=60"
      },
      {
        id: "02",
        title: "Samir Al Mahmud",
        tag: "Head of Creative",
        description: "Crafting narratives that leave lasting impressions.",
        imageSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&auto=format&fit=crop&q=60"
      },
      {
        id: "03",
        title: "Md Murshedul Islam",
        tag: "Social Media",
        description: "Building communities and digital momentum.",
        imageSrc: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=900&q=60"
      },
      {
        id: "04",
        title: "Mohammad Fahad Hossain",
        tag: "Creative Exec",
        description: "Designing the visual language of tomorrow.",
        imageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&auto=format&fit=crop&q=60"
      },
      {
        id: "05",
        title: "Tapshe Kalam Tanha",
        tag: "Creative Exec",
        description: "Executing pixel-perfect brand experiences.",
        imageSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&auto=format&fit=crop&q=60"
      }
    ]
  },
  pricing: {
    heading: "Hospital & Clinic Packages",
    subtitle: "Choose the perfect marketing growth plan designed specifically for the healthcare sector.",
    list: [
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
          "Boosting Setup (budget separate)"
        ],
        highlight: false
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
          "24 Hour dedicated support"
        ],
        highlight: true
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
          "Boosting Setup (budget separate)"
        ],
        highlight: false
      }
    ]
  },
  faq: {
    subtitle: "Got Questions?",
    heading: "FAQ",
    list: [
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
    ]
  },
  contact: {
    subtitle: "Let's Start Something Big",
    heading: "Contact",
    description: "Have a project in mind or want to elevate your brand's presence? Drop us a line, and our strategy team will reach out within 24 hours.",
    email: "solarainfo2024@gmail.com",
    phone: "+880 1619-435044",
    website: "solarabd.com",
    facebook: "https://facebook.com/solara.bd", // Default social links
    instagram: "https://instagram.com/solara.bd",
    linkedin: "https://linkedin.com/company/solara-bd",
    twitter: "https://twitter.com/solara_bd",
    youtube: "https://youtube.com/@solara_bd"
  }
};

interface ContentContextType {
  content: LandingPageContent;
  loading: boolean;
  saveContent: (newContent: LandingPageContent) => Promise<boolean>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<LandingPageContent>(defaultContent);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, "landingPage", "content");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setContent(docSnap.data() as LandingPageContent);
        } else {
          // Document does not exist in Firestore. Seed the database on first load.
          await setDoc(docRef, defaultContent);
          setContent(defaultContent);
        }
      } catch (error) {
        console.error("Error fetching Firestore content, using default local copy: ", error);
        // Fallback is already set in the useState
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const saveContent = async (newContent: LandingPageContent): Promise<boolean> => {
    try {
      const docRef = doc(db, "landingPage", "content");
      await setDoc(docRef, newContent);
      setContent(newContent);
      return true;
    } catch (error) {
      console.error("Error updating Firestore content: ", error);
      return false;
    }
  };

  return (
    <ContentContext.Provider value={{ content, loading, saveContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};
