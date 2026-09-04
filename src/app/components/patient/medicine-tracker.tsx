import { useState } from 'react';
import { motion } from 'motion/react';
import { Pill, Plus, Calendar, Clock, Check, AlertCircle, Bell } from 'lucide-react';

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  timeSlots: string[];
  startDate: string;
  endDate: string;
  takenToday: boolean[];
  sideEffects?: string[];
}

export function MedicineTracker() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const medicines: Medicine[] = [
    {
      id: '1',
      name: 'Tamoxifen',
      dosage: '20mg',
      frequency: 'Once daily',
      timeSlots: ['09:00'],
      startDate: '2026-01-15',
      endDate: '2026-07-15',
      takenToday: [true],
      sideEffects: ['Mild nausea']
    },
    {
      id: '2',
      name: 'Vitamin D3',
      dosage: '2000 IU',
      frequency: 'Once daily',
      timeSlots: ['09:00'],
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      takenToday: [true]
    },
    {
      id: '3',
      name: 'Omega-3',
      dosage: '1000mg',
      frequency: 'Twice daily',
      timeSlots: ['09:00', '20:00'],
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      takenToday: [true, false]
    }
  ];

  const daysInMonth = Array.from({ length: 28 }, (_, i) => i + 1);
  const takenDays = [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 15, 16, 17, 18, 19, 22, 23, 24, 25];

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200 p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-200 rounded-xl">
              <Check className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <div className="text-3xl font-bold text-green-700">89%</div>
              <div className="text-sm text-green-600">Adherence Rate</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-200 rounded-xl">
              <Pill className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-700">3</div>
              <div className="text-sm text-blue-600">Active Medications</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200 p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-200 rounded-xl">
              <Calendar className="w-5 h-5 text-purple-700" />
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-700">19</div>
              <div className="text-sm text-purple-600">Days This Month</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Notification Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl border border-border p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-secondary/10 rounded-xl">
              <Bell className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-primary">Medication Reminders</h3>
              <p className="text-sm text-muted-foreground">Get notified when it's time to take your medicine</p>
            </div>
          </div>
          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`relative w-14 h-7 rounded-full transition-colors ${
              notificationsEnabled ? 'bg-secondary' : 'bg-muted'
            }`}
          >
            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
              notificationsEnabled ? 'translate-x-8' : 'translate-x-1'
            }`} />
          </button>
        </div>
      </motion.div>

      {/* Today's Medications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-2xl border border-border p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-primary">Today's Schedule</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-xl hover:bg-secondary/20 transition-colors">
            <Plus className="w-4 h-4" />
            Add Medicine
          </button>
        </div>

        <div className="space-y-4">
          {medicines.map((medicine, index) => (
            <div key={medicine.id} className="bg-muted/30 rounded-xl p-4 border border-border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${
                    medicine.takenToday.every(t => t) ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    <Pill className={`w-5 h-5 ${
                      medicine.takenToday.every(t => t) ? 'text-green-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">{medicine.name}</h4>
                    <p className="text-sm text-muted-foreground">{medicine.dosage} • {medicine.frequency}</p>
                  </div>
                </div>
                {medicine.takenToday.every(t => t) && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    <Check className="w-4 h-4" />
                    Completed
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                {medicine.timeSlots.map((time, idx) => (
                  <button
                    key={idx}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      medicine.takenToday[idx]
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-white text-foreground border border-border hover:border-secondary'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>{time}</span>
                    {medicine.takenToday[idx] && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>

              {medicine.sideEffects && medicine.sideEffects.length > 0 && (
                <div className="mt-3 flex items-center gap-2 text-sm text-orange-600 bg-orange-50 px-3 py-2 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  <span>Side effects: {medicine.sideEffects.join(', ')}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Calendar View */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-card rounded-2xl border border-border p-6"
      >
        <h3 className="text-xl font-semibold text-primary mb-6">February 2026 Adherence</h3>
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
          {daysInMonth.map(day => (
            <div
              key={day}
              className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all ${
                takenDays.includes(day)
                  ? 'bg-green-100 text-green-700 border-2 border-green-300'
                  : day === 26
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                  : 'bg-muted/30 text-muted-foreground'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded" />
            <span className="text-muted-foreground">Taken</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 border-2 border-blue-300 rounded" />
            <span className="text-muted-foreground">Today</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-muted/30 rounded" />
            <span className="text-muted-foreground">Missed/Future</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
