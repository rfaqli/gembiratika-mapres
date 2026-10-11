import { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils';
import { useAtom } from 'jotai';
import { currentPageAtom } from '../data';

export function Reveal({
  children,
  className,
  type = 'reveal',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  type?: 'reveal' | 'reveal-scale' | 'reveal-left' | 'reveal-right';
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage] = useAtom(currentPageAtom);

  useEffect(() => {
    setIsVisible(false);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [currentPage]);

  return (
    <div
      ref={ref}
      className={cn(className, isVisible ? `active ${type}` : type)}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
