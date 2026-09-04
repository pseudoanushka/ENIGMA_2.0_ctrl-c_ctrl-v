import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Dna, 
  Brain, 
  FileText, 
  Activity, 
  Shield, 
  ArrowRight, 
  Check, 
  Star,
  Award,
  Clock,
  Users,
  Lock,
  Globe
} from 'lucide-react';

interface LandingPageProps {
  onLogin: (role: 'patient' | 'doctor') => void;
}

export function LandingPage({ onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl">
                <Dna className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-primary">GeneCare AI</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-foreground/70 hover:text-primary transition-colors">Features</a>
              <a href="#how-it-works" className="text-foreground/70 hover:text-primary transition-colors">How It Works</a>
              <a href="#testimonials" className="text-foreground/70 hover:text-primary transition-colors">Testimonials</a>
              <button 
                onClick={() => onLogin('patient')}
                className="px-4 py-2 text-primary hover:bg-primary/5 rounded-lg transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-6">
                <Award className="w-4 h-4 text-secondary" />
                <span className="text-sm text-secondary">FDA-Compliant AI Technology</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                Detect Early.<br />
                <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  Live Longer.
                </span>
              </h1>
              <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
                Advanced AI-powered cancer detection combining genome sequencing, machine learning symptom analysis, and medical report interpretation for early intervention.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onLogin('patient')}
                  className="group px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Login as Patient
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => onLogin('doctor')}
                  className="px-8 py-4 border-2 border-primary text-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Login as Doctor
                </button>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-secondary" />
                  <span className="text-sm text-foreground/60">HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-secondary" />
                  <span className="text-sm text-foreground/60">End-to-End Encrypted</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-border">
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-secondary to-primary rounded-2xl opacity-20 blur-2xl" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-2xl">
                    <Dna className="w-8 h-8 text-primary mb-3" />
                    <div className="text-2xl font-bold text-primary">99.2%</div>
                    <div className="text-sm text-foreground/60">Detection Accuracy</div>
                  </div>
                  <div className="bg-gradient-to-br from-secondary/5 to-primary/5 p-6 rounded-2xl">
                    <Brain className="w-8 h-8 text-secondary mb-3" />
                    <div className="text-2xl font-bold text-secondary">AI-Powered</div>
                    <div className="text-sm text-foreground/60">Deep Learning</div>
                  </div>
                  <div className="bg-gradient-to-br from-secondary/5 to-primary/5 p-6 rounded-2xl">
                    <Clock className="w-8 h-8 text-secondary mb-3" />
                    <div className="text-2xl font-bold text-secondary">24/7</div>
                    <div className="text-sm text-foreground/60">Monitoring</div>
                  </div>
                  <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-2xl">
                    <Users className="w-8 h-8 text-primary mb-3" />
                    <div className="text-2xl font-bold text-primary">50K+</div>
                    <div className="text-sm text-foreground/60">Users</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Comprehensive Detection Platform</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Multiple AI-powered analysis methods working together for the most accurate early cancer detection
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Dna,
                title: 'Genome Sequencing',
                description: 'Advanced DNA analysis to identify cancer-related genetic mutations',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Brain,
                title: 'AI Risk Prediction',
                description: 'Machine learning models predict cancer risk with 99%+ accuracy',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: Activity,
                title: 'Symptom Screening',
                description: 'ML-powered symptom analysis detects early warning patterns',
                gradient: 'from-green-500 to-teal-500'
              },
              {
                icon: FileText,
                title: 'Report Analysis',
                description: 'AI interprets medical reports and highlights abnormal markers',
                gradient: 'from-orange-500 to-red-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-gradient-to-b from-white to-gray-50 p-6 rounded-2xl border border-border hover:border-secondary/50 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">{feature.title}</h3>
                <p className="text-foreground/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">How It Works</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Simple 3-step process to get your comprehensive cancer risk assessment
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Upload Your Data', description: 'Share your genome data, medical reports, or log symptoms through our secure platform' },
              { step: '02', title: 'AI Analysis', description: 'Our advanced AI models analyze your data across multiple detection methods simultaneously' },
              { step: '03', title: 'Get Results', description: 'Receive detailed risk assessment with actionable insights and doctor recommendations' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white p-8 rounded-2xl border border-border hover:border-secondary/50 transition-all duration-300 hover:shadow-lg">
                  <div className="text-6xl font-bold text-secondary/10 mb-4">{item.step}</div>
                  <h3 className="text-2xl font-semibold text-primary mb-3">{item.title}</h3>
                  <p className="text-foreground/70">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-secondary to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Trusted by Thousands</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Real stories from patients who detected cancer early with GeneCare AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'Cancer Survivor', text: 'GeneCare AI detected early signs that my regular checkup missed. I\'m cancer-free today because of early detection.' },
              { name: 'Dr. Michael Chen', role: 'Oncologist', text: 'The AI insights complement our clinical diagnosis perfectly. It\'s become an invaluable tool in my practice.' },
              { name: 'Emily Rodriguez', role: 'Patient', text: 'The symptom tracker and AI assistant helped me understand my health better and caught warning signs early.' }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-2xl border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-foreground/80 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-primary">{testimonial.name}</div>
                  <div className="text-sm text-foreground/60">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Badges */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-background">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl border border-border p-8">
            <div className="grid md:grid-cols-4 gap-8 items-center">
              <div className="text-center">
                <Shield className="w-12 h-12 text-secondary mx-auto mb-2" />
                <div className="font-semibold text-primary">HIPAA Compliant</div>
              </div>
              <div className="text-center">
                <Lock className="w-12 h-12 text-secondary mx-auto mb-2" />
                <div className="font-semibold text-primary">ISO 27001 Certified</div>
              </div>
              <div className="text-center">
                <Globe className="w-12 h-12 text-secondary mx-auto mb-2" />
                <div className="font-semibold text-primary">GDPR Compliant</div>
              </div>
              <div className="text-center">
                <Award className="w-12 h-12 text-secondary mx-auto mb-2" />
                <div className="font-semibold text-primary">FDA Recognized</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-secondary p-2 rounded-xl">
                  <Dna className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-semibold">GeneCare AI</span>
              </div>
              <p className="text-white/70">Early cancer detection powered by advanced AI and genome analysis.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Research</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">HIPAA Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/60">
            <p>© 2026 GeneCare AI. All rights reserved. This platform is not meant for collecting PII or securing highly sensitive data.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
