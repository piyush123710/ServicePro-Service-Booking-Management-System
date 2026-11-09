import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { decodeJwt } from '../data/mockData';
import { Shield, Key, Lock, CheckCircle, Copy, AlertCircle, RefreshCw } from 'lucide-react';

export const JwtSecurityModal: React.FC = () => {
  const { isJwtModalOpen, setIsJwtModalOpen, currentUser, switchPersona } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isJwtModalOpen) return null;

  const decoded = decodeJwt(currentUser.token);
  const parts = currentUser.token.split('.');

  const copyToken = () => {
    navigator.clipboard.writeText(`Bearer ${currentUser.token}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                JWT Authentication & Role-Based Access Control (RBAC)
              </h2>
              <p className="text-xs text-slate-300">
                ASP.NET Core 8 Web API Bearer Token Claims & Authorization Inspector
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsJwtModalOpen(false)}
            className="text-slate-400 hover:text-white text-xl leading-none p-1 rounded-md"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-slate-800">
          
          {/* Active Session & Switcher */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Active Authenticated Identity
              </div>
              <div className="font-bold text-slate-900 text-sm mt-0.5">
                {currentUser.name} <span className="font-mono text-xs text-blue-700">({currentUser.role})</span>
              </div>
              <div className="text-slate-500 font-mono text-[11px]">
                {currentUser.email}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Test Persona:</span>
              <button
                onClick={() => switchPersona('customer')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${currentUser.role === 'Customer' ? 'bg-blue-700 text-white font-semibold' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'}`}
              >
                Customer
              </button>
              <button
                onClick={() => switchPersona('provider')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${currentUser.role === 'ServiceProvider' ? 'bg-blue-700 text-white font-semibold' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'}`}
              >
                Provider
              </button>
              <button
                onClick={() => switchPersona('admin')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${currentUser.role === 'Admin' ? 'bg-blue-700 text-white font-semibold' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'}`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Raw Encoded JWT Token */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-blue-700" />
                <span>Raw Signed JSON Web Token (Authorization: Bearer ...)</span>
              </span>
              <button
                onClick={copyToken}
                className="text-blue-700 hover:text-blue-800 font-medium flex items-center gap-1"
              >
                {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Header'}</span>
              </button>
            </div>

            <div className="p-3 bg-slate-950 text-slate-200 font-mono text-[11px] rounded-lg break-all leading-relaxed select-all border border-slate-800">
              <span className="text-red-400">{parts[0]}</span>.
              <span className="text-purple-400">{parts[1]}</span>.
              <span className="text-emerald-400">{parts[2]}</span>
            </div>
            <div className="mt-1 flex items-center gap-4 text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400"></span> Header (Algorithm)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-400"></span> Payload (Claims & Roles)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> HMAC-SHA256 Signature</span>
            </div>
          </div>

          {/* 2-Column Decoded Inspection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Header Claims */}
            <div className="border border-slate-200 rounded-xl p-4 bg-white">
              <h3 className="font-bold text-slate-900 text-xs mb-2 text-red-700">
                Decoded JWT Header
              </h3>
              <pre className="p-3 bg-slate-50 rounded-lg font-mono text-[11px] text-slate-800 overflow-x-auto border border-slate-100">
                {JSON.stringify(decoded?.header, null, 2)}
              </pre>
            </div>

            {/* Payload Claims */}
            <div className="border border-slate-200 rounded-xl p-4 bg-white">
              <h3 className="font-bold text-slate-900 text-xs mb-2 text-purple-700">
                Decoded Identity Claims (ClaimsPrincipal)
              </h3>
              <pre className="p-3 bg-slate-50 rounded-lg font-mono text-[11px] text-slate-800 overflow-x-auto border border-slate-100">
                {JSON.stringify(decoded?.payload, null, 2)}
              </pre>
            </div>

          </div>

          {/* .NET 8 Backend Role-Based Authorization Code Pattern */}
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2">
            <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-blue-700" />
              <span>ASP.NET Core 8 Web API Authorization Policy Implementation</span>
            </h3>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              In the backend, all requests pass through Microsoft's <code className="font-mono bg-blue-100 px-1 py-0.5 rounded text-blue-900">JwtBearerHandler</code> middleware. Controllers enforce granular permissions using declarative attributes:
            </p>
            <div className="p-3 bg-slate-900 text-slate-100 font-mono text-[11px] rounded-lg overflow-x-auto">
{`// BookingsController.cs (ASP.NET Core 8 Web API)
[Authorize]
[ApiController]
[Route("api/v1/[controller]")]
public class BookingsController : ControllerBase
{
    // Accessible by all authenticated roles
    [HttpGet]
    public async Task<IActionResult> GetMyBookings() => ...;

    // Dispatched field technicians & Admins only
    [HttpPatch("{id}/status")]
    [Authorize(Roles = "ServiceProvider,Admin")]
    public async Task<IActionResult> UpdateStatus(string id, [FromBody] UpdateStatusDto dto) => ...;

    // Enterprise Admins only
    [HttpPut("{id}/assign")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> AssignTechnician(string id, [FromBody] AssignDto dto) => ...;
}`}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 font-mono">
            Key Vault Secret: AZURE_JWT_SECRET_KEY_PROD
          </div>
          <button
            onClick={() => setIsJwtModalOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
