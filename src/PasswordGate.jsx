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
    if (input.toUpperCase() === 'LAWTON') {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setInput('');
    }
  };
  return (
    <div className="relative w-full min-h-screen bg-[#FAF8F4] flex flex-col items-center justify-center overflow-hidden pk-grain">
      {/* Pixel trail background */}
      <div className="absolute inset-0 z-0">
        <PixelTrail
          pixelSize={screenSize.lessThan('md') ? 48 : 72}
          fadeDuration={0}
          delay={1000}
          pixelClassName="rounded-full bg-[#565D4F]/[0.10]"
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
        >
          <label htmlFor="pk-password" className="sr-only">Password</label>
          <input
            id="pk-password"
            type="password"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false); }}
            placeholder="Enter password"
            autoFocus
            autoComplete="off"
            className="w-full h-12 px-4 text-base font-mono outline-none transition-all duration-200 bg-[#FAF8F4]/80 backdrop-blur-sm border border-[#C4B99A] rounded-md text-[#362318] placeholder-[#A89B86] focus:border-[#565D4F]"
          />
          {error && (
            <motion.p
              className="text-sm text-center text-[#DB3E36]"
              role="alert"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Incorrect password. Try again.
            </motion.p>
          )}
          <button
            type="submit"
            className="h-12 text-sm font-mono uppercase tracking-widest bg-[#362318] text-[#E0D3A8] rounded-md hover:bg-[#4A3F35] transition-colors cursor-pointer"
          >
            Enter
          </button>
        </motion.form>

        {/* Footer */}
        <motion.p
          className="mt-10 text-xs uppercase tracking-widest text-[#C4B99A]"
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
