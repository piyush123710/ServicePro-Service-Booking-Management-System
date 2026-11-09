import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceAddon } from '../types/servicePro';
import { Check, Calendar, MapPin, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

const TIME_SLOTS = [
  '09:00 AM - 11:00 AM',
  '11:00 AM - 01:00 PM',
  '01:00 PM - 03:00 PM',
  '03:00 PM - 05:00 PM'
];

export const BookingWizardModal: React.FC = () => {
  const {
    isBookingWizardOpen,
    closeBookingWizard,
    activeServiceForBooking,
    currentUser,
    createBooking,
    openBookingTracker
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedAddons, setSelectedAddons] = useState<ServiceAddon[]>([]);
  const [scheduledDate, setScheduledDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [scheduledTimeSlot, setScheduledTimeSlot] = useState(TIME_SLOTS[0]);
  const [customerName, setCustomerName] = useState(currentUser.name || 'Piyush Nagbansi');
  const [customerEmail, setCustomerEmail] = useState(currentUser.email || 'piyushnagbansi500@gmail.com');
  const [customerPhone, setCustomerPhone] = useState(currentUser.phone || '+1 (555) 912-3841');
  const [address, setAddress] = useState('450 Silicon Parkway');
  const [unit, setUnit] = useState('Penthouse 14B');
  const [city, setCity] = useState('Seattle, WA');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Sync persona updates
  useEffect(() => {
    if (currentUser) {
      setCustomerName(currentUser.name);
      setCustomerEmail(currentUser.email);
      setCustomerPhone(currentUser.phone);
    }
  }, [currentUser]);

  if (!isBookingWizardOpen || !activeServiceForBooking) return null;

  const toggleAddon = (addon: ServiceAddon) => {
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const subtotal = activeServiceForBooking.basePrice + addonsTotal;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  const handleSubmitBooking = () => {
    const newBooking = createBooking({
      serviceId: activeServiceForBooking.id,
      customerName,
      customerEmail,
      customerPhone,
      address,
      unit,
      city,
      scheduledDate,
      scheduledTimeSlot,
      selectedAddons,
      specialInstructions
    });

    closeBookingWizard();
    openBookingTracker(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Wizard Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
              Online Appointment Booking
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {activeServiceForBooking.title}
            </h2>
          </div>
          <button
            onClick={closeBookingWizard}
            className="text-slate-400 hover:text-slate-700 text-xl font-medium leading-none p-1 rounded-md"
          >
            &times;
          </button>
        </div>

        {/* Step Indicator Progress */}
        <div className="grid grid-cols-4 border-b border-slate-200 bg-white text-xs">
          {[
            { num: 1, label: 'Scope & Addons' },
            { num: 2, label: 'Date & Slot' },
            { num: 3, label: 'Service Location' },
            { num: 4, label: 'Quote Review' }
          ].map((s) => (
            <div
              key={s.num}
              className={`py-2.5 px-3 text-center border-r border-slate-100 last:border-r-0 ${
                step === s.num
                  ? 'border-b-2 border-blue-700 text-blue-700 font-bold bg-blue-50/40'
                  : step > s.num
                  ? 'text-slate-700 font-medium'
                  : 'text-slate-400'
              }`}
            >
              <span>{s.num}. {s.label}</span>
            </div>
          ))}
        </div>

        {/* Wizard Step Content */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-800 text-xs">
          
          {/* STEP 1: Service Scope & Addons */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-slate-900">Standard Service Base</span>
                  <span className="font-bold text-slate-900 font-mono tabular-nums">
                    ${activeServiceForBooking.basePrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {activeServiceForBooking.fullDescription}
                </p>
                <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-500">
                  <span>Duration: ~{activeServiceForBooking.durationMinutes} min</span>
                  <span>·</span>
                  <span>Guaranteed SLA: {activeServiceForBooking.slaHours} hours</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-2">
                  Optional Diagnostic & Performance Add-Ons:
                </h3>
                <div className="space-y-2">
                  {activeServiceForBooking.addons.map((addon) => {
                    const isSelected = selectedAddons.some((a) => a.id === addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon)}
                        className={`w-full p-3 rounded-lg border text-left flex items-start justify-between gap-3 transition-colors ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/50'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border transition-colors ${
                              isSelected
                                ? 'bg-blue-700 border-blue-700 text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{addon.name}</div>
                            <div className="text-slate-500 mt-0.5">{addon.description}</div>
                          </div>
                        </div>
                        <div className="font-bold text-slate-900 font-mono tabular-nums shrink-0">
                          +${addon.price.toFixed(2)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Date & Time Slot */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-700" />
                  <span>Select Preferred Service Date</span>
                </label>
                <input
                  type="date"
                  value={scheduledDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full sm:w-64 px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-2">
                  Guaranteed Arrival Window / Time Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setScheduledTimeSlot(slot)}
                      className={`p-3 rounded-lg border text-left transition-colors font-mono tabular-nums ${
                        scheduledTimeSlot === slot
                          ? 'border-blue-700 bg-blue-50 text-blue-900 font-semibold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Technician status and GPS proximity updates will be communicated 30 minutes prior to arrival.
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: Service Location & Contact */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Customer Full Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City & State</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 450 Silicon Parkway"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Unit / Apt</label>
                  <input
                    type="text"
                    placeholder="e.g. Ste 14B"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Access Instructions / Equipment Location Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Front desk gate code #1234, unit in exterior mechanical room..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Review Quote & Confirmation */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h3 className="font-bold text-slate-900 mb-3 text-sm">
                  Itemized Service Quote Breakdown
                </h3>

                <div className="space-y-2 pb-3 border-b border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-600">{activeServiceForBooking.title} (Base)</span>
                    <span className="font-mono tabular-nums text-slate-900 font-medium">
                      ${activeServiceForBooking.basePrice.toFixed(2)}
                    </span>
                  </div>

                  {selectedAddons.map((addon) => (
                    <div key={addon.id} className="flex justify-between pl-3 text-slate-500">
                      <span>+ {addon.name}</span>
                      <span className="font-mono tabular-nums text-slate-700">
                        ${addon.price.toFixed(2)}
                      </span>
                    </div>
                  ))}

                  <div className="flex justify-between text-slate-600 pt-1">
                    <span>Subtotal</span>
                    <span className="font-mono tabular-nums text-slate-900 font-medium">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-500">
                    <span>Estimated WA State Tax (8.0%)</span>
                    <span className="font-mono tabular-nums text-slate-700">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between pt-3 text-sm font-bold text-slate-900">
                  <span>Guaranteed Price Total</span>
                  <span className="font-mono tabular-nums text-blue-700 text-base">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Appointment summary */}
              <div className="p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-slate-700">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>
                    Scheduled: <strong>{scheduledDate}</strong> during <strong>{scheduledTimeSlot}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>
                    Location: {address} {unit ? `(${unit})` : ''}, {city}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-emerald-700 pt-1">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Covered by ServicePro $2,000,000 Certified Workmanship Warranty</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Wizard Footer Controls */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3 | 4)}
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono tabular-nums text-slate-500">
              Est. Total: <strong className="text-slate-900">${total.toFixed(2)}</strong>
            </span>

            {step < 4 ? (
              <button
                onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3 | 4)}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmitBooking}
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors flex items-center gap-2"
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Confirm & Place Booking</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
