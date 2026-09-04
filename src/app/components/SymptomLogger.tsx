import { motion } from 'motion/react';
import { useState } from 'react';
import { Plus, Calendar, Image, TrendingUp, AlertCircle } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';

export function SymptomLogger() {
  const [symptoms, setSymptoms] = useState([
    {
      id: 1,
      symptom: 'Headache',
      severity: 6,
      date: '2026-02-25',
      notes: 'Mild headache, worse in the morning',
      aiDetection: 'Pattern detected: Recurring every 3 days'
    },
    {
      id: 2,
      symptom: 'Fatigue',
      severity: 7,
      date: '2026-02-24',
      notes: 'Feeling tired throughout the day',
      aiDetection: 'Consider checking iron levels'
    },
    {
      id: 3,
      symptom: 'Nausea',
      severity: 4,
      date: '2026-02-23',
      notes: 'Occasional nausea after meals',
      aiDetection: 'No concerning patterns'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newSymptom, setNewSymptom] = useState('');
  const [newSeverity, setNewSeverity] = useState([5]);
  const [newNotes, setNewNotes] = useState('');

  const getSeverityColor = (severity: number) => {
    if (severity <= 3) return '#10B981';
    if (severity <= 6) return '#F59E0B';
    return '#DC2626';
  };

  const handleAddSymptom = () => {
    if (!newSymptom) return;

    const aiDetections = [
      'Pattern analysis in progress',
      'No concerning patterns detected',
      'Consider medical consultation',
      'Similar symptoms logged 2 weeks ago',
      'AI recommends follow-up test'
    ];

    setSymptoms([
      {
        id: symptoms.length + 1,
        symptom: newSymptom,
        severity: newSeverity[0],
        date: new Date().toISOString().split('T')[0],
        notes: newNotes,
        aiDetection: aiDetections[Math.floor(Math.random() * aiDetections.length)]
      },
      ...symptoms
    ]);

    setNewSymptom('');
    setNewSeverity([5]);
    setNewNotes('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Symptom Logger</h2>
          <p className="text-muted-foreground">Track symptoms and let AI detect patterns</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Symptom
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-card rounded-2xl p-6 border border-border"
        >
          <h3 className="font-semibold text-foreground mb-4">Log New Symptom</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-foreground mb-2">Symptom</label>
              <input
                type="text"
                value={newSymptom}
                onChange={(e) => setNewSymptom(e.target.value)}
                placeholder="e.g., Headache, Fatigue, Nausea"
                className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            <div>
              <label className="block text-sm text-foreground mb-2">
                Severity: {newSeverity[0]}/10
              </label>
              <Slider.Root
                value={newSeverity}
                onValueChange={setNewSeverity}
                max={10}
                min={1}
                step={1}
                className="relative flex items-center w-full h-5"
              >
                <Slider.Track className="bg-muted relative grow rounded-full h-2">
                  <Slider.Range
                    className="absolute h-full rounded-full"
                    style={{ backgroundColor: getSeverityColor(newSeverity[0]) }}
                  />
                </Slider.Track>
                <Slider.Thumb
                  className="block w-5 h-5 bg-white border-2 rounded-full shadow-lg hover:bg-muted transition-all focus:outline-none focus:ring-2 focus:ring-secondary"
                  style={{ borderColor: getSeverityColor(newSeverity[0]) }}
                />
              </Slider.Root>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Mild</span>
                <span>Moderate</span>
                <span>Severe</span>
              </div>
            </div>

            <div>
              <label className="block text-sm text-foreground mb-2">Notes (Optional)</label>
              <textarea
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                placeholder="Additional details about the symptom..."
                rows={3}
                className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
              />
            </div>

            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-secondary transition-all cursor-pointer">
              <Image className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Attach image (optional)</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddSymptom}
                className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all"
              >
                Log Symptom
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-6 py-3 bg-muted text-foreground rounded-xl hover:bg-muted/80 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Timeline View */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-5 h-5 text-secondary" />
          <h3 className="font-semibold text-foreground">Symptom Timeline</h3>
        </div>

        <div className="space-y-4">
          {symptoms.map((symptom, index) => (
            <motion.div
              key={symptom.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline Line */}
              {index < symptoms.length - 1 && (
                <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-border"></div>
              )}

              <div className="flex gap-4">
                {/* Date Circle */}
                <div className="flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold shadow-lg"
                    style={{ backgroundColor: getSeverityColor(symptom.severity) }}
                  >
                    {new Date(symptom.date).getDate()}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-muted rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{symptom.symptom}</h4>
                      <p className="text-sm text-muted-foreground">{symptom.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: `${getSeverityColor(symptom.severity)}20`,
                          color: getSeverityColor(symptom.severity)
                        }}
                      >
                        Severity: {symptom.severity}/10
                      </span>
                    </div>
                  </div>

                  {symptom.notes && (
                    <p className="text-sm text-foreground mb-3">{symptom.notes}</p>
                  )}

                  {/* AI Detection */}
                  <div className="bg-secondary/10 rounded-lg p-3 border border-secondary/20">
                    <div className="flex items-start gap-2">
                      {symptom.aiDetection.includes('Pattern') || symptom.aiDetection.includes('Consider') ? (
                        <AlertCircle className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="text-xs font-semibold text-foreground">AI Pattern Detection</p>
                        <p className="text-xs text-muted-foreground mt-1">{symptom.aiDetection}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-secondary" />
            <span className="text-2xl font-bold text-foreground">12</span>
          </div>
          <p className="text-sm text-muted-foreground">Symptoms This Month</p>
        </div>

        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-8 h-8 text-[#F59E0B]" />
            <span className="text-2xl font-bold text-foreground">3</span>
          </div>
          <p className="text-sm text-muted-foreground">Patterns Detected</p>
        </div>

        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">18</span>
          </div>
          <p className="text-sm text-muted-foreground">Days Tracked</p>
        </div>
      </div>
    </div>
  );
}
