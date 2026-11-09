import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileText, Copy, CheckCircle, ExternalLink, Award, Sparkles, Server } from 'lucide-react';

export const ResumeShowcaseModal: React.FC = () => {
  const { isResumeModalOpen, setIsResumeModalOpen, setCurrentTab } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isResumeModalOpen) return null;

  const resumeText = `ServicePro – Service Booking & Management System
• Built a full-stack service booking platform using Angular 17+ and ASP.NET Core 8 Web API.
• Developed RESTful APIs for service management, appointment scheduling, technician assignment, and work order operations.
• Implemented SQL Server database integration using Entity Framework Core with Code-First migrations and LINQ queries.
• Integrated JWT authentication and role-based authorization (RBAC) for customers, providers, and administrators.
• Deployed the application on Microsoft Azure with App Service, Azure SQL, and Azure Key Vault.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                ServicePro – Resume Description & Project Overview
              </h2>
              <p className="text-xs text-slate-300">
                Enterprise Portfolio Highlights & Technical Architecture Breakdown
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsResumeModalOpen(false)}
            className="text-slate-400 hover:text-white text-xl leading-none p-1 rounded-md"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-slate-800">
          
          {/* Resume Bullet Points Box */}
          <div className="border border-blue-200 bg-blue-50/50 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-blue-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Award className="w-4 h-4 text-blue-700" />
                <span>Ready-To-Paste Resume Description</span>
              </span>

              <button
                onClick={handleCopy}
                className="text-blue-700 hover:text-blue-800 font-semibold flex items-center gap-1 bg-white px-2.5 py-1 rounded border border-blue-200 shadow-2xs transition-colors"
              >
                {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Bullets'}</span>
              </button>
            </div>

            <div className="bg-white p-4 rounded-lg border border-blue-100 font-sans text-slate-800 leading-relaxed space-y-2">
              <div className="font-bold text-sm text-slate-900">
                ServicePro – Service Booking & Management System
              </div>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                <li>
                  Built a full-stack service booking platform using <strong>Angular 17+</strong> and <strong>ASP.NET Core 8 Web API</strong>.
                </li>
                <li>
                  Developed RESTful APIs for service catalog management, appointment scheduling, and field operations tracking.
                </li>
                <li>
                  Implemented <strong>Microsoft SQL Server</strong> database integration using <strong>Entity Framework Core</strong> with Code-First migrations.
                </li>
                <li>
                  Integrated <strong>JWT authentication</strong> and role-based authorization (RBAC) for customers, certified service providers, and administrators.
                </li>
                <li>
                  Architected and deployed cloud infrastructure on <strong>Microsoft Azure</strong> (App Service, Azure SQL, Key Vault, Communication Services).
                </li>
              </ul>
            </div>
          </div>

          {/* Technical Stack Breakdown */}
          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
              Full-Stack Enterprise Technology Matrix
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="text-[10px] uppercase font-bold text-slate-400">Frontend</div>
                <div className="font-bold text-slate-900 mt-0.5">Angular 17+ / TS</div>
                <div className="text-[11px] text-slate-500 mt-1">Reactive Forms & Guards</div>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="text-[10px] uppercase font-bold text-slate-400">Backend API</div>
                <div className="font-bold text-slate-900 mt-0.5">.NET 8 Web API</div>
                <div className="text-[11px] text-slate-500 mt-1">C# & MediatR Handlers</div>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="text-[10px] uppercase font-bold text-slate-400">Database</div>
                <div className="font-bold text-slate-900 mt-0.5">Microsoft SQL Server</div>
                <div className="text-[11px] text-slate-500 mt-1">Azure SQL DB Engine</div>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="text-[10px] uppercase font-bold text-slate-400">ORM Layer</div>
                <div className="font-bold text-slate-900 mt-0.5">Entity Framework Core</div>
                <div className="text-[11px] text-slate-500 mt-1">Code-First Migrations</div>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="text-[10px] uppercase font-bold text-slate-400">Security</div>
                <div className="font-bold text-slate-900 mt-0.5">JWT & Claims Auth</div>
                <div className="text-[11px] text-slate-500 mt-1">HMAC-SHA256 Token Signing</div>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="text-[10px] uppercase font-bold text-slate-400">Cloud Host</div>
                <div className="font-bold text-slate-900 mt-0.5">Microsoft Azure</div>
                <div className="text-[11px] text-slate-500 mt-1">App Service & Key Vault</div>
              </div>
            </div>
          </div>

          {/* Key Engineering Accomplishments */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs">
              System Design & Architecture Highlights:
            </h4>
            <ul className="space-y-1.5 text-slate-600 pl-4 list-disc">
              <li>
                <strong>State Machine Lifecycle:</strong> Implemented strict booking transitions (<code className="font-mono bg-slate-200 px-1 rounded text-slate-800">Requested &rarr; Approved &rarr; Assigned &rarr; In Progress &rarr; Completed</code>) preventing orphaned technician states.
              </li>
              <li>
                <strong>Concurrency & Scheduling:</strong> Optimized technician booking windows preventing double-bookings using SQL Server isolation levels.
              </li>
              <li>
                <strong>Role-Based Access Control:</strong> Strict separation of concerns between residential customers, field contractors, and enterprise dispatchers.
              </li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => {
              setIsResumeModalOpen(false);
              setCurrentTab('architecture');
            }}
            className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1"
          >
            <Server className="w-3.5 h-3.5" />
            <span>Open Azure Architecture Explorer &rarr;</span>
          </button>

          <button
            onClick={() => setIsResumeModalOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
