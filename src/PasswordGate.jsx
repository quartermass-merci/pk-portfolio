import { useState } from 'react';
import { motion } from 'framer-motion';
import EtheralShadow from './components/EtheralShadow';

export default function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [inputMouseX, setInputMouseX] = useState(0);

  if (unlocked) return children;

  const handleInputMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setInputMouseX(e.clientX - rect.left);
  };

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
    <div className="min-h-screen w-full relative overflow-hidden" style={{ backgroundColor: '#000' }}>
      {/* Ethereal shadow background */}
      <EtheralShadow
        color="rgba(90, 90, 110, 1)"
        animation={{ scale: 80, speed: 60 }}
        noise={{ opacity: 0.6, scale: 1.2 }}
        sizing="fill"
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      />

      {/* Content layer */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">

        {/* BIG Logo */}
        <motion.div
          className="mb-14 w-full flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
        >
          <img
            src="/images/pk-logo.png"
            alt="PK Lawton — Strategy × Culture"
            className="w-[90vw] max-w-[600px] h-auto"
            style={{
              filter: 'invert(1) drop-shadow(0 0 40px rgba(255,255,255,0.12))',
            }}
          />
        </motion.div>
        {/* Password form */}
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-xs flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="relative w-full">
            <input
              type="password"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              placeholder="Enter password"
              autoFocus
              className="w-full h-12 px-4 text-sm font-mono outline-none transition-all duration-200"
              style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '0.5rem',
                color: '#d4d4d8',
              }}
              onMouseMove={handleInputMouseMove}
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.3)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; }}
            />            {inputHover && (
              <>
                <div
                  className="absolute pointer-events-none top-0 left-0 right-0 h-[1px] z-20"
                  style={{
                    borderRadius: '0.5rem 0.5rem 0 0',
                    background: `radial-gradient(50px circle at ${inputMouseX}px 0px, rgba(255,255,255,0.5) 0%, transparent 70%)`,
                  }}
                />
                <div
                  className="absolute pointer-events-none bottom-0 left-0 right-0 h-[1px] z-20"
                  style={{
                    borderRadius: '0 0 0.5rem 0.5rem',
                    background: `radial-gradient(50px circle at ${inputMouseX}px 1px, rgba(255,255,255,0.5) 0%, transparent 70%)`,
                  }}
                />
              </>
            )}
          </div>

          {error && (
            <motion.p
              className="text-xs text-center"
              style={{ color: '#ef4444' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Incorrect password. Try again.
            </motion.p>
          )}
          <button
            type="submit"
            className="group relative inline-flex justify-center items-center overflow-hidden h-11 text-sm font-mono uppercase tracking-widest cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            style={{
              backgroundColor: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              borderRadius: '0.5rem',
              color: '#d4d4d8',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <span className="relative z-10 px-4 py-2">Enter</span>
            <div
              className="absolute inset-0 flex h-full w-full justify-center group-hover:duration-1000"
              style={{ transform: 'skew(-13deg) translateX(-100%)', transition: 'transform 1s' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'skew(-13deg) translateX(100%)'; }}
            >
              <div className="relative h-full w-10" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
            </div>
          </button>
        </motion.form>

        {/* Footer */}
        <motion.div
          className="flex items-center w-full max-w-xs mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="flex-grow" style={{ borderTop: '1px dashed rgba(255,255,255,0.08)' }} />
          <span className="mx-3 text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>pklawton.com</span>
          <div className="flex-grow" style={{ borderTop: '1px dashed rgba(255,255,255,0.08)' }} />
        </motion.div>
      </div>
    </div>
  );
}