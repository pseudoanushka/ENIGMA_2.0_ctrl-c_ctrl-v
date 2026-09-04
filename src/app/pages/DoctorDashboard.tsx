import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Stethoscope,
  Users,
  Activity,
  Brain,
  FileText,
  AlertTriangle,
  Menu,
  X,
  Bell,
  Settings,
  LogOut,
  Moon,
  Sun,
  Shield,
  Search,
  Filter,
  MessageCircle,
  TrendingUp,
  Dna,
  Calendar,
  CheckCircle,
  Clock,
  ArrowRight,
  Send,
  Loader2,
  FileImage,
  Sparkles,
  User
} from 'lucide-react';
import { api } from '../../services/api';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { useTranslation } from 'react-i18next';
import { PredictionForm } from '../components/PredictionForm';

interface DoctorDashboardProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export function DoctorDashboard({ darkMode, setDarkMode }: DoctorDashboardProps) {
  const { t, i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);

  const menuItems = [
    { id: 'overview', label: t('Dashboard'), icon: Stethoscope },
    { id: 'patients', label: t('Patients'), icon: Users },
    { id: 'analysis', label: t('AI Analysis'), icon: Brain },
    { id: 'consultations', label: t('Consultations'), icon: MessageCircle },
    { id: 'alerts', label: t('Critical Alerts'), icon: AlertTriangle }
  ];

