import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Dna,
  Activity,
  FileText,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  MessageCircle,
  Upload,
  Plus,
  Search,
  Bell,
  Settings,
  LogOut,
  Home,
  Heart,
  Pill,
  Users,
  BookOpen,
  BarChart3,
  Moon,
  Sun,
  Shield,
  Info,
  ChevronRight,
  Star,
  MapPin,
  Clock,
  User
} from 'lucide-react';
import { RiskOverview } from './patient/risk-overview';
import { SymptomLogger } from './patient/symptom-logger';
import { TestReports } from './patient/test-reports';
import { MedicineTracker } from './patient/medicine-tracker';
import { FindDoctors } from './patient/find-doctors';
import { BlogEducation } from './patient/blog-education';
import { HealthInsights } from './patient/health-insights';
import { AIChat } from './patient/ai-chat';

interface PatientDashboardProps {
  onLogout: () => void;
}

type TabType = 'overview' | 'symptoms' | 'reports' | 'medicine' | 'doctors' | 'blog' | 'insights';

export function PatientDashboard({ onLogout }: PatientDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [darkMode, setDarkMode] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const navigation = [
    { id: 'overview' as TabType, label: 'Overview', icon: Home },
    { id: 'symptoms' as TabType, label: 'Symptoms', icon: Activity },
    { id: 'reports' as TabType, label: 'Reports', icon: FileText },
    { id: 'medicine' as TabType, label: 'Medicine', icon: Pill },
    { id: 'doctors' as TabType, label: 'Find Doctors', icon: Users },
    { id: 'blog' as TabType, label: 'Education', icon: BookOpen },
    { id: 'insights' as TabType, label: 'Insights', icon: BarChart3 },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-background">
        {/* Sidebar */}
        <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-secondary to-primary p-2 rounded-xl">
                <Dna className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold">GeneCare AI</div>
                <div className="text-xs text-sidebar-foreground/60">Patient Portal</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-lg'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-sidebar-border space-y-2">
            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all duration-200"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground/70 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-card border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-primary">
                  {navigation.find(n => n.id === activeTab)?.label}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, Sarah Johnson
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* Security Badge */}
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-xl">
                  <Shield className="w-4 h-4 text-secondary" />
                  <span className="text-sm text-secondary">Encrypted</span>
                </div>
                {/* Notifications */}
                <button className="relative p-2 hover:bg-muted rounded-xl transition-colors">
                  <Bell className="w-5 h-5 text-foreground" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
                {/* Settings */}
                <button className="p-2 hover:bg-muted rounded-xl transition-colors">
                  <Settings className="w-5 h-5 text-foreground" />
                </button>
                {/* Profile */}
                <div className="flex items-center gap-2 pl-3 border-l border-border">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-1 overflow-auto p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'overview' && <RiskOverview />}
                {activeTab === 'symptoms' && <SymptomLogger />}
                {activeTab === 'reports' && <TestReports />}
                {activeTab === 'medicine' && <MedicineTracker />}
                {activeTab === 'doctors' && <FindDoctors />}
                {activeTab === 'blog' && <BlogEducation />}
                {activeTab === 'insights' && <HealthInsights />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* AI Chat Assistant */}
      <AIChat isOpen={showChat} onClose={() => setShowChat(false)} />
      
      {/* Floating Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-secondary to-primary text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-200 flex items-center justify-center z-50"
      >
        <MessageCircle className="w-7 h-7" />
      </button>
    </div>
  );
}
