import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Bell, Plus, Cpu, FileText } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentTab,
    setCurrentTab,
    currentUser,
    switchPersona,
    notifications,
    setIsNotificationDrawerOpen,
    setIsJwtModalOpen,
    setIsArchitectureModalOpen,
    setIsResumeModalOpen,
    openBookingWizard
  } = useApp();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setCurrentTab('services')}
            className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              SP
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
              ServicePro Enterprise
            </span>
          </button>
        </div>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => setCurrentTab('services')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 pb-0.5 border-b-2 ${
              currentTab === 'services'
                ? 'text-blue-700 border-blue-700 font-semibold'
                : 'border-transparent'
            }`}
          >
            Services Catalog
          </button>

          <button
            onClick={() => setCurrentTab('bookings')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 pb-0.5 border-b-2 ${
              currentTab === 'bookings'
                ? 'text-blue-700 border-blue-700 font-semibold'
                : 'border-transparent'
            }`}
          >
            Active Bookings
          </button>

          <button
            onClick={() => setCurrentTab('providers')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 pb-0.5 border-b-2 ${
              currentTab === 'providers'
                ? 'text-blue-700 border-blue-700 font-semibold'
                : 'border-transparent'
            }`}
          >
            Technician Fleet
          </button>

          <button
            onClick={() => setCurrentTab('analytics')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 pb-0.5 border-b-2 ${
              currentTab === 'analytics'
                ? 'text-blue-700 border-blue-700 font-semibold'
                : 'border-transparent'
            }`}
          >
            Analytics & Reports
          </button>

          <button
            onClick={() => setCurrentTab('architecture')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 pb-0.5 border-b-2 ${
              currentTab === 'architecture'
                ? 'text-blue-700 border-blue-700 font-semibold'
                : 'border-transparent'
            }`}
          >
            Azure & .NET Architecture
          </button>
        </nav>

        {/* Zone 3: 1 primary action + persona / security controls */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Resume & Project description trigger */}
          <button
            onClick={() => setIsResumeModalOpen(true)}
            title="Resume & Project Showcase"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-slate-600" />
            <span>Resume Spec</span>
          </button>

          {/* JWT Security Inspector */}
          <button
            onClick={() => setIsJwtModalOpen(true)}
            title="JWT Token & RBAC Inspector"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
          >
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden lg:inline">JWT Auth</span>
          </button>

          {/* Notifications Drawer */}
          <button
            onClick={() => setIsNotificationDrawerOpen(true)}
            aria-label="View notifications"
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold text-white bg-blue-600 rounded-full flex items-center justify-center tabular-nums">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Role Persona Switcher */}
          <div className="hidden sm:flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50 text-xs">
            <button
              onClick={() => switchPersona('customer')}
              className={`px-2 py-1 rounded font-medium transition-colors ${
                currentUser.role === 'Customer'
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Customer
            </button>
            <button
              onClick={() => switchPersona('provider')}
              className={`px-2 py-1 rounded font-medium transition-colors ${
                currentUser.role === 'ServiceProvider'
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Provider
            </button>
            <button
              onClick={() => switchPersona('admin')}
              className={`px-2 py-1 rounded font-medium transition-colors ${
                currentUser.role === 'Admin'
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Admin
            </button>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={() => openBookingWizard()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 active:bg-blue-900 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Book Service</span>
          </button>
        </div>

      </div>

      {/* Mobile subnavigation bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 border-t border-slate-100 bg-slate-50 text-xs overflow-x-auto gap-4">
        <button
          onClick={() => setCurrentTab('services')}
          className={`${currentTab === 'services' ? 'text-blue-700 font-semibold' : 'text-slate-600'} whitespace-nowrap`}
        >
          Services
        </button>
        <button
          onClick={() => setCurrentTab('bookings')}
          className={`${currentTab === 'bookings' ? 'text-blue-700 font-semibold' : 'text-slate-600'} whitespace-nowrap`}
        >
          Bookings
        </button>
        <button
          onClick={() => setCurrentTab('providers')}
          className={`${currentTab === 'providers' ? 'text-blue-700 font-semibold' : 'text-slate-600'} whitespace-nowrap`}
        >
          Fleet
        </button>
        <button
          onClick={() => setCurrentTab('analytics')}
          className={`${currentTab === 'analytics' ? 'text-blue-700 font-semibold' : 'text-slate-600'} whitespace-nowrap`}
        >
          Analytics
        </button>
        <button
          onClick={() => setCurrentTab('architecture')}
          className={`${currentTab === 'architecture' ? 'text-blue-700 font-semibold' : 'text-slate-600'} whitespace-nowrap`}
        >
          Architecture
        </button>
      </div>
    </header>
  );
};
