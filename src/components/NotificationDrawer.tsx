import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, CheckCheck, Trash2, Mail, ExternalLink } from 'lucide-react';

export const NotificationDrawer: React.FC = () => {
  const {
    notifications,
    isNotificationDrawerOpen,
    setIsNotificationDrawerOpen,
    markNotificationRead,
    markAllNotificationsRead,
    clearAllNotifications,
    openEmailPreview,
    isEmailPreviewModalOpen,
    closeEmailPreview,
    activeEmailPreview,
    openBookingTracker,
    bookings
  } = useApp();

  if (!isNotificationDrawerOpen && !isEmailPreviewModalOpen) return null;

  return (
    <>
      {/* Right Slide-over Notification Drawer */}
      {isNotificationDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsNotificationDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col">
              
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-blue-700" />
                  <h2 className="text-sm font-bold text-slate-900">
                    Notifications & Transactional Dispatch Log
                  </h2>
                </div>

                <button
                  onClick={() => setIsNotificationDrawerOpen(false)}
                  className="text-slate-400 hover:text-slate-700 text-xl leading-none p-1 rounded-md"
                >
                  &times;
                </button>
              </div>

              {/* Utility actions */}
              <div className="px-6 py-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-white">
                <button
                  onClick={markAllNotificationsRead}
                  className="hover:text-blue-700 flex items-center gap-1"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Mark all read</span>
                </button>
                <button
                  onClick={clearAllNotifications}
                  className="hover:text-red-600 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear history</span>
                </button>
              </div>

              {/* List */}
              <div className="p-6 overflow-y-auto flex-1 divide-y divide-slate-100 text-xs">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => markNotificationRead(notif.id)}
                    className={`py-3.5 transition-colors cursor-pointer ${
                      notif.read ? 'opacity-70' : 'bg-blue-50/30 p-2.5 rounded-lg border border-blue-100 my-1'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        {!notif.read && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                        {notif.title}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {notif.timestamp}
                      </span>
                    </div>

                    <p className="text-slate-600 leading-relaxed">
                      {notif.message}
                    </p>

                    <div className="mt-2.5 flex items-center gap-2">
                      {notif.emailHtmlPreview && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEmailPreview(notif.title, notif.emailHtmlPreview!, 'Customer Email');
                          }}
                          className="px-2 py-1 text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded flex items-center gap-1"
                        >
                          <Mail className="w-3 h-3" />
                          <span>View Delivered Email</span>
                        </button>
                      )}

                      {notif.bookingId && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const target = bookings.find((b) => b.id === notif.bookingId);
                            if (target) {
                              setIsNotificationDrawerOpen(false);
                              openBookingTracker(target);
                            }
                          }}
                          className="px-2 py-1 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                          <span>View Order</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {notifications.length === 0 && (
                  <div className="py-16 text-center text-slate-400">
                    <Mail className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="font-medium text-slate-700">No notifications yet</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Transactional emails and dispatch updates will appear here.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 text-center font-mono">
                Delivered via Azure Communication Services
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Transactional Email Viewer Modal */}
      {isEmailPreviewModalOpen && activeEmailPreview && (
        <div className="fixed inset-0 z-60 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Email client header */}
            <div className="px-6 py-3 border-b border-slate-200 bg-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                <span className="ml-2 font-semibold text-slate-700 font-mono">
                  Inbox Preview &middot; Azure Communication Services SMTP Relay
                </span>
              </div>

              <button
                onClick={closeEmailPreview}
                className="text-slate-400 hover:text-slate-700 text-lg leading-none"
              >
                &times;
              </button>
            </div>

            {/* Email Meta */}
            <div className="px-6 py-3 border-b border-slate-100 bg-white text-xs space-y-1">
              <div>
                <span className="text-slate-400 font-mono">Subject: </span>
                <span className="font-bold text-slate-900">{activeEmailPreview.title}</span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                From: dispatch@servicepro.azure.net &middot; To: {activeEmailPreview.to}
              </div>
            </div>

            {/* Rendered HTML */}
            <div className="p-6 overflow-y-auto flex-1 bg-slate-50">
              <div
                className="bg-white rounded-lg shadow-xs"
                dangerouslySetInnerHTML={{ __html: activeEmailPreview.html }}
              />
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
              <button
                onClick={closeEmailPreview}
                className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg"
              >
                Dismiss Email Preview
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
