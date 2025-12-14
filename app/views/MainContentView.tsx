'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PlayTestsButton from '../components/mainContentCommon/PlayTestsButton';
import { sections } from '../data/sections';
import { RelationshipProvider } from '../contexts/RelationshipContext';

interface MainContentViewProps {
  relationshipStart: string;
  onResetTests: () => void;
}

export default function MainContentView({ relationshipStart, onResetTests }: MainContentViewProps) {
  const [activeSection, setActiveSection] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Track which section is in view
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const handleScroll = () => {
      if (!scrollContainerRef.current) return;

      const scrollTop = scrollContainerRef.current.scrollTop;
      const windowHeight = window.innerHeight;
      const newSection = Math.round(scrollTop / windowHeight);
      const clampedSection = Math.min(sections.length - 1, Math.max(0, newSection));

      if (clampedSection !== activeSection) {
        setActiveSection(clampedSection);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    scrollContainer.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  return (
    <RelationshipProvider relationshipStart={relationshipStart}>
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-indigo-50 -z-10" />

        {/* Play Tests Again Button */}
        <PlayTestsButton onClick={onResetTests} />

        {/* Scroll Hint */}
        <AnimatePresence>
          {activeSection < sections.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 2 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-gray-400"
              >
                ↓
              </motion.div>
              <p className="text-sm text-gray-500">Scroll for more</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scrolling Container with snap points */}
        <div
          ref={scrollContainerRef}
          className="w-full h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory smooth-scroll relative z-10"
          style={{ scrollBehavior: 'smooth' }}
        >
          {sections.map((section) => {
            const SectionComponent = section.component;
            return (
              <div key={section.id} className="w-full h-screen snap-start snap-always">
                <SectionComponent />
              </div>
            );
          })}
        </div>
      </div>
    </RelationshipProvider>
  );
}
