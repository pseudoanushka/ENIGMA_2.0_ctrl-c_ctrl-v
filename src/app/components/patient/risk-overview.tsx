import { motion } from 'motion/react';
import { AlertCircle, TrendingUp, TrendingDown, Activity, Info, Brain, Dna, Shield } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export function RiskOverview() {
  const riskScore = 28; // Low risk (0-33 low, 34-66 moderate, 67-100 high)
  const riskLevel = riskScore < 34 ? 'Low' : riskScore < 67 ? 'Moderate' : 'High';
  const riskColor = riskScore < 34 ? 'text-green-600' : riskScore < 67 ? 'text-yellow-600' : 'text-red-600';
  const riskBgColor = riskScore < 34 ? 'bg-green-50' : riskScore < 67 ? 'bg-yellow-50' : 'bg-red-50';
  const riskBorderColor = riskScore < 34 ? 'border-green-200' : riskScore < 67 ? 'border-yellow-200' : 'border-red-200';

  const trendData = [
    { month: 'Jan', risk: 32 },
    { month: 'Feb', risk: 30 },
    { month: 'Mar', risk: 31 },
    { month: 'Apr', risk: 29 },
    { month: 'May', risk: 28 },
    { month: 'Jun', risk: 28 }
  ];

  const genomicData = [
    { factor: 'BRCA1/2', value: 15 },
    { factor: 'TP53', value: 8 },
    { factor: 'Lynch Syndrome', value: 12 },
    { factor: 'PTEN', value: 5 },
    { factor: 'APC', value: 10 }
  ];

  const futurePrediction = [
    { year: '2026', risk: 28 },
    { year: '2027', risk: 29 },
    { year: '2028', risk: 31 },
    { year: '2029', risk: 33 },
    { year: '2030', risk: 35 },
    { year: '2031', risk: 38 }
  ];

  const lifestyleFactors = [
    { category: 'Exercise', score: 85, max: 100 },
    { category: 'Diet', score: 72, max: 100 },
    { category: 'Stress', score: 45, max: 100 },
    { category: 'Sleep', score: 68, max: 100 },
    { category: 'Hydration', score: 90, max: 100 }
  ];

  return (
    <div className="space-y-6">
      {/* AI Risk Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden rounded-3xl border-2 ${riskBorderColor} ${riskBgColor} p-8`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/40 to-transparent rounded-full -mr-32 -mt-32" />
        <div className="relative">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-6 h-6 text-secondary" />
                <span className="text-sm font-medium text-secondary">AI-Powered Analysis</span>
              </div>
              <h2 className="text-3xl font-bold text-primary mb-2">Cancer Risk Assessment</h2>
              <p className="text-foreground/60">Based on genome sequencing and lifestyle factors</p>
            </div>
            <button className="p-2 hover:bg-white/50 rounded-xl transition-colors">
              <Info className="w-5 h-5 text-foreground/60" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-sm text-foreground/60 mb-2">Current Risk Level</div>
              <div className={`text-5xl font-bold ${riskColor} mb-2`}>{riskScore}%</div>
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1 ${riskBgColor} ${riskColor} rounded-full text-sm font-medium`}>
                  {riskLevel} Risk
                </div>
                <TrendingDown className="w-5 h-5 text-green-600" />
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-sm text-foreground/60 mb-2">AI Confidence Score</div>
              <div className="text-5xl font-bold text-secondary mb-2">97%</div>
              <div className="text-sm text-foreground/60">High confidence prediction</div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-sm text-foreground/60 mb-2">Next Screening</div>
              <div className="text-3xl font-bold text-primary mb-2">6 months</div>
              <div className="text-sm text-foreground/60">December 2026</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Risk Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-primary">Risk Trend</h3>
              <p className="text-sm text-muted-foreground">Last 6 months</p>
            </div>
            <TrendingDown className="w-5 h-5 text-green-600" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1CA7A6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#1CA7A6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '12px'
                }}
              />
              <Area type="monotone" dataKey="risk" stroke="#1CA7A6" strokeWidth={3} fill="url(#colorRisk)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Genomic Factors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-primary">Genomic Analysis</h3>
              <p className="text-sm text-muted-foreground">Key genetic markers</p>
            </div>
            <Dna className="w-5 h-5 text-secondary" />
          </div>
          <div className="space-y-4">
            {genomicData.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{item.factor}</span>
                  <span className="text-sm text-muted-foreground">{item.value}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                    className={`h-full rounded-full ${
                      item.value < 10 ? 'bg-green-500' : item.value < 15 ? 'bg-yellow-500' : 'bg-orange-500'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Predictive Timeline & Lifestyle */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* 5-Year Prediction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl border border-border p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-secondary/10 rounded-xl">
              <Activity className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary">Predictive Risk Timeline</h3>
              <p className="text-sm text-muted-foreground">5-year projection</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={futurePrediction}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="year" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '12px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="risk" 
                stroke="#0B3C5D" 
                strokeWidth={3} 
                dot={{ fill: '#1CA7A6', r: 5 }}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-blue-50 rounded-xl flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-900">
              <strong>AI Insight:</strong> Maintaining current lifestyle improvements can reduce future risk by 12-15%
            </div>
          </div>
        </motion.div>

        {/* Lifestyle Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl border border-border p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-green-100 rounded-xl">
              <Activity className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary">Lifestyle Improvement Score</h3>
              <p className="text-sm text-muted-foreground">Gamified health tracking</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={lifestyleFactors}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="category" stroke="#64748b" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#64748b" />
              <Radar 
                name="Your Score" 
                dataKey="score" 
                stroke="#1CA7A6" 
                fill="#1CA7A6" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="p-3 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">76%</div>
              <div className="text-xs text-green-900">Overall Score</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">+8%</div>
              <div className="text-xs text-blue-900">This Month</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Explainable AI Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-200 p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-purple-100 rounded-xl">
            <Brain className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-purple-900">Explainable AI Analysis</h3>
            <p className="text-sm text-purple-700">Understanding your risk assessment</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-200">
            <div className="text-sm text-purple-700 mb-2">Primary Contributing Factors</div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                <span>Family History: 35%</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <span>Lifestyle: 28%</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Genetic Markers: 22%</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>Environmental: 15%</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-200">
            <div className="text-sm text-purple-700 mb-2">Key Genetic Mutations</div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span>BRCA2 variant</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">Detected</span>
              </li>
              <li className="flex items-center justify-between">
                <span>TP53 normal</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Clear</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Lynch genes</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Clear</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-200">
            <div className="text-sm text-purple-700 mb-2">AI Confidence Breakdown</div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Data Quality</span>
                  <span className="font-medium">99%</span>
                </div>
                <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: '99%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Model Accuracy</span>
                  <span className="font-medium">97%</span>
                </div>
                <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: '97%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Sample Size</span>
                  <span className="font-medium">95%</span>
                </div>
                <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: '95%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Data Security Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-2xl border border-secondary/20 p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary/20 rounded-xl">
              <Shield className="w-8 h-8 text-secondary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary">Your Data is Protected</h3>
              <p className="text-sm text-muted-foreground">End-to-end encrypted • HIPAA compliant • ISO 27001 certified</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-xl">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-green-800">Secure Connection</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
