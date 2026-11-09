import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceCategory, ServiceItem } from '../types/servicePro';
import { Search, Star, Clock, Check, Plus, ShieldCheck, Sparkles } from 'lucide-react';

const CATEGORIES: ServiceCategory[] = [
  'All',
  'HVAC & AC Repair',
  'Plumbing',
  'Electrical',
  'Cleaning',
  'Appliance Care',
  'Carpentry'
];

export const ServiceCatalog: React.FC = () => {
  const {
    services,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    openBookingWizard,
    currentUser,
    toggleServiceStatus,
    createService
  } = useApp();

  const [isNewServiceModalOpen, setIsNewServiceModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ServiceCategory>('HVAC & AC Repair');
  const [newPrice, setNewPrice] = useState(99);
  const [newDuration, setNewDuration] = useState(60);
  const [newDesc, setNewDesc] = useState('');

  const filteredServices = services.filter((srv) => {
    const matchesCategory = selectedCategory === 'All' || srv.category === selectedCategory;
    const matchesSearch =
      srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    createService({
      title: newTitle,
      category: newCategory,
      shortDescription: newDesc || `${newCategory} maintenance and inspection service.`,
      fullDescription: newDesc || `Full professional service conducted by verified licensed technicians with itemized field notes and digital checkout.`,
      basePrice: Number(newPrice),
      durationMinutes: Number(newDuration),
      slaHours: 4,
      imageUrl: '/src/assets/images/service_ac_repair_1794224447107.jpg',
      includedFeatures: [
        'Multi-point diagnostic inspection',
        'OEM-certified tools and calibration check',
        'Digital safety verification and customer work log'
      ],
      addons: [
        { id: `add-${Date.now()}-1`, name: 'Priority Rapid Dispatch (60 min)', price: 40, description: 'Guaranteed expedited arrival' }
      ],
      active: true
    });

    setIsNewServiceModalOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Catalog Header & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Certified Enterprise Service Catalog
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Standardized pricing, transparent task checklists, and guaranteed response SLAs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {currentUser.role === 'Admin' && (
            <button
              onClick={() => setIsNewServiceModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Service</span>
            </button>
          )}

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services or tasks..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Interactive Category Segmented Tabs */}
      <div className="flex items-center gap-1.5 py-4 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className={`bg-white border rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-md ${
              service.active ? 'border-slate-200' : 'border-slate-300 opacity-60'
            }`}
          >
            <div>
              {/* Image Banner with Fallback */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    // Fallback to stylish SVG gradient canvas if image path has issues
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.classList.add('bg-gradient-to-br', 'from-slate-700', 'to-slate-900');
                    }
                  }}
                />
                
                {/* Floating Price Tag */}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-sm border border-slate-100 text-xs font-bold text-slate-900 font-mono tabular-nums">
                  From ${service.basePrice.toFixed(2)}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                {/* Unboxed Metadata with Typographic Separators */}
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <span className="font-medium text-blue-700">{service.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 font-mono tabular-nums">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {service.durationMinutes} min
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums text-slate-600">
                    {service.slaHours}h SLA
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
                  {service.title}
                </h3>

                <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {service.shortDescription}
                </p>

                {/* Rating line */}
                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600 font-mono tabular-nums">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-slate-900">{service.rating.toFixed(2)}</span>
                  <span className="text-slate-400">({service.reviewCount} verified reviews)</span>
                </div>

                {/* What's Included Preview */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Scope of Work Included:
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {service.includedFeatures.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                    {service.includedFeatures.length > 3 && (
                      <li className="text-[11px] text-slate-400 pl-5.5 font-medium">
                        +{service.includedFeatures.length - 3} additional diagnostic checkpoints
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-5 pt-0">
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                {currentUser.role === 'Admin' ? (
                  <div className="flex items-center justify-between w-full">
                    <button
                      onClick={() => toggleServiceStatus(service.id)}
                      className={`text-xs px-2.5 py-1.5 rounded-md font-medium border transition-colors ${
                        service.active
                          ? 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          : 'border-emerald-200 text-emerald-700 bg-emerald-50'
                      }`}
                    >
                      {service.active ? 'Deactivate' : 'Activate Service'}
                    </button>
                    
                    <button
                      onClick={() => openBookingWizard(service)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-colors"
                    >
                      Test Booking
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => openBookingWizard(service)}
                    disabled={!service.active}
                    className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Book Appointment</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        ))}

        {filteredServices.length === 0 && (
          <div className="col-span-full py-16 text-center bg-white border border-slate-200 rounded-xl p-8">
            <p className="text-base font-semibold text-slate-900">No services match your criteria</p>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your category filter or search keywords to browse available trades.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Admin Add Service Modal */}
      {isNewServiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Create New Service Offering</h3>
              <button
                onClick={() => setIsNewServiceModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-lg leading-none"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddService} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tankless Water Heater Descaling & Flush"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as ServiceCategory)}
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
                  <label className="block font-semibold text-slate-700 mb-1">Base Price ($)</label>
                  <input
                    type="number"
                    min="1"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration (Minutes)</label>
                  <input
                    type="number"
                    step="15"
                    value={newDuration}
                    onChange={(e) => setNewDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Response SLA (Hours)</label>
                  <input
                    type="number"
                    defaultValue="4"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Outline standard diagnostic and work scope..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewServiceModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg"
                >
                  Publish Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
