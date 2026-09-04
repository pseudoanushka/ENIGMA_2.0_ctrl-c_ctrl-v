import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Calendar, AlertCircle, TrendingUp, Image as ImageIcon } from 'lucide-react';

interface Symptom {
  id: number;
  name: string;
  severity: number;
  date: string;
  notes: string;
  category: string;
}

const mockSymptoms: Symptom[] = [
  { id: 1, name: 'Mild headache', severity: 3, date: '2026-02-24', notes: 'After lunch', category: 'neurological' },
  { id: 2, name: 'Fatigue', severity: 4, date: '2026-02-23', notes: 'Throughout the day', category: 'general' },
  { id: 3, name: 'Nausea', severity: 2, date: '2026-02-22', notes: 'Morning only', category: 'digestive' }
];

export default function SymptomLogger() {
  const [symptoms, setSymptoms] = useState<Symptom[]>(mockSymptoms);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSymptom, setNewSymptom] = useState({
    name: '',
    severity: 5,
    notes: '',
    category: 'general'
  });

  const handleAddSymptom = () => {
    const symptom: Symptom = {
      id: symptoms.length + 1,
      ...newSymptom,
      date: new Date().toISOString().split('T')[0]
    };
    setSymptoms([symptom, ...symptoms]);
    setShowAddForm(false);
    setNewSymptom({ name: '', severity: 5, notes: '', category: 'general' });
  };

  const getSeverityColor = (severity: number) => {
    if (severity <= 3) return 'bg-green-500';
    if (severity <= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Symptom Logger</h2>
          <p className="text-muted-foreground">Track your symptoms for AI pattern detection</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0B3C5D] to-[#1CA7A6] text-white rounded-xl hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Add Symptom</span>
        </button>
      </div>

      {/* Add Symptom Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-border"
        >
          <h3 className="font-semibold mb-4">Log New Symptom</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Symptom Name</label>
              <input
                type="text"
                value={newSymptom.name}
                onChange={(e) => setNewSymptom({ ...newSymptom, name: e.target.value })}
                placeholder="e.g., Headache, Fatigue"
                className="w-full px-4 py-2 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Category</label>
              <select
                value={newSymptom.category}
                onChange={(e) => setNewSymptom({ ...newSymptom, category: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="general">General</option>
                <option value="neurological">Neurological</option>
                <option value="digestive">Digestive</option>
                <option value="respiratory">Respiratory</option>
                <option value="pain">Pain</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">Severity (1-10): {newSymptom.severity}</label>
              <input
                type="range"
                min="1"
                max="10"
                value={newSymptom.severity}
                onChange={(e) => setNewSymptom({ ...newSymptom, severity: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Mild</span>
                <span>Moderate</span>
                <span>Severe</span>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Notes (Optional)</label>
              <textarea
                value={newSymptom.notes}
                onChange={(e) => setNewSymptom({ ...newSymptom, notes: e.target.value })}
                placeholder="Additional details about the symptom..."
                rows={3}
                className="w-full px-4 py-2 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddSymptom}
                disabled={!newSymptom.name}
                className="flex-1 py-2 bg-gradient-to-r from-[#0B3C5D] to-[#1CA7A6] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Symptom
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 border border-border rounded-xl hover:bg-muted transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* AI Insights */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 border border-border">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">AI Pattern Detection</h3>
            <p className="text-sm text-muted-foreground mb-3">
              No concerning patterns detected in your recent symptoms. Your symptom severity is trending downward.
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs">
                Low Risk
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs">
                Improving
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Symptom Timeline */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-border">
        <h3 className="font-semibold mb-4">Symptom Timeline</h3>
        <div className="space-y-4">
          {symptoms.map((symptom, idx) => (
            <motion.div
              key={symptom.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex flex-col items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getSeverityColor(symptom.severity)}`}></div>
                <div className="w-px h-full bg-border"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{symptom.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(symptom.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Severity:</span>
                    <span className="px-2 py-1 rounded-lg bg-background font-semibold">{symptom.severity}/10</span>
                  </div>
                </div>
                {symptom.notes && (
                  <p className="text-sm text-muted-foreground mb-2">{symptom.notes}</p>
                )}
                <span className="inline-block px-2 py-1 rounded-lg bg-background text-xs capitalize">
                  {symptom.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="p-4 rounded-xl border-2 border-dashed border-border hover:border-primary hover:bg-muted transition-all flex items-center gap-3">
          <ImageIcon className="w-5 h-5 text-muted-foreground" />
          <div className="text-left">
            <p className="font-semibold text-sm">Attach Image</p>
            <p className="text-xs text-muted-foreground">Add photos of visible symptoms</p>
          </div>
        </button>

        <button className="p-4 rounded-xl border-2 border-dashed border-border hover:border-primary hover:bg-muted transition-all flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-muted-foreground" />
          <div className="text-left">
            <p className="font-semibold text-sm">Emergency Alert</p>
            <p className="text-xs text-muted-foreground">Report severe symptoms</p>
          </div>
        </button>
      </div>
    </div>
  );
}
