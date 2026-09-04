import { motion } from 'motion/react';
import { useState } from 'react';
import { Pill, Calendar, CheckCircle, Clock, AlertCircle, Bell, Plus } from 'lucide-react';

export function MedicineTracker() {
  const [medicines] = useState([
    {
      id: 1,
      name: 'Vitamin D3',
      dosage: '1000 IU',
      frequency: 'Once daily',
      time: '09:00 AM',
      taken: true,
      sideEffects: []
    },
    {
      id: 2,
      name: 'Omega-3',
      dosage: '500mg',
      frequency: 'Twice daily',
      time: '09:00 AM, 09:00 PM',
      taken: true,
      sideEffects: []
    },
    {
      id: 3,
      name: 'Multivitamin',
      dosage: '1 tablet',
      frequency: 'Once daily',
      time: '08:00 AM',
      taken: false,
      sideEffects: []
    }
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const monthDays = Array.from({ length: 28 }, (_, i) => i + 1);
  
  const medicineCalendar = monthDays.map((day) => {
    const completed = Math.random() > 0.3;
    return { day, completed };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Medicine Tracker</h2>
          <p className="text-muted-foreground">Track your medications and never miss a dose</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
              notificationsEnabled
                ? 'bg-secondary/10 text-secondary border border-secondary/20'
                : 'bg-muted text-muted-foreground border border-border'
            }`}
          >
            <Bell className="w-4 h-4" />
            {notificationsEnabled ? 'Reminders On' : 'Reminders Off'}
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Medicine
          </button>
        </div>
      </div>

      {/* Today's Medicines */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-foreground">Today's Schedule</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">
              {medicines.filter(m => m.taken).length} of {medicines.length} taken
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {medicines.map((medicine) => (
            <motion.div
              key={medicine.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-xl border transition-all ${
                medicine.taken
                  ? 'bg-[#10B981]/5 border-[#10B981]/20'
                  : 'bg-muted border-border'
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    medicine.taken ? 'bg-[#10B981]' : 'bg-primary'
                  }`}
                >
                  {medicine.taken ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : (
                    <Pill className="w-6 h-6 text-white" />
                  )}
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{medicine.name}</h4>
                  <p className="text-sm text-muted-foreground">{medicine.dosage} • {medicine.frequency}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{medicine.time}</span>
                  </div>
                </div>

                {!medicine.taken && (
                  <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-semibold transition-all">
                    Mark Taken
                  </button>
                )}

                {medicine.taken && (
                  <span className="text-xs text-[#10B981] font-semibold">✓ Completed</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-foreground">Monthly Calendar</h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-muted rounded-lg text-sm">Feb 2026</button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
              {day}
            </div>
          ))}
          {medicineCalendar.map(({ day, completed }) => (
            <div
              key={day}
              className={`aspect-square rounded-lg flex items-center justify-center text-sm font-semibold cursor-pointer transition-all ${
                day === 26
                  ? 'bg-primary text-white'
                  : completed
                  ? 'bg-[#10B981]/10 text-[#10B981] hover:bg-[#10B981]/20'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {day}
              {completed && day !== 26 && (
                <div className="absolute w-1 h-1 bg-[#10B981] rounded-full mt-6"></div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-6 mt-6 pt-6 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#10B981]/20"></div>
            <span className="text-xs text-muted-foreground">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-muted"></div>
            <span className="text-xs text-muted-foreground">Missed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary"></div>
            <span className="text-xs text-muted-foreground">Today</span>
          </div>
        </div>
      </div>

      {/* Side Effects Logger */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-[#F59E0B]" />
          <h3 className="font-semibold text-foreground">Side Effects Logger</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Track any side effects you experience from your medications
        </p>
        <button className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-semibold text-foreground transition-all">
          Log Side Effect
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl p-4 border border-border">
          <Pill className="w-8 h-8 text-primary mb-2" />
          <p className="text-2xl font-bold text-foreground">3</p>
          <p className="text-sm text-muted-foreground">Active Medicines</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <CheckCircle className="w-8 h-8 text-[#10B981] mb-2" />
          <p className="text-2xl font-bold text-foreground">94%</p>
          <p className="text-sm text-muted-foreground">Adherence Rate</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <Calendar className="w-8 h-8 text-secondary mb-2" />
          <p className="text-2xl font-bold text-foreground">26</p>
          <p className="text-sm text-muted-foreground">Days Tracked</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <Bell className="w-8 h-8 text-[#F59E0B] mb-2" />
          <p className="text-2xl font-bold text-foreground">2</p>
          <p className="text-sm text-muted-foreground">Reminders Today</p>
        </div>
      </div>
    </div>
  );
}
