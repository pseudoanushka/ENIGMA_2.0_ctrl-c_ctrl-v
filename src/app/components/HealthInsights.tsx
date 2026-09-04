import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Activity, Heart, Zap, Target } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

export function HealthInsights() {
  const weeklyData = [
    { day: 'Mon', steps: 8200, water: 2.1, sleep: 7.5 },
    { day: 'Tue', steps: 9500, water: 2.5, sleep: 8.0 },
    { day: 'Wed', steps: 7800, water: 2.0, sleep: 6.5 },
    { day: 'Thu', steps: 10200, water: 2.8, sleep: 7.8 },
    { day: 'Fri', steps: 8900, water: 2.3, sleep: 7.2 },
    { day: 'Sat', steps: 12000, water: 3.0, sleep: 8.5 },
    { day: 'Sun', steps: 6500, water: 1.8, sleep: 9.0 }
  ];

  const riskComparison = [
    { factor: 'Exercise', you: 75, average: 55 },
    { factor: 'Diet', you: 68, average: 60 },
    { factor: 'Sleep', you: 82, average: 65 },
    { factor: 'Stress', you: 45, average: 50 },
    { factor: 'Checkups', you: 90, average: 45 }
  ];

  const insights = [
    {
      title: 'Exercise Goal Achieved',
      description: 'You hit your weekly exercise target! Keep up the great work.',
      trend: 'up',
      impact: 'Reduces cancer risk by 15%',
      color: '#10B981'
    },
    {
      title: 'Sleep Pattern Improving',
      description: 'Your average sleep increased to 7.8 hours this week.',
      trend: 'up',
      impact: 'Better immune function',
      color: '#1CA7A6'
    },
    {
      title: 'Hydration Needs Attention',
      description: 'You averaged 2.3L water daily. Target: 3L',
      trend: 'down',
      impact: 'Optimal hydration supports cellular health',
      color: '#F59E0B'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Health Insights</h2>
        <p className="text-muted-foreground">Personalized analysis and recommendations</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#10B981]/10 to-[#10B981]/5 border border-[#10B981]/20 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <Activity className="w-8 h-8 text-[#10B981]" />
            <div className="flex items-center gap-1 text-[#10B981]">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-semibold">+12%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">8,871</h3>
          <p className="text-sm text-muted-foreground">Avg Daily Steps</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#1CA7A6]/10 to-[#1CA7A6]/5 border border-[#1CA7A6]/20 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <Heart className="w-8 h-8 text-[#1CA7A6]" />
            <div className="flex items-center gap-1 text-[#1CA7A6]">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-semibold">+8%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">7.8h</h3>
          <p className="text-sm text-muted-foreground">Avg Sleep</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#0B3C5D]/10 to-[#0B3C5D]/5 border border-[#0B3C5D]/20 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <Zap className="w-8 h-8 text-[#0B3C5D]" />
            <div className="flex items-center gap-1 text-[#0B3C5D]">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-semibold">+5%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">82</h3>
          <p className="text-sm text-muted-foreground">Health Score</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-[#F59E0B]/10 to-[#F59E0B]/5 border border-[#F59E0B]/20 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <Target className="w-8 h-8 text-[#F59E0B]" />
            <div className="flex items-center gap-1 text-[#F59E0B]">
              <TrendingDown className="w-4 h-4" />
              <span className="text-xs font-semibold">-3%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">2.3L</h3>
          <p className="text-sm text-muted-foreground">Daily Water</p>
        </motion.div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-2xl p-6 border border-border"
          >
            <div className="flex items-start gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${insight.color}20` }}
              >
                {insight.trend === 'up' ? (
                  <TrendingUp className="w-5 h-5" style={{ color: insight.color }} />
                ) : (
                  <TrendingDown className="w-5 h-5" style={{ color: insight.color }} />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">{insight.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                <div
                  className="px-3 py-1 rounded-full text-xs font-semibold inline-block"
                  style={{ backgroundColor: `${insight.color}20`, color: insight.color }}
                >
                  {insight.impact}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Weekly Activity */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="font-semibold text-foreground mb-6">Weekly Activity Summary</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="day" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="steps" stroke="#10B981" strokeWidth={2} name="Steps" />
            <Line type="monotone" dataKey="sleep" stroke="#1CA7A6" strokeWidth={2} name="Sleep (hours)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Risk Comparison */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-foreground">Your Health vs Average</h3>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-muted-foreground">You</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted"></div>
              <span className="text-muted-foreground">Average</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={riskComparison}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="factor" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Bar dataKey="you" fill="#0B3C5D" radius={[8, 8, 0, 0]} />
            <Bar dataKey="average" fill="#E2E8F0" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Lifestyle Recommendations */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
        <h3 className="font-semibold text-foreground mb-4">AI-Powered Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 bg-card rounded-xl p-4">
            <div className="w-8 h-8 rounded-lg bg-[#10B981] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">1</span>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Increase Water Intake</h4>
              <p className="text-sm text-muted-foreground">
                Try to drink at least 3L of water daily. Set hourly reminders to help you reach this goal.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-card rounded-xl p-4">
            <div className="w-8 h-8 rounded-lg bg-[#1CA7A6] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">2</span>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Add Strength Training</h4>
              <p className="text-sm text-muted-foreground">
                Include 2-3 strength training sessions per week to boost metabolism and reduce cancer risk.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-card rounded-xl p-4">
            <div className="w-8 h-8 rounded-lg bg-[#0B3C5D] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">3</span>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Maintain Sleep Schedule</h4>
              <p className="text-sm text-muted-foreground">
                Your sleep pattern is excellent. Keep going to bed and waking up at consistent times.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
