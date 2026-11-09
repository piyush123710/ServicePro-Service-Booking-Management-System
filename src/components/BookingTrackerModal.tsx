import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookingStatus } from '../types/servicePro';
import {
  CheckCircle2,
  Clock,
  User,
  MapPin,
  Calendar,
  AlertCircle,
  Star,
  Send,
  FastForward,
  UserCheck,
  FileText
} from 'lucide-react';

const STATUS_STEPS: BookingStatus[] = ['Requested', 'Approved', 'Assigned', 'In Progress', 'Completed'];

export const BookingTrackerModal: React.FC = () => {
  const {
    activeTrackingBooking,
    closeBookingTracker,
    currentUser,
    advanceBookingStatus,
    updateBookingStatus,
    assignProviderToBooking,
    cancelBooking,
    toggleChecklistItem,
    addTechnicianNote,
    submitCustomerReview,
    providers,
    openEmailPreview
  } = useApp();

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [newNote, setNewNote] = useState('');
  const [reviewStars, setReviewStars] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [selectedProviderToAssign, setSelectedProviderToAssign] = useState('');

  if (!activeTrackingBooking) return null;

  const currentStepIndex = STATUS_STEPS.indexOf(activeTrackingBooking.status);
  const isCancelled = activeTrackingBooking.status === 'Cancelled';

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    addTechnicianNote(activeTrackingBooking.id, newNote.trim());
    setNewNote('');
  };

  const handleConfirmCancel = () => {
    if (!cancelReason.trim()) return;
    cancelBooking(activeTrackingBooking.id, cancelReason);
    setCancelModalOpen(false);
    setCancelReason('');
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    submitCustomerReview(activeTrackingBooking.id, reviewStars, reviewText);
    setReviewSubmitted(true);
  };

  const handlePreviewInvoice = () => {
    const html = `
      <div style="font-family: monospace; max-width: 650px; margin: 0 auto; padding: 24px; border: 1px solid #cbd5e1; border-radius: 8px;">
        <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #0f172a; padding-bottom: 12px;">
          <div>
            <h1 style="margin: 0; font-size: 20px;">SERVICEPRO ENTERPRISE</h1>
            <p style="margin: 2px 0; color: #64748b; font-size: 12px;">Tax Invoice & Certificate of Work</p>
          </div>
          <div style="text-align: right; font-size: 12px;">
            <div>Invoice Ref: <strong>${activeTrackingBooking.bookingCode}</strong></div>
            <div>Date: ${new Date().toLocaleDateString()}</div>
          </div>
        </div>

        <div style="margin: 20px 0; font-size: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div>
            <strong>Billed To:</strong><br/>
            ${activeTrackingBooking.customerName}<br/>
            ${activeTrackingBooking.address} ${activeTrackingBooking.unit || ''}<br/>
            ${activeTrackingBooking.city}<br/>
            ${activeTrackingBooking.customerEmail}
          </div>
          <div>
            <strong>Assigned Technician:</strong><br/>
            ${activeTrackingBooking.assignedProviderName || 'Enterprise Dispatch Fleet'}<br/>
            Status: ${activeTrackingBooking.status}<br/>
            Scheduled: ${activeTrackingBooking.scheduledDate} (${activeTrackingBooking.scheduledTimeSlot})
          </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin: 20px 0;">
          <thead>
            <tr style="background: #f1f5f9; text-align: left;">
              <th style="padding: 8px; border-bottom: 1px solid #cbd5e1;">Service Item</th>
              <th style="padding: 8px; border-bottom: 1px solid #cbd5e1; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${activeTrackingBooking.serviceTitle} (Base Diagnostic)</td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">$${activeTrackingBooking.basePrice.toFixed(2)}</td>
            </tr>
            ${activeTrackingBooking.selectedAddons.map((a) => `
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #475569;">+ ${a.name}</td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">$${a.price.toFixed(2)}</td>
              </tr>
            `).join('')}
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">Subtotal</td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">$${(activeTrackingBooking.basePrice + activeTrackingBooking.addonsTotal).toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">State Tax (8.0%)</td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">$${activeTrackingBooking.tax.toFixed(2)}</td>
            </tr>
            <tr style="font-weight: bold; font-size: 14px;">
              <td style="padding: 8px; border-top: 2px solid #0f172a;">Total Paid</td>
              <td style="padding: 8px; border-top: 2px solid #0f172a; text-align: right;">$${activeTrackingBooking.totalPrice.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div style="font-size: 11px; color: #64748b; margin-top: 24px; text-align: center;">
          Thank you for trusting ServicePro. Backed by Entity Framework Core database record ID: ${activeTrackingBooking.id}.
        </div>
      </div>
    `;

    openEmailPreview(`Invoice & Work Order #${activeTrackingBooking.bookingCode}`, html, activeTrackingBooking.customerEmail);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
              {activeTrackingBooking.bookingCode}
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {activeTrackingBooking.serviceTitle}
              </h2>
              <div className="text-xs text-slate-500 flex items-center gap-2">
                <span>{activeTrackingBooking.category}</span>
                <span>·</span>
                <span>Customer: {activeTrackingBooking.customerName}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviewInvoice}
              title="View Invoice"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Invoice</span>
            </button>
            <button
              onClick={closeBookingTracker}
              className="text-slate-400 hover:text-slate-700 text-xl font-medium leading-none p-1 rounded-md"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Status Lifecycle Progress Bar */}
        <div className="p-6 bg-slate-50/70 border-b border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Booking Lifecycle State:
            </span>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                isCancelled
                  ? 'bg-red-100 text-red-800'
                  : activeTrackingBooking.status === 'Completed'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {activeTrackingBooking.status}
              </span>

              {/* Simulation Quick Advancement Button */}
              {!isCancelled && activeTrackingBooking.status !== 'Completed' && (
                <button
                  onClick={() => advanceBookingStatus(activeTrackingBooking.id)}
                  title="Advance to next workflow milestone"
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-md transition-colors"
                >
                  <FastForward className="w-3 h-3" />
                  <span>Advance Milestone</span>
                </button>
              )}
            </div>
          </div>

          {!isCancelled ? (
            <div className="relative mt-4">
              {/* Progress Line */}
              <div className="absolute top-3.5 left-4 right-4 h-0.5 bg-slate-200 -z-0" />
              <div
                className="absolute top-3.5 left-4 h-0.5 bg-blue-600 transition-all duration-300 -z-0"
                style={{
                  width: `${Math.max(0, (currentStepIndex / (STATUS_STEPS.length - 1)) * 96)}%`
                }}
              />

              {/* Steps */}
              <div className="relative z-10 grid grid-cols-5 text-center text-xs">
                {STATUS_STEPS.map((s, idx) => {
                  const isDone = currentStepIndex >= idx;
                  const isCurrent = currentStepIndex === idx;
                  return (
                    <div key={s} className="flex flex-col items-center">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                          isDone
                            ? 'bg-blue-700 text-white shadow-sm'
                            : 'bg-white border-2 border-slate-300 text-slate-400'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4 stroke-[2.5]" /> : idx + 1}
                      </div>
                      <span
                        className={`mt-1.5 text-[11px] leading-tight ${
                          isCurrent
                            ? 'font-bold text-blue-900'
                            : isDone
                            ? 'font-medium text-slate-700'
                            : 'text-slate-400'
                        }`}
                      >
                        {s}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                Booking cancelled. Reason: <strong>{activeTrackingBooking.cancellationReason || 'User requested cancellation'}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Modal Main Content View */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-slate-800">
          
          {/* 2-Column Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Service & Customer Details */}
            <div className="p-4 rounded-xl border border-slate-200 space-y-2.5">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Order Details
              </h3>
              <div className="flex items-start gap-2 text-slate-600">
                <Calendar className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Date:</strong> {activeTrackingBooking.scheduledDate} ({activeTrackingBooking.scheduledTimeSlot})
                </span>
              </div>
              <div className="flex items-start gap-2 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Location:</strong> {activeTrackingBooking.address} {activeTrackingBooking.unit ? `(${activeTrackingBooking.unit})` : ''}, {activeTrackingBooking.city}
                </span>
              </div>
              <div className="flex items-start gap-2 text-slate-600">
                <User className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Customer:</strong> {activeTrackingBooking.customerName} ({activeTrackingBooking.customerPhone})
                </span>
              </div>
              {activeTrackingBooking.specialInstructions && (
                <div className="mt-2 p-2.5 rounded bg-slate-50 border border-slate-100 text-slate-600">
                  <span className="font-semibold text-slate-700">Access Notes: </span>
                  {activeTrackingBooking.specialInstructions}
                </div>
              )}
            </div>

            {/* Provider Assignment & Dispatch Controls */}
            <div className="p-4 rounded-xl border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Assigned Service Technician
                </h3>
                {activeTrackingBooking.assignedProviderName ? (
                  <span className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
                    <UserCheck className="w-3 h-3" /> Assigned
                  </span>
                ) : (
                  <span className="text-amber-700 font-semibold text-[11px]">
                    Pending Dispatch
                  </span>
                )}
              </div>

              {activeTrackingBooking.assignedProviderName ? (
                <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-xs">
                      {activeTrackingBooking.assignedProviderName}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Dispatched Fleet Technician · {activeTrackingBooking.category} Lead
                    </div>
                  </div>
                  <div className="text-right text-[11px] font-mono text-blue-700 font-medium">
                    Verified ID #SP-TECH-48
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs">
                  No technician assigned yet. Admin or dispatchers can assign certified staff below.
                </div>
              )}

              {/* Admin/Dispatcher Assignment Dropdown */}
              {(currentUser.role === 'Admin' || currentUser.role === 'ServiceProvider') && (
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                  <select
                    value={selectedProviderToAssign}
                    onChange={(e) => setSelectedProviderToAssign(e.target.value)}
                    className="flex-1 px-2.5 py-1.5 border border-slate-300 rounded-md text-xs bg-white"
                  >
                    <option value="">-- Select Available Technician --</option>
                    {providers.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.role} · {p.rating}★)
                      </option>
                    ))}
                  </select>
                  <button
                    disabled={!selectedProviderToAssign}
                    onClick={() => {
                      if (selectedProviderToAssign) {
                        assignProviderToBooking(activeTrackingBooking.id, selectedProviderToAssign);
                        setSelectedProviderToAssign('');
                      }
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 rounded-md transition-colors"
                  >
                    Assign
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Service Quality Checklist */}
          <div className="p-4 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2.5">
              Field Execution & Inspection Checklist ({activeTrackingBooking.checklistItems.filter((c) => c.completed).length}/{activeTrackingBooking.checklistItems.length} Completed)
            </h3>

            <div className="space-y-2">
              {activeTrackingBooking.checklistItems.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    // Allowed for Provider and Admin
                    if (currentUser.role !== 'Customer') {
                      toggleChecklistItem(activeTrackingBooking.id, idx);
                    }
                  }}
                  className={`p-2.5 rounded-lg border flex items-center gap-3 transition-colors ${
                    currentUser.role !== 'Customer' ? 'cursor-pointer hover:bg-slate-50' : 'cursor-default'
                  } ${
                    item.completed
                      ? 'border-emerald-200 bg-emerald-50/40 text-emerald-900 font-medium'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                      item.completed
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {item.completed && <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />}
                  </div>
                  <span className={item.completed ? 'line-through opacity-80' : ''}>
                    {item.task}
                  </span>
                </div>
              ))}
            </div>
            {currentUser.role === 'Customer' && (
              <p className="text-[11px] text-slate-400 mt-2">
                Checklist items are verified in real-time as your technician completes each protocol.
              </p>
            )}
          </div>

          {/* Technician Field Notes Log */}
          <div className="p-4 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2.5">
              Technician Field Notes & Diagnostic Log
            </h3>

            <div className="space-y-2 mb-3">
              {(activeTrackingBooking.technicianNotes || []).map((note, idx) => (
                <div key={idx} className="p-2 rounded bg-slate-50 border border-slate-100 text-slate-600 text-xs">
                  <span className="font-mono text-[10px] text-slate-400 mr-2">LOG #{idx + 1}</span>
                  {note}
                </div>
              ))}
            </div>

            {/* Note entry form */}
            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                placeholder="Add technician comment or telemetry reading (e.g. Pressure 120 PSI, 45V drop)..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-900 rounded-lg flex items-center gap-1.5"
              >
                <Send className="w-3 h-3" />
                <span>Log Note</span>
              </button>
            </form>
          </div>

          {/* Customer Rating & Feedback Section (Visible when completed) */}
          {activeTrackingBooking.status === 'Completed' && (
            <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-200">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
                Customer Workmanship Rating & Review
              </h3>

              {activeTrackingBooking.rating || reviewSubmitted ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= (activeTrackingBooking.rating || reviewStars)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                    <span className="font-bold text-slate-900 font-mono ml-1">
                      {activeTrackingBooking.rating || reviewStars}.0 / 5.0
                    </span>
                  </div>
                  <p className="text-slate-700 italic">
                    "{activeTrackingBooking.feedback || reviewText || 'Exceptional service!'}"
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSaveReview} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-700">Rate your experience:</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewStars(star)}
                          className="p-1 focus:outline-none"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= reviewStars
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300 hover:text-amber-200'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="Describe the technician's professionalism, timeliness, and cleanliness..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />

                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors"
                  >
                    Submit Verified Review
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            {!isCancelled && activeTrackingBooking.status !== 'Completed' && (
              <button
                onClick={() => setCancelModalOpen(true)}
                className="text-xs font-medium text-red-600 hover:text-red-700 hover:underline"
              >
                Cancel Appointment
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono tabular-nums text-slate-600">
              Total: <strong>${activeTrackingBooking.totalPrice.toFixed(2)}</strong>
            </span>

            <button
              onClick={closeBookingTracker}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>

      {/* Cancellation Prompt Modal */}
      {cancelModalOpen && (
        <div className="fixed inset-0 z-60 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Cancel Booking Appointment</h3>
            <p className="text-xs text-slate-500 mt-1">
              Please specify the cancellation reason for our dispatch and refund audit log.
            </p>

            <div className="mt-4 space-y-3">
              <textarea
                rows={3}
                required
                placeholder="Reason (e.g., Rescheduling with landlord, problem resolved, emergency)..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-red-600"
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setCancelModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Keep Booking
                </button>
                <button
                  disabled={!cancelReason.trim()}
                  onClick={handleConfirmCancel}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 disabled:bg-slate-300 rounded-lg"
                >
                  Confirm Cancellation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
