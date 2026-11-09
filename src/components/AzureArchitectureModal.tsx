import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Cloud, Server, Database, ShieldCheck, Play, CheckCircle2, Layers, Cpu, Code2 } from 'lucide-react';

interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  description: string;
  roleRequired: string;
  sampleBody?: string;
}

const API_ENDPOINTS: ApiEndpoint[] = [
  {
    method: 'GET',
    path: '/api/v1/services',
    description: 'Fetch active service listings and category definitions',
    roleRequired: 'Public / Customer'
  },
  {
    method: 'GET',
    path: '/api/v1/bookings',
    description: 'List work orders with role-filtered scope',
    roleRequired: 'Customer | Provider | Admin'
  },
  {
    method: 'POST',
    path: '/api/v1/bookings',
    description: 'Create appointment with EF Core atomic transaction',
    roleRequired: 'Customer',
    sampleBody: JSON.stringify({
      serviceId: 'srv-ac-01',
      date: '2026-11-12',
      timeSlot: '09:00 AM - 11:00 AM',
      address: '450 Silicon Pkwy',
      addons: ['add-ac-filter']
    }, null, 2)
  },
  {
    method: 'PUT',
    path: '/api/v1/bookings/{id}/assign',
    description: 'Dispatch certified technician to work order',
    roleRequired: 'Admin',
    sampleBody: JSON.stringify({ providerId: 'prov-01' }, null, 2)
  },
  {
    method: 'PATCH',
    path: '/api/v1/bookings/{id}/status',
    description: 'Advance milestone status & log checklist progress',
    roleRequired: 'ServiceProvider | Admin',
    sampleBody: JSON.stringify({ status: 'In Progress', fieldNote: 'Manifold hooked up' }, null, 2)
  },
  {
    method: 'POST',
    path: '/api/v1/auth/token',
    description: 'Generate signed JWT bearer token with claims',
    roleRequired: 'Anonymous',
    sampleBody: JSON.stringify({ email: 'user@company.com', password: '***' }, null, 2)
  },
  {
    method: 'GET',
    path: '/api/v1/admin/reports/analytics',
    description: 'Aggregated revenue velocity & utilization report',
    roleRequired: 'Admin'
  }
];

