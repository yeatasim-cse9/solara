"use client";

import * as React from "react";
import { cn } from "../../lib/utils"; 

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc: string;
  icon: React.ReactNode;
  linkHref: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
}

export const ExpandingCards = React.forwardRef<
  HTMLUListElement,
  ExpandingCardsProps
>(({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    defaultActiveIndex,
  );
  
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gridStyle = React.useMemo(() => {
    if (activeIndex === null) return {};
    
    if (isDesktop) {
      const columns = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateColumns: columns };
    } else {
      const rows = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateRows: rows };
    }
  }, [activeIndex, items.length, isDesktop]);

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <ul
      className={cn(
        "w-full gap-2",
        "grid",
        "h-[700px] md:h-[600px]",
        "transition-[grid-template-columns,grid-template-rows] duration-500 ease-out",
        className,
      )}
      style={{
        ...gridStyle,
        ...(isDesktop 
          ? { gridTemplateRows: '1fr' }
          : { gridTemplateColumns: '1fr' }
        )
      }}
      ref={ref}
      {...props}
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          className={cn(
            "group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-black shadow-sm",
            "md:min-w-[80px]",
            "min-h-0 min-w-0"
          )}
          onMouseEnter={() => handleInteraction(index)}
          onFocus={() => handleInteraction(index)}
          onClick={() => handleInteraction(index)}
          tabIndex={0}
          data-active={activeIndex === index}
        >
          <img
            src={item.imgSrc}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-data-[active=true]:scale-100 group-data-[active=true]:grayscale-0 scale-[1.05] grayscale opacity-50 group-data-[active=true]:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-black/60 group-data-[active=true]:bg-transparent transition-colors duration-500 pointer-events-none" />

          <article
            className="absolute inset-0 flex flex-col justify-end gap-3 p-6 md:p-8"
          >
            <h3 className="hidden origin-left rotate-90 text-[15px] font-mono tracking-[0.1em] text-white/50 whitespace-nowrap opacity-100 transition-all duration-300 ease-out md:block group-data-[active=true]:opacity-0">
              {item.title}
            </h3>

            <div className="text-white opacity-0 transition-all duration-300 delay-75 ease-out group-data-[active=true]:opacity-100 transform translate-y-4 group-data-[active=true]:translate-y-0">
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl w-fit border border-white/10">
                 {item.icon}
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white opacity-0 transition-all duration-300 delay-150 ease-out group-data-[active=true]:opacity-100 transform translate-y-4 group-data-[active=true]:translate-y-0">
              {item.title}
            </h3>

            <p className="w-full max-w-sm text-[15px] text-white/70 opacity-0 transition-all duration-300 delay-225 ease-out group-data-[active=true]:opacity-100 transform translate-y-4 group-data-[active=true]:translate-y-0">
              {item.description}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
});
ExpandingCards.displayName = "ExpandingCards";
