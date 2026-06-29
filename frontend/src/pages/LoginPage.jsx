import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import Toast from '../components/Toast';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setToast({ type: 'error', message: 'Please enter both email and password' });
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      setToast({ type: 'success', message: 'Login successful! Redirecting...' });
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      setToast({ type: 'error', message: result.error });
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-luxury-cream dark:bg-luxury-dark px-4 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 bg-luxury-ivory dark:bg-luxury-charcoal border border-luxury-brass/10 hover:border-luxury-brass/30 p-8 rounded-2xl shadow-xl transition-all duration-300">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-serif text-luxury-slate dark:text-luxury-ivory tracking-tight">
            Admin Authentication
          </h2>
          <p className="mt-2 text-sm text-luxury-slate/60 dark:text-luxury-ivory/60 font-light mb-4">
            Authorized management panel access
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div className="bg-luxury-brass/5 border border-luxury-brass/20 rounded-xl p-4 text-xs text-luxury-slate/85 dark:text-luxury-ivory/85 leading-relaxed">
          <p className="font-semibold text-luxury-gold uppercase tracking-wider mb-2">Demo Access Credentials</p>
          <ul className="space-y-1 font-light">
            <li>• <strong>Email:</strong> <code className="bg-luxury-cream dark:bg-luxury-dark px-1.5 py-0.5 rounded border border-luxury-brass/10 select-all">admin@glorysimon.com</code></li>
            <li>• <strong>Password:</strong> <code className="bg-luxury-cream dark:bg-luxury-dark px-1.5 py-0.5 rounded border border-luxury-brass/10">Any password</code></li>
          </ul>
        </div>


        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-semibold text-luxury-brass uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-luxury-brass/50">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-luxury-brass/20 rounded-lg bg-luxury-cream dark:bg-luxury-dark text-luxury-slate dark:text-luxury-ivory placeholder-luxury-slate/40 dark:placeholder-luxury-ivory/40 focus:outline-none focus:border-luxury-brass transition-colors duration-300 text-sm"
                  placeholder="admin@glorysimon.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-luxury-brass uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-luxury-brass/50">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-luxury-brass/20 rounded-lg bg-luxury-cream dark:bg-luxury-dark text-luxury-slate dark:text-luxury-ivory placeholder-luxury-slate/40 dark:placeholder-luxury-ivory/40 focus:outline-none focus:border-luxury-brass transition-colors duration-300 text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-luxury-dark bg-gradient-to-r from-luxury-brass to-luxury-gold hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-luxury-dark border-t-transparent animate-spin rounded-full"></div>
              ) : (
                <span className="flex items-center gap-2">
                  Authenticate <ArrowRight className="h-4.5 w-4.5" />
                </span>
              )}
            </button>
          </div>
        </form>

        <div className="bg-luxury-brass/5 border border-luxury-brass/20 p-4 rounded-lg text-xs text-luxury-brass/80">
          <p className="font-semibold mb-1">Seeded Testing Credentials:</p>
          <p>Email: <span className="font-mono text-luxury-slate dark:text-luxury-ivory">admin@glorysimon.com</span></p>
          <p>Password: <span className="font-mono text-luxury-slate dark:text-luxury-ivory">adminpassword123</span></p>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default LoginPage;
