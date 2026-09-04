import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Dna, Mail, Lock, User, Shield, ArrowLeft } from 'lucide-react';
import { api, setAuthToken } from '../../services/api';

interface PatientLoginProps {
  onLogin: () => void;
}

export function PatientLogin({ onLogin }: PatientLoginProps) {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('123456789');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!isSignup) {
        const response = await api.login({ email, password });
        if (response.token || response.access_token) {
          setAuthToken(response.token || response.access_token);
        }
        onLogin();
        navigate('/patient/dashboard');
      } else {
        // Handle signup later or mock for now
        onLogin();
        navigate('/patient/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] via-white to-[#E6F7F7] flex items-center justify-center p-6">
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-[#0B3C5D] hover:text-[#1CA7A6] transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-2xl border border-[#0B3C5D]/10 p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#0B3C5D] to-[#1CA7A6] flex items-center justify-center">
              <Dna className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#0B3C5D] mb-2">
              {isSignup ? 'Create Patient Account' : 'Patient Login'}
            </h1>
            <p className="text-gray-600 text-sm">
              {isSignup ? 'Join thousands taking control of their health' : 'Access your health dashboard'}
            </p>
          </div>

          {/* Data Privacy Notice */}
          <div className="mb-6 p-4 bg-[#1CA7A6]/5 rounded-xl border border-[#1CA7A6]/20">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#1CA7A6] flex-shrink-0 mt-0.5" />
              <div className="text-xs text-gray-600">
                <strong className="text-[#0B3C5D]">Your privacy is protected.</strong> All data is encrypted end-to-end and HIPAA compliant.
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label className="block text-sm text-[#0B3C5D] mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3 bg-[#F7FAFC] border border-[#0B3C5D]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1CA7A6] transition-all"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm text-[#0B3C5D] mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-[#F7FAFC] border border-[#0B3C5D]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1CA7A6] transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#0B3C5D] mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-[#F7FAFC] border border-[#0B3C5D]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1CA7A6] transition-all"
                  required
                />
              </div>
            </div>

            {!isSignup && (
              <div className="flex justify-end">
                <button type="button" className="text-sm text-[#1CA7A6] hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-[#0B3C5D] to-[#1CA7A6] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : (isSignup ? 'Create Account' : 'Login')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#0B3C5D]/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-3 bg-white border-2 border-[#0B3C5D]/10 rounded-xl hover:bg-[#F7FAFC] transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}
            </span>{' '}
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="text-[#1CA7A6] hover:underline"
            >
              {isSignup ? 'Login' : 'Sign up'}
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </motion.div>
    </div>
  );
}
