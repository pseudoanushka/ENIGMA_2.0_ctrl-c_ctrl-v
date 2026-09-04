import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Stethoscope, Mail, Lock, Shield, ArrowLeft, Upload, CheckCircle, Clock } from 'lucide-react';
import { api, setAuthToken } from '../../services/api';

interface DoctorLoginProps {
  onLogin: () => void;
}

export function DoctorLogin({ onLogin }: DoctorLoginProps) {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('123456789');
  const [showVerification, setShowVerification] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignup) {
      setShowVerification(true);
    } else {
      setIsLoading(true);
      try {
        const response = await api.login({ email, password });
        if (response.token || response.access_token) {
          setAuthToken(response.token || response.access_token);
        }
        onLogin();
        navigate('/doctor/dashboard');
      } catch (err: any) {
        setError(err.message || 'Login failed');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVerificationUpload = () => {
    setVerificationStatus('pending');
    setTimeout(() => {
      setVerificationStatus('verified');
      setTimeout(() => {
        onLogin();
        navigate('/doctor/dashboard');
      }, 2000);
    }, 3000);
  };

  if (showVerification) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] via-white to-[#E6F7F7] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-3xl shadow-2xl border border-[#0B3C5D]/10 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#0B3C5D] to-[#1CA7A6] flex items-center justify-center">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-[#0B3C5D] mb-2">Medical License Verification</h1>
              <p className="text-gray-600 text-sm">Upload your credentials for verification</p>
            </div>

            {verificationStatus === null && (
              <div className="space-y-6">
                <div className="border-2 border-dashed border-[#0B3C5D]/20 rounded-xl p-8 text-center hover:border-[#1CA7A6] transition-all cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-[#1CA7A6]" />
                  <p className="font-semibold text-[#0B3C5D] mb-1">Upload Medical License</p>
                  <p className="text-sm text-gray-600">PDF, JPG or PNG (max 10MB)</p>
                </div>

                <div className="border-2 border-dashed border-[#0B3C5D]/20 rounded-xl p-8 text-center hover:border-[#1CA7A6] transition-all cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-[#1CA7A6]" />
                  <p className="font-semibold text-[#0B3C5D] mb-1">Upload ID Proof</p>
                  <p className="text-sm text-gray-600">Government-issued ID</p>
                </div>

                <button
                  onClick={handleVerificationUpload}
                  className="w-full py-3 bg-gradient-to-r from-[#0B3C5D] to-[#1CA7A6] text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Submit for Verification
                </button>
              </div>
            )}

            {verificationStatus === 'pending' && (
              <div className="text-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 mx-auto mb-6 rounded-full border-4 border-[#1CA7A6] border-t-transparent"
                ></motion.div>
                <Clock className="w-12 h-12 mx-auto mb-4 text-[#1CA7A6]" />
                <h3 className="font-semibold text-[#0B3C5D] mb-2">Verifying Credentials</h3>
                <p className="text-sm text-gray-600">Please wait while we verify your documents...</p>
              </div>
            )}

            {verificationStatus === 'verified' && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#10B981] flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h3 className="font-semibold text-[#0B3C5D] mb-2">Verification Complete!</h3>
                <p className="text-sm text-gray-600">Redirecting to dashboard...</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

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
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#0B3C5D] to-[#1CA7A6] flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#0B3C5D] mb-2">
              {isSignup ? 'Doctor Registration' : 'Doctor Login'}
            </h1>
            <p className="text-gray-600 text-sm">
              {isSignup ? 'Join our network of verified medical professionals' : 'Access your patient dashboard'}
            </p>
          </div>

          <div className="mb-6 p-4 bg-[#1CA7A6]/5 rounded-xl border border-[#1CA7A6]/20">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#1CA7A6] flex-shrink-0 mt-0.5" />
              <div className="text-xs text-gray-600">
                <strong className="text-[#0B3C5D]">For verified medical professionals only.</strong> All accounts require license verification.
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-[#0B3C5D] mb-2">Medical Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@hospital.com"
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
              {isLoading ? 'Processing...' : (isSignup ? 'Continue to Verification' : 'Login')}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">
              {isSignup ? 'Already registered?' : "Don't have an account?"}
            </span>{' '}
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="text-[#1CA7A6] hover:underline"
            >
              {isSignup ? 'Login' : 'Register'}
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          By continuing, you agree to our Medical Professional Terms and Privacy Policy
        </p>
      </motion.div>
    </div>
  );
}
