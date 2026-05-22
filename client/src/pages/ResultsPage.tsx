import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuditStore } from '../store/auditStore.js';
import { getAuditByShareId, submitLead } from '../lib/api.js';
import type { AuditResponse } from '../types/index.js';

export default function ResultsPage() {
  const { shareId } = useParams<{ shareId: string }>();
  const navigate = useNavigate();
  const { auditResult, setAuditResult } = useAuditStore();

  const [audit, setAudit] = useState<AuditResponse | null>(auditResult);
  const [loading, setLoading] = useState(!auditResult);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [leadLoading, setLeadLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!auditResult && shareId) {
      getAuditByShareId(shareId)
        .then((data) => {
          setAudit(data);
          setAuditResult(data);
        })
        .catch(() => navigate('/'))
        .finally(() => setLoading(false));
    }
  }, [shareId]);

  const handleLeadSubmit = async () => {
    if (!email || !audit) return;
    setLeadLoading(true);
    try {
      await submitLead({
        email,
        companyName,
        role,
        auditId: audit.shareId,
        totalMonthlySavings: audit.totalMonthlySavings,
      });
      setLeadSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLeadLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading your audit...</p>
        </div>
      </div>
    );
  }

  if (!audit) return null;

  const isHighSavings = audit.totalMonthlySavings > 500;
  const isOptimal = audit.totalMonthlySavings < 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
        <span
          onClick={() => navigate('/')}
          className="text-xl font-bold text-emerald-400 cursor-pointer"
        >
          SpendSmart AI
        </span>
        <button
          onClick={handleCopyLink}
          className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          {copied ? '✓ Copied!' : '🔗 Share Report'}
        </button>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Hero Savings */}
        <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-8 mb-8 text-center">
          {isOptimal ? (
            <>
              <div className="text-5xl mb-3">✅</div>
              <h1 className="text-3xl font-bold text-white mb-2">You're spending well!</h1>
              <p className="text-slate-400">Your AI tool spend looks optimized for your team size.</p>
            </>
          ) : (
            <>
              <p className="text-slate-400 mb-2">Potential Monthly Savings</p>
              <div className="text-6xl font-bold text-emerald-400 mb-2">
                ${audit.totalMonthlySavings.toLocaleString()}
              </div>
              <div className="text-slate-400 text-lg">
                ${audit.totalAnnualSavings.toLocaleString()} per year
              </div>
            </>
          )}
        </div>

        {/* AI Summary */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-emerald-400">✦</span>
            <h2 className="font-semibold">AI Analysis</h2>
          </div>
          <p className="text-slate-300 leading-relaxed">{audit.aiSummary}</p>
        </div>

        {/* Per Tool Breakdown */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-lg mb-5">Tool Breakdown</h2>
          <div className="space-y-4">
            {audit.results.map((result, i) => (
              <div
                key={i}
                className="flex items-start justify-between border-b border-slate-700 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium capitalize">
                      {result.toolName.replace('_', ' ')}
                    </span>
                    {result.savings > 0 ? (
                      <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        Save ${result.savings}/mo
                      </span>
                    ) : (
                      <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">
                        Optimal
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-emerald-400 mb-1">{result.recommendedAction}</p>
                  <p className="text-sm text-slate-400">{result.reason}</p>
                </div>
                <div className="text-right ml-4 shrink-0">
                  <div className="text-sm text-slate-400">${result.currentSpend}/mo</div>
                  {result.savings > 0 && (
                    <div className="text-sm text-emerald-400 font-medium">
                      → ${result.currentSpend - result.savings}/mo
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Credex CTA — high savings only */}
        {isHighSavings && (
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-2">Save even more with Credex</h2>
            <p className="text-emerald-100 mb-4 text-sm">
              Credex sells discounted AI credits — Cursor, Claude, ChatGPT Enterprise — sourced
              from companies that overforecast. Stack these savings on top of your plan optimizations.
            </p>
            <a
              href="https://credex.rocks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-emerald-700 font-semibold px-6 py-3 rounded-lg hover:bg-emerald-50 transition"
            >
              Book a Free Credex Consultation →
            </a>
          </div>
        )}

        {/* Lead Capture */}
        {!leadSubmitted ? (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
            {isOptimal ? (
              <h2 className="font-semibold text-lg mb-2">
                Get notified when optimizations apply to your stack
              </h2>
            ) : (
              <h2 className="font-semibold text-lg mb-2">Get your full report by email</h2>
            )}
            <p className="text-slate-400 text-sm mb-4">
              We'll send you the complete breakdown and notify you when new savings opportunities arise.
            </p>

            {!showLeadForm ? (
              <button
                onClick={() => setShowLeadForm(true)}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-medium transition"
              >
                {isOptimal ? 'Notify Me' : 'Email Me This Report'}
              </button>
            ) : (
              <div className="space-y-3">
                {/* Honeypot */}
                <input type="text" name="website" className="hidden" tabIndex={-1} />

                <input
                  type="email"
                  placeholder="your@email.com *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
                <input
                  type="text"
                  placeholder="Company name (optional)"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
                <input
                  type="text"
                  placeholder="Your role (optional)"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={handleLeadSubmit}
                  disabled={!email || leadLoading}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-600 text-white py-3 rounded-lg font-medium transition"
                >
                  {leadLoading ? 'Sending...' : 'Send My Report'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 mb-8 text-center">
            <div className="text-3xl mb-2">✅</div>
            <h2 className="font-semibold text-emerald-400">Report sent!</h2>
            <p className="text-slate-400 text-sm mt-1">
              Check your inbox. We'll be in touch soon.
            </p>
          </div>
        )}

        {/* New Audit */}
        <button
          onClick={() => navigate('/audit')}
          className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-medium transition"
        >
          ← Run Another Audit
        </button>
      </div>
    </div>
  );
}