import { motion } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown,
  AlertCircle, 
  CheckCircle2, 
  Activity,
  Calendar,
  FileText,
  Heart
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const riskTrendData = [
  { month: 'Jan', risk: 15 },
  { month: 'Feb', risk: 18 },
  { month: 'Mar', risk: 14 },
  { month: 'Apr', risk: 12 },
  { month: 'May', risk: 10 },
  { month: 'Jun', risk: 8 }
];

const lifestyleData = [
  { category: 'Exercise', score: 75 },
  { category: 'Diet', score: 60 },
  { category: 'Sleep', score: 80 },
  { category: 'Stress', score: 50 },
  { category: 'Hydration', score: 70 }
];

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0B3C5D] to-[#1CA7A6] p-8 text-white"
      >
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Good Morning, John! 👋</h2>
          <p className="text-white/90 mb-4">Your health is trending positively. Keep up the great work!</p>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>Last scan: 5 days ago</span>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-border hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">-20%</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Cancer Risk Score</p>
          <p className="text-2xl font-bold text-green-600">Low (8%)</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-border hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400">98%</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">AI Confidence</p>
          <p className="text-2xl font-bold text-blue-600">High</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-border hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-teal-600" />
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-teal-100 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400">+2</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Reports Analyzed</p>
          <p className="text-2xl font-bold text-teal-600">8</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-border hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Next Checkup</p>
          <p className="text-2xl font-bold text-purple-600">14 days</p>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-border"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">Risk Trend Analysis</h3>
              <p className="text-sm text-muted-foreground">Last 6 months</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <TrendingDown className="w-4 h-4" />
              <span>Improving</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={riskTrendData}>
              <defs>
                <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1CA7A6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#1CA7A6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Area type="monotone" dataKey="risk" stroke="#1CA7A6" fillOpacity={1} fill="url(#riskGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Lifestyle Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-border"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-1">Lifestyle Score</h3>
            <p className="text-sm text-muted-foreground">Health factors analysis</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={lifestyleData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="category" stroke="#64748b" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#64748b" />
              <Radar name="Score" dataKey="score" stroke="#0B3C5D" fill="#1CA7A6" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Genome Analysis Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-border"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-1">Genome Analysis Summary</h3>
            <p className="text-sm text-muted-foreground">Latest sequencing results</p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-primary text-white hover:opacity-90 transition-opacity">
            View Full Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-900 dark:text-green-400">No Risk Markers</span>
            </div>
            <p className="text-sm text-green-800 dark:text-green-300">BRCA1, BRCA2, TP53</p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-900 dark:text-blue-400">Genes Analyzed</span>
            </div>
            <p className="text-sm text-blue-800 dark:text-blue-300">142 cancer-related genes</p>
          </div>

          <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-purple-900 dark:text-purple-400">Sequencing Quality</span>
            </div>
            <p className="text-sm text-purple-800 dark:text-purple-300">Excellent (99.8%)</p>
          </div>
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 border border-border"
      >
        <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
        <div className="space-y-3">
          {[
            { text: 'Schedule your annual screening in 2 weeks', priority: 'high' },
            { text: 'Continue your current exercise routine - showing positive results', priority: 'medium' },
            { text: 'Consider adding more antioxidant-rich foods to your diet', priority: 'medium' },
            { text: 'Your stress levels are optimal - keep up the meditation practice', priority: 'low' }
          ].map((rec, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                rec.priority === 'high' ? 'bg-red-500' : 
                rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
              }`}></div>
              <p className="text-sm flex-1">{rec.text}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
