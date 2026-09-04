import { motion } from 'motion/react';
import { useState } from 'react';
import { Search, MapPin, Star, Calendar, Video, MessageCircle, Award, Filter } from 'lucide-react';

export function FindDoctors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const specialties = ['All', 'Oncologist', 'Radiologist', 'Pathologist', 'Surgeon'];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Medical Oncologist',
      hospital: 'Memorial Cancer Center',
      location: 'New York, NY',
      rating: 4.9,
      reviews: 234,
      experience: '15 years',
      available: true,
      nextSlot: 'Tomorrow, 10:00 AM'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Radiation Oncologist',
      hospital: 'City General Hospital',
      location: 'San Francisco, CA',
      rating: 4.8,
      reviews: 189,
      experience: '12 years',
      available: true,
      nextSlot: 'Today, 3:00 PM'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Surgical Oncologist',
      hospital: 'University Medical Center',
      location: 'Boston, MA',
      rating: 4.9,
      reviews: 312,
      experience: '18 years',
      available: false,
      nextSlot: 'Next week'
    },
    {
      id: 4,
      name: 'Dr. James Williams',
      specialty: 'Hematologist',
      hospital: 'Cancer Research Institute',
      location: 'Los Angeles, CA',
      rating: 4.7,
      reviews: 156,
      experience: '10 years',
      available: true,
      nextSlot: 'Tomorrow, 2:00 PM'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Find Expert Doctors</h2>
        <p className="text-muted-foreground">Connect with verified cancer specialists</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, specialty, or location..."
                className="w-full pl-12 pr-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 px-4 py-3 bg-muted hover:bg-muted/80 rounded-xl text-foreground transition-all flex items-center justify-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </button>
            <button className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5" />
              Near Me
            </button>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          {specialties.map((specialty) => (
            <button
              key={specialty}
              onClick={() => setSelectedSpecialty(specialty.toLowerCase())}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                selectedSpecialty === specialty.toLowerCase()
                  ? 'bg-primary text-white'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {specialty}
            </button>
          ))}
        </div>
      </div>

      {/* Doctors List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {doctors.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-2xl p-6 border border-border hover:shadow-xl transition-all"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-white">
                  {doctor.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-lg mb-1">{doctor.name}</h3>
                <p className="text-sm text-secondary mb-2">{doctor.specialty}</p>
                
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-[#F59E0B] fill-current" />
                  <span className="text-sm font-semibold text-foreground">{doctor.rating}</span>
                  <span className="text-sm text-muted-foreground">({doctor.reviews} reviews)</span>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    {doctor.experience}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {doctor.location}
                  </div>
                </div>
              </div>

              {doctor.available && (
                <div className="px-3 py-1 bg-[#10B981]/10 text-[#10B981] rounded-full text-xs font-semibold">
                  Available
                </div>
              )}
            </div>

            <div className="mb-4 p-3 bg-muted rounded-xl">
              <p className="text-sm text-muted-foreground mb-1">{doctor.hospital}</p>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-secondary" />
                <span className="text-sm font-semibold text-foreground">Next available: {doctor.nextSlot}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-1">
                <Calendar className="w-4 h-4" />
                Book
              </button>
              <button className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-1">
                <Video className="w-4 h-4" />
                Video
              </button>
              <button className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-1">
                <MessageCircle className="w-4 h-4" />
                Chat
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl p-6 border border-secondary/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">All Doctors Verified</h3>
            <p className="text-sm text-muted-foreground">
              Every doctor on our platform is verified with medical license validation and background checks. 
              Your health is in trusted hands.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
