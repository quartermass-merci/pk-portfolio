import { useState, useRef, useEffect } from 'react';
import { MeshGradient } from '@paper-design/shaders-react';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center">
      {/* Mesh gradient shader background */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={['#000000', '#1a1a2e', '#16213e', '#0f3460', '#1a1a2e']}
        speed={0.15}
        backgroundColor="#000000"
      />
      {/* Secondary wireframe overlay for depth */}
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-30"
        colors={['#000000', '#ffffff', '#1a1a2e', '#2c2c54']}
        speed={0.08}
        wireframe="true"
        backgroundColor="transparent"
      />

      {/* SVG filters */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center px-6 py-12 w-full max-w-lg">
        {/* BIG Logo */}
        <motion.div
          className="mb-12 w-full flex justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <img
            src="/images/pk-logo.png"
            alt="PK Lawton — Strategy × Culture"
            className="w-[85vw] max-w-[480px] md:max-w-[540px] h-auto"
            style={{
              filter: 'invert(1) drop-shadow(0 0 30px rgba(255,255,255,0.15))',
            }}
          />
        </motion.div>
        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-xs flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Password input with edge-glow effect */}
          <div className="relative w-full">
            <input
              type="password"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              placeholder="Enter password"
              autoFocus
              className="w-full h-12 px-4 text-sm font-mono outline-none transition-all duration-200 ease-in-out"
              style={{
                backgroundColor: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0.5rem',
                color: '#C7D1DB',
              }}
              onMouseMove={handleInputMouseMove}
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.25)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            />
            {/* Edge glow on hover */}
            {inputHover && (
              <>
                <div
                  className="absolute pointer-events-none top-0 left-0 right-0 h-[1px] z-20 overflow-hidden"
                  style={{
                    borderRadius: '0.5rem 0.5rem 0 0',
                    background: `radial-gradient(50px circle at ${inputMouseX}px 0px, rgba(255,255,255,0.6) 0%, transparent 70%)`,
                  }}
                />
                <div
                  className="absolute pointer-events-none bottom-0 left-0 right-0 h-[1px] z-20 overflow-hidden"
                  style={{
                    borderRadius: '0 0 0.5rem 0.5rem',
                    background: `radial-gradient(50px circle at ${inputMouseX}px 1px, rgba(255,255,255,0.6) 0%, transparent 70%)`,
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
          {/* Submit button with sweep effect */}
          <button
            type="submit"
            className="group relative inline-flex justify-center items-center overflow-hidden h-11 text-sm font-mono uppercase tracking-widest cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.02]"
            style={{
              backgroundColor: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              borderRadius: '0.5rem',
              color: '#C7D1DB',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <span className="relative z-10 px-4 py-2">Enter</span>
            <div
              className="absolute inset-0 flex h-full w-full justify-center group-hover:duration-1000"
              style={{
                transform: 'skew(-13deg) translateX(-100%)',
                transition: 'transform 1s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'skew(-13deg) translateX(100%)'; }}
            >
              <div className="relative h-full w-10" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
            </div>
          </button>
        </motion.form>

        {/* Footer */}
        <motion.div
          className="flex items-center w-full max-w-xs mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <div className="flex-grow" style={{ borderTop: '1px dashed rgba(255,255,255,0.1)' }}></div>
          <span className="mx-3 text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>pklawton.com</span>
          <div className="flex-grow" style={{ borderTop: '1px dashed rgba(255,255,255,0.1)' }}></div>
        </motion.div>
      </div>
    </div>
  );
}