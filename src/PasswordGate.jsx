

import { useState } from 'react';

export default function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  if (unlocked) return children;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === 'LAWTON') {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setInput('');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white font-mono">
      <div className={`w-full max-w-sm bg-gradient-to-b from-gray-50/80 to-white rounded-2xl shadow-xl shadow-black/5 p-8 flex flex-col items-center border border-gray-200 transition-transform ${shake ? 'animate-pulse' : ''}`}>
        {/* Icon */}
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white mb-6 shadow-lg shadow-black/5 border border-gray-100">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-black">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            <circle cx="12" cy="16.5" r="1.5" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-1 tracking-tight text-center">PK Lawton</h1>
        <p className="text-gray-400 text-xs mb-8 text-center uppercase tracking-widest">Portfolio</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <input
              type="password"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              placeholder="Enter password"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 bg-gray-50 text-black text-sm font-mono transition-all"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 text-center">Incorrect password. Try again.</p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-b from-gray-700 to-gray-900 text-white font-mono text-sm py-2.5 rounded-xl shadow-md hover:brightness-110 active:scale-[0.98] transition-all uppercase tracking-widest"
          >
            Enter
          </button>
        </form>

        {/* Footer */}
        <div className="flex items-center w-full mt-6">
          <div className="flex-grow border-t border-dashed border-gray-200"></div>
          <span className="mx-3 text-[10px] text-gray-300 uppercase tracking-widest">pklawton.com</span>
          <div className="flex-grow border-t border-dashed border-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
