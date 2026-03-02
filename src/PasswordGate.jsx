import { useState } from 'react';

export default function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  if (unlocked) return children;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center font-mono">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2 tracking-widest uppercase">PK Lawton</h1>
        <p className="text-sm text-gray-500 mb-8">Portfolio — Enter password to continue</p>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (input === 'LETTUCEIN') { setUnlocked(true); setError(false); }
          else { setError(true); setInput(''); }
        }}>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Password"
            className="border border-black px-4 py-2 text-sm font-mono text-center w-64 focus:outline-none"
            autoFocus
          />
          <br />
          <button type="submit" className="mt-4 bg-black text-white px-6 py-2 text-sm font-mono uppercase tracking-widest hover:opacity-70 transition-opacity">
            Enter
          </button>
          {error && <p className="mt-4 text-sm text-red-600">Incorrect password</p>}
        </form>
      </div>
    </div>
  );
}
