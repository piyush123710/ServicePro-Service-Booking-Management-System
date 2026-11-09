import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookingStatus, Booking } from '../types/servicePro';
import { Search, Eye, FastForward, CheckCircle, XCircle, UserCheck, Calendar, Clock, MapPin } from 'lucide-react';

const STATUS_FILTERS: (BookingStatus | 'All')[] = [
  'All',
  'Requested',
  'Approved',
  'Assigned',
  'In Progress',
  'Completed',
  'Cancelled'
];

export const BookingsListView: React.FC = () => {
  const {
    bookings,
    currentUser,
    openBookingTracker,
    advanceBookingStatus,
    updateBookingStatus,
    assignProviderToBooking,
    providers,
    openBookingWizard
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOnlyMine, setFilterOnlyMine] = useState(false);

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    const matchesSearch =
      b.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.serviceTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.address.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesRole = true;
    if (filterOnlyMine) {
      if (currentUser.role === 'Customer') {
        matchesRole = b.customerEmail.toLowerCase() === currentUser.email.toLowerCase();
      } else if (currentUser.role === 'ServiceProvider') {
        matchesRole = b.assignedProviderName?.toLowerCase() === currentUser.name.toLowerCase();
      }
    }

    return matchesStatus && matchesSearch && matchesRole;
  });

  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Work Orders & Dispatch Queue
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time appointment scheduling, field technician assignment, and milestone status tracking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {currentUser.role !== 'Admin' && (
            <button
              onClick={() => setFilterOnlyMine(!filterOnlyMine)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                filterOnlyMine
                  ? 'bg-blue-50 border-blue-300 text-blue-700 font-semibold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {currentUser.role === 'Customer' ? 'My Appointments Only' : 'My Assigned Jobs Only'}
            </button>
          )}

          <button
            onClick={() => openBookingWizard()}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            + New Booking
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4">
        {/* Status segmented filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {STATUS_FILTERS.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search code, client, or address..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* High Density Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Booking Ref</th>
                <th className="py-3 px-4">Service & Scope</th>
                <th className="py-3 px-4">Customer & Location</th>
                <th className="py-3 px-4">Scheduled Window</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Assigned Tech</th>
                <th className="py-3 px-4 text-right">Total</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.map((bk) => {
                const isCompleted = bk.status === 'Completed';
                const isCancelled = bk.status === 'Cancelled';

                return (
                  <tr key={bk.id} className="hover:bg-slate-50/70 transition-colors">
                    
                    {/* Booking Ref */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="font-mono font-bold text-slate-900">
                        {bk.bookingCode}
                      </span>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {new Date(bk.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Service & Category */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 line-clamp-1 max-w-xs">
                        {bk.serviceTitle}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <span className="text-blue-700 font-medium">{bk.category}</span>
                        {bk.selectedAddons.length > 0 && (
                          <>
                            <span>·</span>
                            <span>+{bk.selectedAddons.length} addons</span>
                          </>
                        )}
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-900">{bk.customerName}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{bk.address}, {bk.city}</span>
                      </div>
                    </td>

                    {/* Scheduled */}
                    <td className="py-3 px-4 whitespace-nowrap font-mono tabular-nums">
                      <div className="text-slate-900 font-medium">{bk.scheduledDate}</div>
                      <div className="text-[10px] text-slate-500">{bk.scheduledTimeSlot}</div>
                    </td>

                    {/* Status (Unboxed clean status) */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 font-medium ${
                        isCancelled
                          ? 'text-red-700'
                          : isCompleted
                          ? 'text-emerald-700'
                          : bk.status === 'In Progress'
                          ? 'text-blue-700 font-semibold'
                          : 'text-slate-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isCancelled
                            ? 'bg-red-500'
                            : isCompleted
                            ? 'bg-emerald-500'
                            : bk.status === 'In Progress'
                            ? 'bg-blue-600'
                            : bk.status === 'Assigned'
                            ? 'bg-indigo-500'
                            : 'bg-amber-500'
                        }`} />
                        <span>{bk.status}</span>
                      </span>
                    </td>

                    {/* Assigned Tech */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      {bk.assignedProviderName ? (
                        <div className="text-slate-900 font-medium">
                          {bk.assignedProviderName}
                        </div>
                      ) : (
                        <span className="text-amber-700 font-mono text-[11px]">
                          Unassigned
                        </span>
                      )}
                    </td>

                    {/* Total Price */}
                    <td className="py-3 px-4 text-right whitespace-nowrap font-mono tabular-nums font-bold text-slate-900">
                      ${bk.totalPrice.toFixed(2)}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        
                        {/* Approval button if Requested */}
                        {bk.status === 'Requested' && (currentUser.role === 'Admin' || currentUser.role === 'ServiceProvider') && (
                          <button
                            onClick={() => updateBookingStatus(bk.id, 'Approved')}
                            title="Approve Booking"
                            className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}

                        {/* Quick Advance button */}
                        {!isCancelled && !isCompleted && (
                          <button
                            onClick={() => advanceBookingStatus(bk.id)}
                            title="Advance to next lifecycle milestone"
                            className="p-1.5 text-blue-700 hover:bg-blue-50 rounded transition-colors"
                          >
                            <FastForward className="w-4 h-4" />
                          </button>
                        )}

                        {/* Open Tracker Modal */}
                        <button
                          onClick={() => openBookingTracker(bk)}
                          className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-500" />
                          <span>Track</span>
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}

              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    <p className="font-medium text-slate-900">No work orders found</p>
                    <p className="text-xs text-slate-400 mt-1">Try resetting your filter or search query.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </section>
  );
};