export const AzureArchitectureModal: React.FC = () => {
  const { isArchitectureModalOpen, setIsArchitectureModalOpen, bookings, services, providers } = useApp();
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(API_ENDPOINTS[0]);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isArchitectureModalOpen) return null;

  const executeSimulatedApi = () => {
    setLoading(true);
    setApiResponse(null);

    setTimeout(() => {
      let data: unknown = { status: 'OK' };

      if (selectedEndpoint.path === '/api/v1/services') {
        data = services.map((s) => ({ id: s.id, title: s.title, price: s.basePrice, category: s.category }));
      } else if (selectedEndpoint.path === '/api/v1/bookings') {
        data = bookings.slice(0, 3).map((b) => ({ id: b.id, code: b.bookingCode, status: b.status, total: b.totalPrice }));
      } else if (selectedEndpoint.path === '/api/v1/admin/reports/analytics') {
        data = {
          totalBookings: bookings.length,
          totalRevenue: bookings.reduce((s, b) => s + b.totalPrice, 0),
          activeFleetSize: providers.length,
          azureRegion: 'East US (Azure App Service B3)',
          databaseHost: 'servicepro-sql-prod.database.windows.net'
        };
      } else if (selectedEndpoint.method === 'POST' || selectedEndpoint.method === 'PUT' || selectedEndpoint.method === 'PATCH') {
        data = {
          success: true,
          message: `Entity successfully updated in Azure SQL via Entity Framework Core 8.0.4`,
          timestamp: new Date().toISOString(),
          executedUnderRole: 'EnterpriseAdmin'
        };
      }

      setApiResponse(JSON.stringify(data, null, 2));
      setLoading(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Cloud className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Microsoft Azure Cloud Architecture & .NET 8 Web API
              </h2>
              <p className="text-xs text-slate-300">
                Angular 17+ Frontend · ASP.NET Core 8 Web API · EF Core · Microsoft SQL Server
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsArchitectureModalOpen(false)}
            className="text-slate-400 hover:text-white text-xl leading-none p-1 rounded-md"
          >
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-slate-800">
          
          {/* Architecture Topology Visualizer */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-700" />
              <span>Full-Stack Azure Cloud Infrastructure Topology</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
              
              {/* Angular SPA */}
              <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs">
                <div className="w-8 h-8 mx-auto rounded-lg bg-red-100 text-red-700 flex items-center justify-center mb-2 font-bold">
                  A
                </div>
                <div className="font-bold text-slate-900 text-xs">Angular 17+ SPA</div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Azure Static Web Apps / CDN
                </div>
                <div className="mt-2 text-[10px] text-slate-400 font-mono">
                  TypeScript · RxJS · Tailwind
                </div>
              </div>

              {/* ASP.NET Core Web API */}
              <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs">
                <div className="w-8 h-8 mx-auto rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mb-2 font-bold">
                  .NET
                </div>
                <div className="font-bold text-slate-900 text-xs">ASP.NET Core 8 Web API</div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Azure App Service (Linux B3)
                </div>
                <div className="mt-2 text-[10px] text-slate-400 font-mono">
                  JWT Auth · MediatR · CQRS
                </div>
              </div>

              {/* EF Core & SQL Server */}
              <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs">
                <div className="w-8 h-8 mx-auto rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-2 font-bold">
                  <Database className="w-4 h-4" />
                </div>
                <div className="font-bold text-slate-900 text-xs">Microsoft SQL Server</div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Azure SQL Database (General Purpose)
                </div>
                <div className="mt-2 text-[10px] text-slate-400 font-mono">
                  EF Core Code-First · LINQ
                </div>
              </div>

              {/* Cloud Security & Mail */}
              <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs">
                <div className="w-8 h-8 mx-auto rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="font-bold text-slate-900 text-xs">Key Vault & Comm Services</div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Azure Communication Services
                </div>
                <div className="mt-2 text-[10px] text-slate-400 font-mono">
                  Secrets · Transactional Mail
                </div>
              </div>

            </div>
          </div>

          {/* Interactive REST API Swagger Explorer */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-700" />
                <span>Interactive ASP.NET Core REST API Explorer (Swagger / OpenAPI)</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">
                Base URL: https://api.servicepro.azure.net
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              
              {/* Endpoints List */}
              <div className="md:col-span-5 space-y-1.5 max-h-64 overflow-y-auto pr-1">
                {API_ENDPOINTS.map((ep, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedEndpoint(ep);
                      setApiResponse(null);
                    }}
                    className={`w-full p-2.5 rounded-lg border text-left transition-colors flex items-center justify-between gap-2 ${
                      selectedEndpoint.path === ep.path && selectedEndpoint.method === ep.method
                        ? 'border-blue-600 bg-blue-50/60'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                        ep.method === 'GET'
                          ? 'bg-blue-100 text-blue-800'
                          : ep.method === 'POST'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ep.method === 'PUT'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {ep.method}
                      </span>
                      <span className="font-mono text-slate-800 truncate text-[11px]">
                        {ep.path}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Endpoint Runner */}
              <div className="md:col-span-7 bg-slate-900 text-slate-100 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-blue-400">
                        {selectedEndpoint.method}
                      </span>
                      <span className="font-mono text-xs text-white">
                        {selectedEndpoint.path}
                      </span>
                    </div>

                    <button
                      disabled={loading}
                      onClick={executeSimulatedApi}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      <span>{loading ? 'Sending...' : 'Send Request'}</span>
                    </button>
                  </div>

                  <p className="text-slate-400 text-[11px] mt-2">
                    {selectedEndpoint.description} · <span className="text-slate-300">Requires: {selectedEndpoint.roleRequired}</span>
                  </p>

                  {selectedEndpoint.sampleBody && (
                    <div className="mt-3">
                      <div className="text-[10px] font-mono text-slate-500 mb-1">Request Payload (JSON):</div>
                      <pre className="p-2 bg-slate-950 rounded font-mono text-[10px] text-slate-300 overflow-x-auto max-h-24">
                        {selectedEndpoint.sampleBody}
                      </pre>
                    </div>
                  )}

                  {apiResponse && (
                    <div className="mt-3">
                      <div className="text-[10px] font-mono text-emerald-400 mb-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Response 200 OK (application/json)</span>
                      </div>
                      <pre className="p-2 bg-slate-950 rounded font-mono text-[10px] text-emerald-300 overflow-x-auto max-h-36">
                        {apiResponse}
                      </pre>
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-slate-500 font-mono pt-3 border-t border-slate-800">
                  Entity Framework Core DbContext: ServiceProDbContext.cs
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-600">
            Deployed on Azure Cloud &middot; Resource Group: <code className="font-mono text-blue-700 font-bold">rg-servicepro-prod-eastus</code>
          </div>
          <button
            onClick={() => setIsArchitectureModalOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
