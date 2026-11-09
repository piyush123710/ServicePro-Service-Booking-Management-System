import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceProvider, ServiceCategory } from '../types/servicePro';
import { Star, ShieldCheck, Phone, Mail, Award, CheckCircle2, Plus, UserPlus } from 'lucide-react';

export const TechniciansView: React.FC = () => {
  const { providers, bookings, currentUser } = useApp();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('HVAC Technician');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [skill, setSkill] = useState<ServiceCategory>('HVAC & AC Repair');
  const [cert, setCert] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProvider: ServiceProvider = {
      id: `prov-${Date.now()}`,
      name,
      role,
      email,
      phone,
      rating: 5.0,
      completedJobs: 0,
      skills: [skill],
      available: true,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
      certifications: [cert || 'State Certified Apprentice']
    };

    providers.push(newProvider);
    setIsRegisterModalOpen(false);
    setName('');
    setEmail('');
    setPhone('');
    setCert('');
  };

  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Certified Service Provider & Technician Fleet
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Enterprise roster of background-verified master technicians, trade licenses, and dispatch load.
          </p>
        </div>

        <div>
          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register Service Provider</span>
          </button>
        </div>
      </div>

      {/* Technicians Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {providers.map((prov) => {
          const activeJobs = bookings.filter(
            (b) => b.assignedProviderId === prov.id && (b.status === 'Assigned' || b.status === 'In Progress')
          ).length;

          return (
            <div
              key={prov.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Header Profile */}
                <div className="flex items-center gap-3">
                  <img
                    src={prov.avatarUrl}
                    alt={prov.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {prov.name}
                    </h3>
                    <div className="text-[11px] text-blue-700 font-medium">
                      {prov.role}
                    </div>
                  </div>
                </div>

                {/* Rating & Jobs */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono tabular-nums">
                  <div className="flex items-center gap-1 text-slate-800 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{prov.rating.toFixed(2)}</span>
                  </div>
                  <div className="text-slate-500">
                    <strong className="text-slate-800">{prov.completedJobs}</strong> jobs done
                  </div>
                </div>

                {/* Status & Workload */}
                <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs flex items-center justify-between">
                  <span className="text-slate-500">Active Load:</span>
                  <span className="font-mono tabular-nums font-semibold text-slate-900">
                    {activeJobs} Work Order{activeJobs === 1 ? '' : 's'}
                  </span>
                </div>

                {/* Trade Skills */}
                <div className="mt-3">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                    Authorized Trades
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {prov.skills.map((sk) => (
                      <span key={sk} className="text-[11px] text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-medium">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="mt-3">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                    Verified Licenses
                  </div>
                  <ul className="space-y-1 text-[11px] text-slate-600">
                    {prov.certifications.map((c, i) => (
                      <li key={i} className="flex items-start gap-1.5 line-clamp-1">
                        <Award className="w-3 h-3 text-amber-600 mt-0.5 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Contact footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                <div className="flex items-center gap-1.5 truncate">
                  <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="font-mono truncate">{prov.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="font-mono">{prov.phone}</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Provider Registration Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Service Provider Registration</h3>
              <button
                onClick={() => setIsRegisterModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-lg leading-none"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleRegister} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jason Miller"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Trade Specialization</label>
                  <select
                    value={skill}
                    onChange={(e) => setSkill(e.target.value as ServiceCategory)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="HVAC & AC Repair">HVAC & AC Repair</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Appliance Care">Appliance Care</option>
                    <option value="Carpentry">Carpentry</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Job Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Master Electrician"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Corporate Email</label>
                  <input
                    type="email"
                    required
                    placeholder="tech@servicepro.azure.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mobile Contact</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  License / Certification Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. State Journeyman License #EL-49102"
                  value={cert}
                  onChange={(e) => setCert(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg"
                >
                  Save & Authorize Provider
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
