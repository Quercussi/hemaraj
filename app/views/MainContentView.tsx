'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionNavigationIndicators from '../components/mainContentCommon/SectionNavigationIndicators';
import PlayTestsButton from '../components/mainContentCommon/PlayTestsButton';
import { sections } from '../data/sections';
import { RelationshipProvider } from '../contexts/RelationshipContext';

interface MainContentViewProps {
  relationshipStart: string;
  onResetTests: () => void;
}

export default function MainContentView({ relationshipStart, onResetTests }: MainContentViewProps) {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Track which section is in view
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      const scrollTop = scrollContainerRef.current.scrollTop;
      const windowHeight = window.innerHeight;
      const newSection = Math.round(scrollTop / windowHeight);
      setActiveSection(Math.min(sections.length - 1, Math.max(0, newSection)));
    };

    const scrollContainer = scrollContainerRef.current;
    scrollContainer.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!scrollContainerRef.current) return;

      const scrollContainer = scrollContainerRef.current;
      const windowHeight = window.innerHeight;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        scrollContainer.scrollBy({ top: windowHeight, behavior: 'smooth' });
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollContainer.scrollBy({ top: -windowHeight, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (index: number) => {
    if (!scrollContainerRef.current) return;
    const windowHeight = window.innerHeight;
    scrollContainerRef.current.scrollTo({
      top: index * windowHeight,
      behavior: 'smooth',
    });
  };

  return (
    <RelationshipProvider relationshipStart={relationshipStart}>
      <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
        {/* Background gradient - behind floating hearts */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-indigo-50 -z-10" />
        {/* Section Navigation Indicators */}
        <SectionNavigationIndicators
          activeSection={activeSection}
          onSectionClick={scrollToSection}
        />

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

        {/* Smooth Scrolling Container */}
        <div
          ref={scrollContainerRef}
          className="w-full h-screen overflow-y-auto overflow-x-hidden smooth-scroll relative z-10"
        >
          {sections.map((section) => {
            const SectionComponent = section.component;
            return (
              <div key={section.id} className="w-full min-h-screen">
                <SectionComponent />
              </div>
            );
          })}
        </div>
      </div>
    </RelationshipProvider>
  );
}
