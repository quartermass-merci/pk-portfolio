
import { useState, useRef } from 'react';

export default function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [inputMouseX, setInputMouseX] = useState(0);
  const formRef = useRef(null);

  if (unlocked) return children;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

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
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: '#101214' }}
    >
      {/* Card container */}
      <div
        className="w-full max-w-lg md:max-w-2xl flex overflow-hidden"
        style={{
          borderRadius: '0.75rem',
          border: '1px solid #2C333A',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          minHeight: '420px'
        }}
      >
        {/* Left: Form side */}
        <div
          className="w-full md:w-3/5 relative overflow-hidden flex flex-col items-center justify-center px-8 py-12 md:px-12"
          style={{ backgroundColor: '#161A1D' }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Mouse-follow gradient glow */}
          <div
            className="absolute pointer-events-none rounded-full blur-3xl transition-opacity duration-300"
            style={{
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(199,209,219,0.06) 0%, transparent 70%)',
              transform: `translate(${mousePosition.x - 200}px, ${mousePosition.y - 200}px)`,
              transition: 'transform 0.15s ease-out, opacity 0.3s',
              opacity: isHovering ? 1 : 0,
            }}
          />

          {/* Logo */}
          <div className="relative z-10 mb-10 w-full flex justify-center">
            <img
              src="/images/pk-logo.png"
              alt="PK Lawton — Strategy × Culture"
              className="h-16 md:h-20 w-auto"
              style={{ filter: 'invert(1)' }}
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-xs flex flex-col gap-4">
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
                  backgroundColor: '#161A1D',
                  border: '2px solid #2C333A',
                  borderRadius: '0.5rem',
                  color: '#C7D1DB',
                }}
                onMouseMove={handleInputMouseMove}
                onMouseEnter={() => setInputHover(true)}
                onMouseLeave={() => setInputHover(false)}
                onFocus={(e) => { e.target.style.backgroundColor = '#101214'; e.target.style.borderColor = '#596773'; }}
                onBlur={(e) => { e.target.style.backgroundColor = '#161A1D'; e.target.style.borderColor = '#2C333A'; }}
              />
              {/* Top edge glow */}
              {inputHover && (
                <>
                  <div
                    className="absolute pointer-events-none top-0 left-0 right-0 h-[2px] z-20 overflow-hidden"
                    style={{
                      borderRadius: '0.5rem 0.5rem 0 0',
                      background: `radial-gradient(40px circle at ${inputMouseX}px 0px, #C7D1DB 0%, transparent 70%)`,
                    }}
                  />
                  <div
                    className="absolute pointer-events-none bottom-0 left-0 right-0 h-[2px] z-20 overflow-hidden"
                    style={{
                      borderRadius: '0 0 0.5rem 0.5rem',
                      background: `radial-gradient(40px circle at ${inputMouseX}px 2px, #C7D1DB 0%, transparent 70%)`,
                    }}
                  />
                </>
              )}
            </div>

            {error && (
              <p className="text-xs text-center" style={{ color: '#ef4444' }}>
                Incorrect password. Try again.
              </p>
            )}

            {/* Submit button with sweep effect */}
            <button
              type="submit"
              className="group relative inline-flex justify-center items-center overflow-hidden h-11 text-sm font-mono uppercase tracking-widest cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.02]"
              style={{
                backgroundColor: '#2C333A',
                borderRadius: '0.5rem',
                color: '#C7D1DB',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
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
                <div className="relative h-full w-10" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
              </div>
            </button>
          </form>

          {/* Footer */}
          <div className="relative z-10 flex items-center w-full max-w-xs mt-8">
            <div className="flex-grow" style={{ borderTop: '1px dashed #2C333A' }}></div>
            <span className="mx-3 text-[10px] uppercase tracking-widest" style={{ color: '#596773' }}>pklawton.com</span>
            <div className="flex-grow" style={{ borderTop: '1px dashed #2C333A' }}></div>
          </div>
        </div>

        {/* Right: Image side (hidden on mobile) */}
        <div className="hidden md:block w-2/5 relative overflow-hidden" style={{ backgroundColor: '#101214' }}>
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.2 }}
          />
          {/* Subtle gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(16,18,20,0.8) 0%, transparent 50%, rgba(16,18,20,0.8) 100%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
