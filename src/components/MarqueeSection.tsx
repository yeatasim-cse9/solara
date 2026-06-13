import React from 'react';
import { motion } from 'motion/react';
import { 
  Share2, 
  PenTool, 
  Aperture, 
  Target, 
  Video, 
  Users, 
  Code, 
  LineChart 
} from 'lucide-react';

const row1 = [
  { text: "Social Media Management", icon: Share2 },
  { text: "Content Creation", icon: PenTool },
  { text: "Branding & Design", icon: Aperture },
  { text: "Paid Advertising", icon: Target },
];

const row2 = [
  { text: "Video & Multimedia", icon: Video },
  { text: "Influencer Marketing", icon: Users },
  { text: "Website Development", icon: Code },
  { text: "Analytics & Reporting", icon: LineChart },
];

const Pill: React.FC<{ text: string; Icon: any }> = ({ text, Icon }) => (
  <div className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.08] rounded-full px-6 py-3.5 shrink-0 hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300">
    <Icon className="w-[18px] h-[18px] text-white/50" strokeWidth={1.5} />
    <span className="text-white/80 text-[15px] font-medium tracking-wide">{text}</span>
  </div>
);

export function MarqueeSection() {
  // Creating a generous pool of copies so that even on ultrawides, taking 50% translates perfectly
  const loop1 = [...row1, ...row1, ...row1, ...row1, ...row1, ...row1];
  const loop2 = [...row2, ...row2, ...row2, ...row2, ...row2, ...row2];

  return (
    <section className="py-20 bg-black w-full overflow-hidden flex flex-col gap-5 border-t border-white/5">
      <motion.div 
        className="flex gap-5 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        {loop1.map((item, idx) => (
          <Pill key={`r1-${idx}`} text={item.text} Icon={item.icon} />
        ))}
      </motion.div>

      <motion.div 
        className="flex gap-5 w-max"
        animate={{ x: ["-50%", "0%"] }}
        transition={{ repeat: Infinity, duration: 55, ease: "linear" }}
      >
        {loop2.map((item, idx) => (
          <Pill key={`r2-${idx}`} text={item.text} Icon={item.icon} />
        ))}
      </motion.div>
    </section>
  );
}
