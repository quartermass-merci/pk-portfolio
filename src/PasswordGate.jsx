import { useState } from 'react';
import { motion } from 'framer-motion';
import PixelTrail from './components/PixelTrail';
import { useScreenSize } from './components/hooks/useScreenSize';

export default function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const screenSize = useScreenSize();

  if (unlocked) return children;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === 'LAWTON') {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setInput('');
    }
  };
  return (
    <div className="relative w-full min-h-screen bg-[#f5f5f0] flex flex-col items-center justify-center overflow-hidden">
      {/* Pixel trail background */}
      <div className="absolute inset-0 z-0">
        <PixelTrail
          pixelSize={screenSize.lessThan('md') ? 48 : 72}
          fadeDuration={0}
          delay={1000}
          pixelClassName="rounded-full bg-black/[0.06]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none w-full px-6">
        {/* BIG Logo */}
        <motion.div
          className="mb-16 w-full flex justify-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src="/images/pk-logo.png"
            alt="PK Lawton — Strategy × Culture"
            className="w-[90vw] max-w-[600px] h-auto"
          />
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-xs flex flex-col gap-3 pointer-events-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >          <input
            type="password"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false); }}
            placeholder="Enter password"
            autoFocus
            className="w-full h-11 px-4 text-sm font-mono outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm border border-black/10 rounded-md text-black placeholder-gray-400 focus:border-black/30"
          />
          {error && (
            <motion.p
              className="text-xs text-center text-red-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Incorrect password. Try again.
            </motion.p>
          )}
          <button
            type="submit"
            className="h-10 text-xs font-mono uppercase tracking-widest bg-black text-white rounded-md hover:bg-black/80 transition-colors cursor-pointer"
          >
            Enter
          </button>
        </motion.form>

        {/* Footer */}
        <motion.p
          className="mt-10 text-[10px] uppercase tracking-widest text-black/25"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9 }}
        >
          pklawton.com
        </motion.p>
      </div>
    </div>
  );
}