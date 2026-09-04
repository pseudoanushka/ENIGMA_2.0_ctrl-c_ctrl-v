import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, Dna, Brain } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export function RiskOverviewCard() {
  const riskScore = 20; // Low risk
  const riskLevel = riskScore < 30 ? 'Low' : riskScore < 60 ? 'Moderate' : 'High';
  const riskColor = riskScore < 30 ? '#10B981' : riskScore < 60 ? '#F59E0B' : '#DC2626';

  const genomeData = [
    { name: 'BRCA1', value: 30, status: 'normal' },
    { name: 'TP53', value: 25, status: 'normal' },
    { name: 'PTEN', value: 20, status: 'attention' },
    { name: 'Other', value: 25, status: 'normal' }
  ];

  const COLORS = ['#10B981', '#1CA7A6', '#F59E0B', '#0B3C5D'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-card via-card to-primary/5 rounded-3xl p-8 border border-border shadow-xl"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Cancer Risk Overview</h2>
          <p className="text-muted-foreground">AI-powered analysis based on genome sequencing</p>
        </div>
        <div className="px-4 py-2 bg-secondary/10 rounded-full flex items-center gap-2">
          <Brain className="w-4 h-4 text-secondary" />
          <span className="text-xs text-secondary">AI Analyzed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Score */}
        <div className="lg:col-span-1">
          <div className="relative">
            <div className="w-48 h-48 mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { value: riskScore },
                      { value: 100 - riskScore }
                    ]}
                    cx="50%"
                    cy="50%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                  >
                    <Cell fill={riskColor} />
                    <Cell fill="#E2E8F0" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground">{riskScore}%</div>
                <div className="text-sm text-muted-foreground">Risk Score</div>
              </div>
            </div>
          </div>
          <div className={`mt-4 px-4 py-2 rounded-full text-center font-semibold`} style={{ backgroundColor: `${riskColor}20`, color: riskColor }}>
            {riskLevel} Risk
          </div>
        </div>

        {/* Genome Analysis */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Dna className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Genome Analysis Summary</h3>
          </div>

          {genomeData.map((gene, index) => (
            <div key={index} className="bg-muted/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${gene.status === 'normal' ? 'bg-[#10B981]' : 'bg-[#F59E0B]'}`}></div>
                  <span className="font-semibold text-foreground">{gene.name}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  gene.status === 'normal' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#F59E0B]/10 text-[#F59E0B]'
                }`}>
                  {gene.status === 'normal' ? 'Normal' : 'Monitor'}
                </span>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${gene.status === 'normal' ? 'bg-[#10B981]' : 'bg-[#F59E0B]'}`}
                  style={{ width: `${gene.value * 2}%` }}
                ></div>
              </div>
            </div>
          ))}

          <div className="mt-6 p-4 bg-secondary/10 rounded-xl border border-secondary/20">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">AI Recommendation</h4>
                <p className="text-sm text-muted-foreground">
                  Your genetic markers show low risk. Continue regular screenings and maintain a healthy lifestyle. 
                  The PTEN gene requires monitoring - schedule a follow-up in 6 months.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trend Indicator */}
      <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-[#10B981]" />
          <span className="text-sm text-foreground">Risk decreased by 5% this month</span>
        </div>
        <button className="text-sm text-secondary hover:underline">View Full Analysis →</button>
      </div>
    </motion.div>
  );
}
