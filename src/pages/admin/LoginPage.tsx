import { useState } from 'react';
import { LogIn } from 'lucide-react';
import { signInWithEmail } from '../../lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmail(email, password);
      // Supabase handles the session, App.tsx will detect it and redirect
      window.location.href = '/admin';
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden font-sans">
      {/* Background Decorative Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1)_0%,transparent_50%)]"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cinema-red/10 blur-[120px] rounded-full"></div>
      
      <div className="max-w-md w-full px-6 relative z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl text-center">
          {/* Logo Placeholder */}
          <div className="mb-8 flex justify-center">
             <div className="w-20 h-20 bg-cinema-red rounded-2xl flex items-center justify-center shadow-lg shadow-cinema-red/20 rotate-3">
                <LogIn className="text-white" size={32} />
             </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Admin Gateway</h1>
          <p className="text-gray-400 mb-10 font-light">TwinHub Media & AI Center Management</p>

          {error && (
            <div className="mb-6 p-4 bg-cinema-red-light/10 border border-cinema-red-light/20 rounded-xl text-cinema-red-light text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-4 mb-6 text-left">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Admin Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-cinema-red outline-none transition-colors"
                placeholder="admin@twinhub.net"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-cinema-red outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-4 bg-white text-black py-4 px-6 rounded-2xl font-bold transition-all hover:bg-cinema-red hover:text-white disabled:opacity-50 mt-6"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Secure Login'
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5">
             <p className="text-xs text-gray-500 font-light">
               Secure administrative access only. Unauthorised attempts are logged.
             </p>
          </div>
        </div>
        
        {/* Simple Footer Link back */}
        <div className="mt-8 text-center">
           <a href="/" className="text-gray-500 text-sm hover:text-cinema-red transition-colors">
              &larr; Back to Public Site
           </a>
        </div>
      </div>
    </div>
  );
}
