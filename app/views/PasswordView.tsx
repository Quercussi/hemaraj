"use client";

import { AnimatePresence } from 'framer-motion';
import PasswordGate from '../components/PasswordGate';

interface PasswordViewProps {
  onUnlock: () => void;
}

export default function PasswordView({ onUnlock }: PasswordViewProps) {
  return (
    <AnimatePresence mode="wait">
      <PasswordGate onUnlock={onUnlock} />
    </AnimatePresence>
  );
}