  const notifications = [
    { id: 1, title: 'High-risk patient alert', time: '10 min ago', type: 'urgent' },
    { id: 2, title: 'New patient assigned', time: '1 hour ago', type: 'info' },
    { id: 3, title: 'Lab results ready', time: '2 hours ago', type: 'success' }
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
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg text-foreground">OncoDetect AI</h1>
                  <p className="text-xs text-muted-foreground">{t('Doctor Portal')}</p>
                </div>
              </div>

              <div className="mb-8 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary"></div>
                  <div>
                    <h3 className="font-semibold text-foreground">Dr. Sarah Johnson</h3>
                    <p className="text-xs text-muted-foreground">Oncologist</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 px-3 py-2 bg-[#10B981]/10 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-[#10B981]" />
                  <span className="text-xs text-[#10B981] font-semibold">Verified</span>
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
                    {item.id === 'alerts' && (
                      <span className="ml-auto w-6 h-6 bg-destructive text-white rounded-full flex items-center justify-center text-xs">
                        3
                      </span>
                    )}
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

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 hover:bg-muted rounded-lg transition-all"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

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

              <div className="flex items-center gap-2 px-3 py-2 bg-secondary/10 rounded-lg">
                <Shield className="w-4 h-4 text-secondary" />
                <span className="text-xs text-secondary">HIPAA Compliant</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">
          {activeTab === 'overview' && <DoctorOverviewTab />}
          {activeTab === 'patients' && <PatientsTab />}
          {activeTab === 'analysis' && <AIAnalysisTab />}
          {activeTab === 'consultations' && <ConsultationsTab />}
          {activeTab === 'alerts' && <CriticalAlertsTab />}
        </main>
      </div>
    </div>
  );
}

function DoctorOverviewTab() {
  const weeklyData = [
    { day: 'Mon', patients: 12, highRisk: 2 },
    { day: 'Tue', patients: 15, highRisk: 3 },
    { day: 'Wed', patients: 10, highRisk: 1 },
    { day: 'Thu', patients: 18, highRisk: 4 },
    { day: 'Fri', patients: 14, highRisk: 2 },
    { day: 'Sat', patients: 8, highRisk: 1 },
    { day: 'Sun', patients: 5, highRisk: 0 }
  ];

  const riskDistribution = [
    { name: 'Low Risk', value: 65, color: '#10B981' },
    { name: 'Moderate', value: 25, color: '#F59E0B' },
    { name: 'High Risk', value: 10, color: '#DC2626' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6"
        >
          <Users className="w-8 h-8 text-primary mb-3" />
          <h3 className="text-3xl font-bold text-foreground mb-1">142</h3>
          <p className="text-sm text-muted-foreground">Total Patients</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#DC2626]/10 to-[#DC2626]/5 border border-[#DC2626]/20 rounded-2xl p-6"
        >
          <AlertTriangle className="w-8 h-8 text-[#DC2626] mb-3" />
          <h3 className="text-3xl font-bold text-foreground mb-1">8</h3>
          <p className="text-sm text-muted-foreground">High-Risk Cases</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 rounded-2xl p-6"
        >
          <Calendar className="w-8 h-8 text-secondary mb-3" />
          <h3 className="text-3xl font-bold text-foreground mb-1">24</h3>
          <p className="text-sm text-muted-foreground">Appointments Today</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-[#10B981]/10 to-[#10B981]/5 border border-[#10B981]/20 rounded-2xl p-6"
        >
          <Brain className="w-8 h-8 text-[#10B981] mb-3" />
          <h3 className="text-3xl font-bold text-foreground mb-1">67</h3>
          <p className="text-sm text-muted-foreground">AI Analyses</p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-semibold text-foreground mb-6">Weekly Patient Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Bar dataKey="patients" fill="#0B3C5D" radius={[8, 8, 0, 0]} />
              <Bar dataKey="highRisk" fill="#DC2626" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-semibold text-foreground mb-6">Patient Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="font-semibold text-foreground mb-4">Recent Patient Updates</h3>
        <div className="space-y-3">
          {[
            { patient: 'John Doe', status: 'New high-risk alert', time: '10 min ago', type: 'urgent' },
            { patient: 'Jane Smith', status: 'Lab results uploaded', time: '1 hour ago', type: 'info' },
            { patient: 'Mike Johnson', status: 'Consultation completed', time: '2 hours ago', type: 'success' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-muted rounded-xl hover:bg-muted/80 transition-all cursor-pointer">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === 'urgent' ? 'bg-destructive' :
                activity.type === 'success' ? 'bg-[#10B981]' : 'bg-secondary'
                }`}>
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{activity.patient}</h4>
                <p className="text-sm text-muted-foreground">{activity.status}</p>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PatientsTab() {
  const [searchTerm, setSearchTerm] = useState('');

  const patients = [
    {
      id: 1,
      name: 'John Doe',
      age: 45,
      riskLevel: 'high',
      riskScore: 75,
      lastVisit: '2026-02-24',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 52,
      riskLevel: 'moderate',
      riskScore: 45,
      lastVisit: '2026-02-22',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      age: 38,
      riskLevel: 'low',
      riskScore: 20,
      lastVisit: '2026-02-20',
      status: 'Active'
    }
  ];

  const getRiskColor = (level: string) => {
    if (level === 'high') return '#DC2626';
    if (level === 'moderate') return '#F59E0B';
    return '#10B981';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search patients..."
            className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
        <button className="px-4 py-3 bg-muted hover:bg-muted/80 rounded-xl flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {patients.map((patient, index) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-xl font-bold text-white">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{patient.name}</h3>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: `${getRiskColor(patient.riskLevel)}20`,
                      color: getRiskColor(patient.riskLevel)
                    }}
                  >
                    {patient.riskLevel.toUpperCase()} RISK
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Age: {patient.age}</span>
                  <span>Risk Score: {patient.riskScore}%</span>
                  <span>Last Visit: {patient.lastVisit}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all">
                  View Details
                </button>
                <button className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-all">
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AIAnalysisTab() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl p-8 border border-secondary/20">
        <div className="flex items-center gap-4 mb-4">
          <Brain className="w-12 h-12 text-secondary" />
          <div>
            <h3 className="text-xl font-bold text-foreground">AI Prediction Dashboard</h3>
            <p className="text-muted-foreground">Advanced machine learning analysis for early detection</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl p-4 border border-border">
          <Dna className="w-8 h-8 text-primary mb-2" />
          <p className="text-2xl font-bold text-foreground">234</p>
          <p className="text-sm text-muted-foreground">Genome Analyses</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <Brain className="w-8 h-8 text-secondary mb-2" />
          <p className="text-2xl font-bold text-foreground">98.2%</p>
          <p className="text-sm text-muted-foreground">AI Accuracy</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <TrendingUp className="w-8 h-8 text-[#10B981] mb-2" />
          <p className="text-2xl font-bold text-foreground">42</p>
          <p className="text-sm text-muted-foreground">Early Detections</p>
        </div>
      </div>

      <div className="mt-8">
        <PredictionForm />
      </div>
    </div>
  );
}

function ConsultationsTab() {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [insight, setInsight] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrResult, setOcrResult] = useState('');

  const patients = [
    {
      id: 1,
      patient: 'John Doe',
      time: '10:00 AM',
      type: 'Follow-up',
      status: 'upcoming',
      demographics: { age: 45, sex: 'Male', occupation: 'Teacher', lifestyle: 'Smoker (10 years), moderate alcohol' },
      history: 'Family history of lung cancer. Diagnosed with mild COPD in 2024.',
      reports: [
        { id: 101, name: 'Chest X-Ray - Feb 2026', type: 'image', url: 'https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/p-blog/candy.JPG' } // Dummy image for demo
      ]
    },
    {
      id: 2,
      patient: 'Jane Smith',
      time: '11:30 AM',
      type: 'Initial',
      status: 'upcoming',
      demographics: { age: 52, sex: 'Female', occupation: 'Accountant', lifestyle: 'Non-smoker, active' },
      history: 'Routine checkup revealed elevated CA-125 markers.',
      reports: []
    }
  ];

  const handleOcrAnalysis = async (imageUrl: string) => {
    setOcrLoading(true);
    setOcrResult('');
    try {
      // Utilizing our MedGemma integration via /chat endpoint!
      const res = await api.chat({ query: 'medgemma analyze this medical report image', image_url: imageUrl });

      let aiText = 'No analysis matched.';
      if (typeof res === 'string') {
        aiText = res;
      } else if (res.response || res.reply || res.content) {
        aiText = res.response || res.reply || res.content;
      } else {
        aiText = JSON.stringify(res);
      }
      setOcrResult(aiText);
    } catch (err: any) {
      setOcrResult('Error performing OCR analysis: ' + err.message);
    } finally {
      setOcrLoading(false);
    }
  };

  const handleSendInsight = () => {
    setIsSending(true);
    setTimeout(() => {
      alert(`Consultation insights securely sent to ${selectedPatient.patient}!`);
      setIsSending(false);
      setInsight('');
      setOcrResult('');
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Patient List */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-semibold text-foreground mb-4">Today's Queue</h3>
          <div className="space-y-3">
            {patients.map((consult, index) => (
              <div
                key={index}
                onClick={() => setSelectedPatient(consult)}
                className={`p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all border ${selectedPatient?.id === consult.id ? 'bg-primary/5 border-primary shadow-sm' : 'bg-muted border-transparent hover:border-border'}`}
              >
                <div>
                  <h4 className="font-semibold text-foreground">{consult.patient}</h4>
                  <p className="text-sm text-muted-foreground">{consult.type}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{consult.time}</span>
                  <ArrowRight className={`w-4 h-4 transition-all ${selectedPatient?.id === consult.id ? 'text-primary' : 'text-transparent'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Patient Consultation View */}
      <div className="lg:col-span-2">
        {selectedPatient ? (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">

            {/* Demographics & History */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{selectedPatient.patient}</h2>
                  <p className="text-muted-foreground">Consultation Type: {selectedPatient.type}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-muted rounded-xl">
                  <h4 className="text-sm font-semibold text-foreground mb-1">Demographics</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Age: {selectedPatient.demographics.age}</li>
                    <li>Sex: {selectedPatient.demographics.sex}</li>
                    <li>Occupation: {selectedPatient.demographics.occupation}</li>
                    <li>Lifestyle: {selectedPatient.demographics.lifestyle}</li>
                  </ul>
                </div>
                <div className="p-4 bg-muted rounded-xl">
                  <h4 className="text-sm font-semibold text-foreground mb-1">Medical History</h4>
                  <p className="text-sm text-muted-foreground">{selectedPatient.history}</p>
                </div>
              </div>
            </div>

            {/* Reports & OCR Analysis */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-4">Medical Reports</h3>
              {selectedPatient.reports.length > 0 ? (
                <div className="space-y-4">
                  {selectedPatient.reports.map((report: any) => (
                    <div key={report.id} className="p-4 border border-border rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileImage className="w-5 h-5 text-secondary" />
                        <span className="font-medium">{report.name}</span>
                      </div>
                      <button
                        onClick={() => handleOcrAnalysis(report.url)}
                        disabled={ocrLoading}
                        className="px-4 py-2 bg-secondary/10 text-secondary hover:bg-secondary/20 rounded-lg text-sm transition-all flex items-center gap-2"
                      >
                        {ocrLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                        {ocrLoading ? 'Analyzing...' : 'Analyze with AI'}
                      </button>
                    </div>
                  ))}

                  <AnimatePresence>
                    {ocrResult && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-secondary/20 mt-4 overflow-hidden">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="w-5 h-5 text-secondary" />
                          <h4 className="font-semibold text-foreground">AI OCR & Clinical Insights</h4>
                        </div>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{ocrResult}</p>
                        <button
                          onClick={() => setInsight(`Based on the AI analysis of your report:\n${ocrResult}\n\nMy recommendations are:`)}
                          className="mt-3 text-sm text-primary hover:underline"
                        >
                          + Append to consultation notes
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">No medical reports uploaded yet.</p>
              )}
            </div>

            {/* Send Consultation */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-4">Send Consultation & Prescriptions</h3>
              <textarea
                value={insight}
                onChange={(e) => setInsight(e.target.value)}
                placeholder="Write your diagnostic insights and prescriptions for the patient here..."
                className="w-full h-32 p-4 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary mb-4 text-sm"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSendInsight}
                  disabled={isSending || !insight.trim()}
                  className="px-6 py-3 bg-primary text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  {isSending ? 'Sending securely...' : 'Send to Patient'}
                </button>
              </div>
            </div>

          </motion.div>
        ) : (
          <div className="bg-card rounded-2xl p-12 border border-border flex flex-col items-center justify-center text-center h-full">
            <User className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Patient Selected</h3>
            <p className="text-muted-foreground text-sm max-w-sm">Select a patient from the queue to view their history, analyze reports using AI, and send consultation notes.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CriticalAlertsTab() {
  const alerts = [
    {
      id: 1,
      patient: 'John Doe',
      alert: 'Tumor marker CA-125 elevated to 85 U/mL',
      priority: 'urgent',
      time: '10 min ago'
    },
    {
      id: 2,
      patient: 'Sarah Williams',
      alert: 'New genetic mutation detected: TP53',
      priority: 'high',
      time: '1 hour ago'
    },
    {
      id: 3,
      patient: 'Robert Brown',
      alert: 'Symptom pattern indicates early stage concern',
      priority: 'medium',
      time: '3 hours ago'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-8 h-8 text-destructive" />
          <div>
            <h3 className="text-xl font-bold text-foreground">Critical Patient Alerts</h3>
            <p className="text-muted-foreground">High-priority cases requiring immediate attention</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-2xl border-2 ${alert.priority === 'urgent' ? 'bg-destructive/5 border-destructive' :
              alert.priority === 'high' ? 'bg-[#F59E0B]/5 border-[#F59E0B]' :
                'bg-muted border-border'
              }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className={`w-6 h-6 ${alert.priority === 'urgent' ? 'text-destructive' :
                  alert.priority === 'high' ? 'text-[#F59E0B]' : 'text-muted-foreground'
                  }`} />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{alert.patient}</h4>
                  <p className="text-sm text-muted-foreground">{alert.alert}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{alert.time}</span>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all">
                Review Case
              </button>
              <button className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-all">
                Contact Patient
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
