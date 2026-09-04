import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Calendar, Activity, Image as ImageIcon, TrendingUp, AlertCircle, Search } from 'lucide-react';

interface Symptom {
  id: string;
  date: string;
  symptom: string;
  severity: number;
  description: string;
  images?: string[];
  aiDetection?: string;
}

export function SymptomLogger() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState<Symptom | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const symptoms: Symptom[] = [
    {
      id: '1',
      date: '2026-02-24',
      symptom: 'Persistent Fatigue',
      severity: 6,
      description: 'Feeling unusually tired throughout the day, even after adequate sleep.',
      aiDetection: 'Pattern detected: Similar symptoms 3 times this month'
    },
    {
      id: '2',
      date: '2026-02-20',
      symptom: 'Mild Headache',
      severity: 4,
      description: 'Dull headache in the afternoon',
      aiDetection: null
    },
    {
      id: '3',
      date: '2026-02-15',
      symptom: 'Digestive Discomfort',
      severity: 5,
      description: 'Bloating after meals',
      aiDetection: 'Pattern detected: Occurs after dairy consumption'
    }
  ];

  const getSeverityColor = (severity: number) => {
    if (severity <= 3) return 'bg-green-500';
    if (severity <= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getSeverityLabel = (severity: number) => {
    if (severity <= 3) return 'Mild';
    if (severity <= 6) return 'Moderate';
    return 'Severe';
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <p className="text-muted-foreground">Track your symptoms and let AI detect patterns</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          Log Symptom
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search symptoms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>

      {/* AI Pattern Detection Alert */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-6"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-100 rounded-xl">
            <Activity className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-purple-900 mb-1">AI Pattern Detected</h3>
            <p className="text-sm text-purple-700 mb-3">
              We've identified a recurring pattern in your symptoms. Fatigue symptoms have appeared 3 times this month.
            </p>
            <button className="text-sm font-medium text-purple-600 hover:text-purple-800">
              View Analysis →
            </button>
          </div>
        </div>
      </motion.div>

      {/* Timeline View */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h3 className="text-xl font-semibold text-primary mb-6">Symptom Timeline</h3>
        <div className="space-y-4">
          {symptoms.map((symptom, index) => (
            <motion.div
              key={symptom.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4 group cursor-pointer"
              onClick={() => setSelectedSymptom(symptom)}
            >
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full ${getSeverityColor(symptom.severity)} group-hover:scale-125 transition-transform`} />
                {index < symptoms.length - 1 && (
                  <div className="w-0.5 h-full bg-border my-2" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-6">
                <div className="bg-muted/30 rounded-xl p-4 group-hover:bg-muted/50 transition-colors border border-transparent group-hover:border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-primary">{symptom.symptom}</h4>
                      <p className="text-sm text-muted-foreground">{new Date(symptom.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`px-3 py-1 text-xs font-medium text-white rounded-full ${getSeverityColor(symptom.severity)}`}>
                        {getSeverityLabel(symptom.severity)}
                      </span>
                      <span className="text-xs text-muted-foreground">{symptom.severity}/10</span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80 mb-3">{symptom.description}</p>
                  {symptom.aiDetection && (
                    <div className="flex items-center gap-2 text-sm text-purple-600 bg-purple-50 px-3 py-2 rounded-lg">
                      <Activity className="w-4 h-4" />
                      <span>{symptom.aiDetection}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add Symptom Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl border border-border p-6 max-w-md w-full max-h-[90vh] overflow-auto"
          >
            <h3 className="text-2xl font-semibold text-primary mb-6">Log New Symptom</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Symptom Type</label>
                <input
                  type="text"
                  placeholder="e.g., Headache, Fatigue, Pain"
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Severity (1-10)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  defaultValue="5"
                  className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Mild</span>
                  <span>Moderate</span>
                  <span>Severe</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe the symptom in detail..."
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Date</label>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Attach Images (Optional)</label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-secondary transition-colors cursor-pointer">
                  <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload images</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-3 border border-border rounded-xl hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all"
              >
                Save Symptom
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
