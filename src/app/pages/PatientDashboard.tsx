import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Dna,
  Brain,
  Activity,
  FileText,
  Pill,
  Users,
  BookOpen,
  TrendingUp,
  Moon,
  Sun,
  Menu,
  X,
  Bell,
  Settings,
  LogOut,
  MessageCircle,
  Upload,
  Calendar,
  AlertCircle,
  Shield,
  ChevronRight,
  Plus,
  Download,
  Clock,
  Target,
  Heart,
  Zap
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useTranslation } from 'react-i18next';
import { RiskOverviewCard } from '../components/RiskOverviewCard';
import { AIChatAssistant } from '../components/AIChatAssistant';
import { SymptomLogger } from '../components/SymptomLogger';
import { TestReports } from '../components/TestReports';
import { MedicineTracker } from '../components/MedicineTracker';
import { FindDoctors } from '../components/FindDoctors';
import { BlogHub } from '../components/BlogHub';
import { HealthInsights } from '../components/HealthInsights';

interface PatientDashboardProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export function PatientDashboard({ darkMode, setDarkMode }: PatientDashboardProps) {
  const { t, i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);

  const menuItems = [
    { id: 'overview', label: t('Overview'), icon: Dna },
    { id: 'symptoms', label: t('Symptom Logger'), icon: Activity },
    { id: 'reports', label: t('Test Reports'), icon: FileText },
    { id: 'medicine', label: t('Medicine Tracker'), icon: Pill },
    { id: 'doctors', label: t('Find Doctors'), icon: Users },
    { id: 'insights', label: t('Health Insights'), icon: TrendingUp },
    { id: 'blog', label: t('Education Hub'), icon: BookOpen }
  ];

  const notifications = [
    { id: 1, title: 'New AI Analysis Available', time: '5 min ago', type: 'info' },
    { id: 2, title: 'Medication Reminder', time: '1 hour ago', type: 'warning' },
    { id: 3, title: 'Dr. Smith responded', time: '2 hours ago', type: 'success' }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 20 }}
            className="w-72 bg-card border-r border-border fixed h-full z-30 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-8 px-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B3C5D] to-[#1CA7A6] flex items-center justify-center">
                  <Dna className="w-6 h-6 text-white" />
                </div>
                {sidebarOpen && <span className="text-xl font-bold text-foreground">OncoDetect AI</span>}
              </div>

              <div className="mb-8 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary"></div>
                  <div>
                    <h3 className="font-semibold text-foreground">John Doe</h3>
                    <p className="text-xs text-muted-foreground">ID: #PT-12345</p>
                  </div>
                </div>
              </div>

              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'text-foreground hover:bg-muted'
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {activeTab === item.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-8 border-t border-border space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-muted transition-all">
                  <Settings className="w-5 h-5" />
                  <span>{t('Settings')}</span>
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/';
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span>{t('Logout')}</span>
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-72' : 'ml-0'} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="bg-card border-b border-border sticky top-0 z-20">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-muted rounded-lg transition-all"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h2 className="text-xl font-semibold text-foreground">
                {menuItems.find((item) => item.id === activeTab)?.label || t('Dashboard')}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {/* Emergency Button */}
              <button className="px-4 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-all flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Emergency
              </button>

              {/* Language Switcher */}
              <div className="relative">
                <select
                  onChange={(e) => i18n.changeLanguage(e.target.value)}
                  value={i18n.language}
                  className="appearance-none bg-muted text-foreground px-3 py-2 pr-8 rounded-lg outline-none focus:ring-2 focus:ring-secondary text-sm font-medium"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी (Hindi)</option>
                  <option value="mr">मराठी (Marathi)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-foreground">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 hover:bg-muted rounded-lg transition-all"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 hover:bg-muted rounded-lg transition-all relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-card rounded-xl shadow-2xl border border-border p-4">
                    <h3 className="font-semibold text-foreground mb-4">Notifications</h3>
                    <div className="space-y-3">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="p-3 bg-muted rounded-lg hover:bg-muted/80 transition-all cursor-pointer"
                        >
                          <p className="text-sm font-semibold text-foreground">{notif.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Security Badge */}
              <div className="flex items-center gap-2 px-3 py-2 bg-secondary/10 rounded-lg">
                <Shield className="w-4 h-4 text-secondary" />
                <span className="text-xs text-secondary">Encrypted</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'symptoms' && <SymptomLogger />}
          {activeTab === 'reports' && <TestReports />}
          {activeTab === 'medicine' && <MedicineTracker />}
          {activeTab === 'doctors' && <FindDoctors />}
          {activeTab === 'insights' && <HealthInsights />}
          {activeTab === 'blog' && <BlogHub />}
        </main>
      </div>

      {/* AI Chat Assistant */}
      <AIChatAssistant />
    </div>
  );
}

