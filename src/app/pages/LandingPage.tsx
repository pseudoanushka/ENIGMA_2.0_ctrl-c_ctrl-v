import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { 
  Dna, 
  Brain, 
  Activity, 
  FileText, 
  Shield, 
  CheckCircle, 
  Users, 
  Award,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Dna,
      title: 'Genome Sequencing',
      description: 'Advanced DNA analysis to identify genetic risk factors'
    },
    {
      icon: Brain,
      title: 'AI Prediction',
      description: 'Machine learning models for accurate cancer risk assessment'
    },
    {
      icon: Activity,
      title: 'Symptom Tracking',
      description: 'Real-time monitoring with intelligent pattern detection'
    },
    {
      icon: FileText,
      title: 'Report Analysis',
      description: 'Automated medical report interpretation and insights'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Upload Your Data',
      description: 'Share your medical history, reports, or genome data securely'
    },
    {
      number: '02',
      title: 'AI Analysis',
      description: 'Our advanced AI processes and analyzes your health information'
    },
    {
      number: '03',
      title: 'Get Insights',
      description: 'Receive personalized risk assessment and recommendations'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Patient',
      text: 'Early detection saved my life. The AI caught patterns my doctors initially missed.',
      rating: 5
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Oncologist',
      text: 'An invaluable tool for early cancer screening. The genome analysis is remarkably accurate.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Patient',
      text: 'The platform is easy to use and the insights are incredibly detailed. Highly recommend.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] via-white to-[#E6F7F7]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-[#0B3C5D]/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B3C5D] to-[#1CA7A6] flex items-center justify-center">
              <Dna className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-[#0B3C5D]">OncoDetect AI</span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/patient/login')}
              className="px-6 py-2 text-[#0B3C5D] hover:bg-[#F7FAFC] rounded-xl transition-all"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/patient/login')}
              className="px-6 py-2 bg-gradient-to-r from-[#0B3C5D] to-[#1CA7A6] text-white rounded-xl hover:shadow-lg transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#1CA7A6]/10 to-[#0B3C5D]/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#1CA7A6]" />
              <span className="text-sm text-[#0B3C5D]">AI-Powered Cancer Detection</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-[#0B3C5D] mb-6 leading-tight">
              Detect Early.<br />
              <span className="bg-gradient-to-r from-[#0B3C5D] to-[#1CA7A6] bg-clip-text text-transparent">
                Live Longer.
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Advanced AI and genome sequencing technology for early cancer detection. 
              Empowering patients and doctors with predictive insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/patient/login')}
                className="px-8 py-4 bg-gradient-to-r from-[#0B3C5D] to-[#1CA7A6] text-white rounded-2xl hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                Login as Patient
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/doctor/login')}
                className="px-8 py-4 bg-white text-[#0B3C5D] border-2 border-[#0B3C5D] rounded-2xl hover:bg-[#0B3C5D] hover:text-white transition-all flex items-center justify-center gap-2"
              >
                Login as Doctor
                <Users className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Animated Background */}
          <div className="relative mt-16">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B3C5D]/5 to-[#1CA7A6]/5 rounded-3xl blur-3xl"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative bg-white/50 backdrop-blur-sm rounded-3xl border border-[#0B3C5D]/10 p-12 shadow-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#0B3C5D] to-[#1CA7A6] flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-[#0B3C5D] mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B3C5D] mb-4">How It Works</h2>
            <p className="text-gray-600">Simple, secure, and scientifically validated</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="text-6xl font-bold text-[#1CA7A6]/20 mb-4">{step.number}</div>
                  <h3 className="text-xl font-semibold text-[#0B3C5D] mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/4 right-0 transform translate-x-1/2">
                    <ArrowRight className="w-6 h-6 text-[#1CA7A6]/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#F7FAFC] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B3C5D] mb-4">Trusted by Thousands</h2>
            <p className="text-gray-600">Real stories from our community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-[#0B3C5D]/10"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <CheckCircle key={i} className="w-5 h-5 text-[#10B981] fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0B3C5D] to-[#1CA7A6]"></div>
                  <div>
                    <div className="font-semibold text-[#0B3C5D]">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 px-6 bg-white border-t border-[#0B3C5D]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-[#1CA7A6]" />
              <span className="text-sm font-semibold text-[#0B3C5D]">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-[#1CA7A6]" />
              <span className="text-sm font-semibold text-[#0B3C5D]">FDA Registered</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-[#1CA7A6]" />
              <span className="text-sm font-semibold text-[#0B3C5D]">ISO Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-[#1CA7A6]" />
              <span className="text-sm font-semibold text-[#0B3C5D]">256-bit Encrypted</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#0B3C5D] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1CA7A6] to-white flex items-center justify-center">
                  <Dna className="w-5 h-5 text-[#0B3C5D]" />
                </div>
                <span className="font-semibold">OncoDetect AI</span>
              </div>
              <p className="text-sm text-white/70">
                Advanced AI-powered cancer detection for early intervention and better outcomes.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Features</li>
                <li>Pricing</li>
                <li>Security</li>
                <li>Roadmap</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>About</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>HIPAA Compliance</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/20 text-center text-sm text-white/70">
            <p>© 2026 OncoDetect AI. All rights reserved. Not intended for diagnostic purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
