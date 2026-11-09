import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServiceCatalog } from './components/ServiceCatalog';
import { BookingsListView } from './components/BookingsListView';
import { TechniciansView } from './components/TechniciansView';
import { AdminAnalytics } from './components/AdminAnalytics';
import { BookingWizardModal } from './components/BookingWizardModal';
import { BookingTrackerModal } from './components/BookingTrackerModal';
import { JwtSecurityModal } from './components/JwtSecurityModal';
import { AzureArchitectureModal } from './components/AzureArchitectureModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { ResumeShowcaseModal } from './components/ResumeShowcaseModal';
import { ShieldCheck, Cloud, Server, Database, Code2, ExternalLink } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentTab, setIsArchitectureModalOpen, setIsResumeModalOpen, setIsJwtModalOpen } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        {currentTab === 'services' && <HeroSection />}

        {/* Tab Viewport */}
        {currentTab === 'services' && <ServiceCatalog />}
        {currentTab === 'bookings' && <BookingsListView />}
        {currentTab === 'providers' && <TechniciansView />}
        {currentTab === 'analytics' && <AdminAnalytics />}
        {currentTab === 'architecture' && (
          <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  Microsoft Azure & .NET 8 Web API Architecture
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Enterprise-grade decoupled architecture with Angular 17+ client, ASP.NET Core 8 Web API, Entity Framework Core, and SQL Server.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsArchitectureModalOpen(true)}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Open REST API Swagger Runner</span>
                </button>
              </div>
            </div>

            {/* Architecture Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-700 flex items-center justify-center font-bold text-sm">
                  NG
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Angular 17+ Client Architecture</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Standalone component structure, RxJS state management, reactive appointment booking forms, and HTTP interceptors injecting Bearer JWT tokens.
                </p>
                <div className="pt-2 text-[11px] text-slate-500 font-mono">
                  Hosted on Azure Static Web Apps
                </div>
              </div>

              <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-sm">
                  C#
                </div>
                <h3 className="font-bold text-slate-900 text-sm">ASP.NET Core 8 Web API</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  RESTful controllers with MediatR CQRS pattern, FluentValidation, centralized exception handling middleware, and role-based JWT authorization policies.
                </p>
                <div className="pt-2 text-[11px] text-slate-500 font-mono">
                  Azure App Service (Linux B3)
                </div>
              </div>

              <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">SQL Server & EF Core 8</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Code-First migrations, automated index tuning, row-level security for multi-tenant service providers, and LINQ compiled queries.
                </p>
                <div className="pt-2 text-[11px] text-slate-500 font-mono">
                  Azure SQL Database (vCore GP)
                </div>
              </div>

            </div>

            {/* Resume & Deep Dive Strip */}
            <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-base font-bold text-white">
                  Resume Description & Technical Highlights
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">
                  Demonstrate complete full-stack mastery: RESTful API design, EF Core relational modeling, JWT claims, and Microsoft Azure deployment.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setIsResumeModalOpen(true)}
                  className="px-4 py-2 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-lg shadow-sm transition-colors"
                >
                  View Resume Bullets
                </button>
                <button
                  onClick={() => setIsJwtModalOpen(true)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
                >
                  Inspect JWT Security
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Global Modals */}
      <BookingWizardModal />
      <BookingTrackerModal />
      <JwtSecurityModal />
      <AzureArchitectureModal />
      <NotificationDrawer />
      <ResumeShowcaseModal />

      {/* Clean Footer adhering to Section 1.B & Zero-Pill Rules */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-900">ServicePro Enterprise</span>
            <span>&middot;</span>
            <span>Service Booking & Field Operations Management System</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="hover:text-slate-900 transition-colors"
            >
              Resume Bullet Points
            </button>
            <button
              onClick={() => setIsArchitectureModalOpen(true)}
              className="hover:text-slate-900 transition-colors"
            >
              Azure Cloud Stack
            </button>
            <button
              onClick={() => setIsJwtModalOpen(true)}
              className="hover:text-slate-900 transition-colors"
            >
              JWT Authentication
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