function OverviewTab() {
  const riskData = [
    { month: 'Jan', risk: 20 },
    { month: 'Feb', risk: 22 },
    { month: 'Mar', risk: 18 },
    { month: 'Apr', risk: 25 },
    { month: 'May', risk: 23 },
    { month: 'Jun', risk: 20 }
  ];

  const futureRiskData = [
    { year: '2026', risk: 20 },
    { year: '2028', risk: 25 },
    { year: '2030', risk: 30 },
    { year: '2032', risk: 28 },
    { year: '2034', risk: 32 },
    { year: '2036', risk: 35 }
  ];

  const lifestyleData = [
    { subject: 'Exercise', score: 75 },
    { subject: 'Diet', score: 60 },
    { subject: 'Sleep', score: 80 },
    { subject: 'Stress', score: 45 },
    { subject: 'Hydration', score: 70 }
  ];

  return (
    <div className="space-y-6">
      {/* Risk Overview */}
      <RiskOverviewCard />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-6 border border-border"
        >
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8 text-secondary" />
            <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs">Active</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">92%</h3>
          <p className="text-sm text-muted-foreground">Health Score</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-6 border border-border"
        >
          <div className="flex items-center justify-between mb-4">
            <Heart className="w-8 h-8 text-[#10B981]" />
            <span className="px-3 py-1 bg-[#10B981]/10 text-[#10B981] rounded-full text-xs">Low</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">20%</h3>
          <p className="text-sm text-muted-foreground">Cancer Risk</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-6 border border-border"
        >
          <div className="flex items-center justify-between mb-4">
            <Dna className="w-8 h-8 text-primary" />
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">Updated</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">3</h3>
          <p className="text-sm text-muted-foreground">Genetic Markers</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-6 border border-border"
        >
          <div className="flex items-center justify-between mb-4">
            <Zap className="w-8 h-8 text-[#F59E0B]" />
            <span className="px-3 py-1 bg-[#F59E0B]/10 text-[#F59E0B] rounded-full text-xs">AI</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">98%</h3>
          <p className="text-sm text-muted-foreground">AI Confidence</p>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Trend */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-foreground">Risk Trend (6 Months)</h3>
            <button className="text-xs text-secondary hover:underline">View Details</button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={riskData}>
              <defs>
                <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1CA7A6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1CA7A6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Area type="monotone" dataKey="risk" stroke="#1CA7A6" fill="url(#riskGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Lifestyle Score */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-foreground">Lifestyle Score</h3>
            <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs">Gamified</span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={lifestyleData}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis dataKey="subject" stroke="#64748b" />
              <PolarRadiusAxis stroke="#64748b" />
              <Radar name="Score" dataKey="score" stroke="#1CA7A6" fill="#1CA7A6" fillOpacity={0.3} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Predictive Risk Timeline */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-foreground mb-1">Predictive Risk Timeline</h3>
            <p className="text-sm text-muted-foreground">10-year cancer risk projection based on current health data</p>
          </div>
          <div className="px-4 py-2 bg-primary/10 rounded-lg">
            <Brain className="w-5 h-5 text-primary" />
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={futureRiskData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="year" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="risk" stroke="#0B3C5D" strokeWidth={3} name="Projected Risk %" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-gradient-to-br from-primary to-secondary text-white rounded-2xl p-6 hover:shadow-xl transition-all text-left">
          <Upload className="w-8 h-8 mb-3" />
          <h4 className="font-semibold mb-1">Upload Report</h4>
          <p className="text-sm opacity-90">Add new medical reports</p>
        </button>

        <button className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all text-left">
          <Activity className="w-8 h-8 mb-3 text-secondary" />
          <h4 className="font-semibold text-foreground mb-1">Log Symptoms</h4>
          <p className="text-sm text-muted-foreground">Track your health</p>
        </button>

        <button className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all text-left">
          <Users className="w-8 h-8 mb-3 text-primary" />
          <h4 className="font-semibold text-foreground mb-1">Find Doctor</h4>
          <p className="text-sm text-muted-foreground">Book consultation</p>
        </button>
      </div>
    </div>
  );
}
