import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Clock, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { openBookingWizard, setCurrentTab, currentUser, switchPersona } = useApp();

  return (
    <div className="bg-white border-b border-slate-200 pt-8 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Role Indicator Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
          <div className="flex items-center gap-2.5">
            <span className="font-semibold text-slate-900">Current Session Persona:</span>
            <span className="font-medium text-blue-700">{currentUser.name}</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-600 font-mono">{currentUser.role} Role</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500">{currentUser.email}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500">Switch View:</span>
            <button
              onClick={() => switchPersona('customer')}
              className={`px-2 py-0.5 rounded text-xs transition-colors ${currentUser.role === 'Customer' ? 'bg-blue-700 text-white font-semibold' : 'text-slate-600 hover:bg-slate-200'}`}
            >
              Customer
            </button>
            <button
              onClick={() => switchPersona('provider')}
              className={`px-2 py-0.5 rounded text-xs transition-colors ${currentUser.role === 'ServiceProvider' ? 'bg-blue-700 text-white font-semibold' : 'text-slate-600 hover:bg-slate-200'}`}
            >
              Provider
            </button>
            <button
              onClick={() => switchPersona('admin')}
              className={`px-2 py-0.5 rounded text-xs transition-colors ${currentUser.role === 'Admin' ? 'bg-blue-700 text-white font-semibold' : 'text-slate-600 hover:bg-slate-200'}`}
            >
              Admin Dispatch
            </button>
          </div>
        </div>

        {/* Main Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]" style={{ textWrap: 'balance' }}>
              Enterprise Service Booking & Field Operations Management
            </h1>
            
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Book certified AC repair, master plumbing, electrical maintenance, and hospital-grade cleaning. Powered by real-time dispatch assignment, milestone status tracking, and strict JWT role authorization.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openBookingWizard()}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-colors flex items-center gap-2"
              >
                <span>Schedule an Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentTab('bookings')}
                className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Track Live Work Orders
              </button>

              <button
                onClick={() => setCurrentTab('architecture')}
                className="px-4 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>Explore .NET 8 & Azure Architecture</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4">
              Enterprise Service Guarantees
            </h2>
            <ul className="space-y-3.5 text-xs text-slate-600">
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Licensed & Bonded:</strong> Background-checked master tradespeople with $2M liability coverage.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Guaranteed SLA Window:</strong> Strict arrival timeframes backed by automatic credit on delays.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Itemized Digital Invoices:</strong> Transparent parts & labor billing stored securely in SQL Server.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span><strong>Real-time Field Updates:</strong> Digital checklists and live technician notes on every work order.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* 4-Column KPI strip in full-width row */}
        <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-900">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
            <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">99.4%</div>
            <div className="text-xs text-slate-500 mt-0.5">On-Time SLA Dispatch</div>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
            <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">4.94 <span className="text-sm text-slate-500 font-normal">/ 5.0</span></div>
            <div className="text-xs text-slate-500 mt-0.5">Verified CSAT (2,160+ Reviews)</div>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
            <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">&lt; 2 Hrs</div>
            <div className="text-xs text-slate-500 mt-0.5">Rapid Emergency Response</div>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
            <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">100%</div>
            <div className="text-xs text-slate-500 mt-0.5">EPA / NEC Certified Fleets</div>
          </div>
        </div>

      </div>
    </div>
  );
};
