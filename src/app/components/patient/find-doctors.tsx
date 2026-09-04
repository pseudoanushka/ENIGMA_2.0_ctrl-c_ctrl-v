import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Star, Filter, Calendar, Award, ChevronRight } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  experience: string;
  availability: string;
  cancerTypes: string[];
  image: string;
}

export function FindDoctors() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Michael Chen',
      specialty: 'Oncologist',
      rating: 4.9,
      reviews: 234,
      location: 'Stanford Medical Center',
      distance: '2.3 miles',
      experience: '15+ years',
      availability: 'Next available: Tomorrow',
      cancerTypes: ['Breast Cancer', 'Lung Cancer', 'Colorectal'],
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop'
    },
    {
      id: '2',
      name: 'Dr. Sarah Williams',
      specialty: 'Genetic Counselor',
      rating: 5.0,
      reviews: 189,
      location: 'GeneCare Medical Group',
      distance: '3.7 miles',
      experience: '12+ years',
      availability: 'Next available: Feb 28',
      cancerTypes: ['Genetic Testing', 'BRCA Analysis', 'Hereditary Cancers'],
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop'
    },
    {
      id: '3',
      name: 'Dr. James Rodriguez',
      specialty: 'Radiation Oncologist',
      rating: 4.8,
      reviews: 156,
      location: 'City Cancer Institute',
      distance: '5.1 miles',
      experience: '20+ years',
      availability: 'Next available: Mar 2',
      cancerTypes: ['Prostate Cancer', 'Brain Tumors', 'Lymphoma'],
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop'
    }
  ];

  const specialties = ['All Specialties', 'Oncologist', 'Genetic Counselor', 'Radiation Oncologist', 'Surgical Oncologist'];

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, specialty, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary appearance-none cursor-pointer"
          >
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty.toLowerCase().replace(' ', '-')}>
                {specialty}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['Highly Rated', 'Available Soon', 'Nearby', 'Most Reviewed', 'Accepting New Patients'].map((filter) => (
          <button
            key={filter}
            className="px-4 py-2 bg-muted/50 text-foreground rounded-xl hover:bg-muted transition-colors whitespace-nowrap text-sm"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Doctors List */}
      <div className="space-y-4">
        {doctors.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <div className="flex gap-6">
              {/* Doctor Image */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-secondary/20 group-hover:border-secondary transition-colors">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Doctor Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-primary group-hover:text-secondary transition-colors">
                      {doctor.name}
                    </h3>
                    <p className="text-muted-foreground">{doctor.specialty}</p>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 bg-yellow-100 rounded-lg">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="font-semibold text-yellow-900">{doctor.rating}</span>
                    <span className="text-yellow-700 text-sm">({doctor.reviews})</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <span>{doctor.location} • {doctor.distance}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <Award className="w-4 h-4 text-secondary" />
                    <span>{doctor.experience} experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <Calendar className="w-4 h-4 text-secondary" />
                    <span>{doctor.availability}</span>
                  </div>
                </div>

                {/* Cancer Types */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {doctor.cancerTypes.map((type) => (
                    <span
                      key={type}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm"
                    >
                      {type}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all duration-300">
                    Book Appointment
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button className="px-6 py-3 border border-border rounded-xl hover:bg-muted transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="px-8 py-3 border border-border rounded-xl hover:bg-muted transition-colors">
          Load More Doctors
        </button>
      </div>
    </div>
  );
}
