import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuditStore } from '../store/auditStore.js';
import { TOOLS } from '../types/index.js';
import { submitAudit } from '../lib/api.js';

export default function AuditPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    selectedTools,
    toolInputs,
    teamSize,
    primaryUseCase,
    toggleTool,
    updateToolInput,
    setTeamSize,
    setPrimaryUseCase,
    setAuditResult,
  } = useAuditStore();

  const handleSubmit = async () => {
    if (selectedTools.length === 0) {
      setError('Please select at least one tool');
      return;
    }

    const tools = selectedTools.map((id) => ({
      toolName: id,
      plan: toolInputs[id]?.plan || TOOLS.find((t) => t.id === id)!.plans[0],
      monthlySpend: toolInputs[id]?.monthlySpend || 0,
      seats: toolInputs[id]?.seats || 1,
    }));

    setLoading(true);
    setError('');

    try {
      const result = await submitAudit({ tools, teamSize, primaryUseCase });
      setAuditResult(result);
      navigate(`/results/${result.shareId}`);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Nav */}
      <nav className="flex items-center px-6 py-4 border-b border-slate-700">
        <span className="text-xl font-bold text-emerald-400">SpendSmart AI</span>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Audit Your AI Spend</h1>
        <p className="text-slate-400 mb-8">Select the tools your team uses and fill in your current spend.</p>

        {/* Team Info */}
        <div className="bg-slate-800 rounded-xl p-6 mb-6 border border-slate-700">
          <h2 className="text-lg font-semibold mb-4">Team Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Team Size</label>
              <input
                type="number"
                min={1}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Primary Use Case</label>
              <select
                value={primaryUseCase}
                onChange={(e) => setPrimaryUseCase(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="coding">Coding</option>
                <option value="writing">Writing</option>
                <option value="data">Data Analysis</option>
                <option value="research">Research</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tool Selection */}
        <div className="bg-slate-800 rounded-xl p-6 mb-6 border border-slate-700">
          <h2 className="text-lg font-semibold mb-4">Select Your AI Tools</h2>
          <div className="grid grid-cols-2 gap-3">
            {TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => toggleTool(tool.id)}
                className={`p-3 rounded-lg border text-left transition ${
                  selectedTools.includes(tool.id)
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                    : 'border-slate-600 bg-slate-700 text-slate-300 hover:border-slate-500'
                }`}
              >
                {tool.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tool Inputs */}
        {selectedTools.length > 0 && (
          <div className="bg-slate-800 rounded-xl p-6 mb-6 border border-slate-700">
            <h2 className="text-lg font-semibold mb-4">Tool Details</h2>
            <div className="space-y-6">
              {selectedTools.map((toolId) => {
                const tool = TOOLS.find((t) => t.id === toolId)!;
                const input = toolInputs[toolId] || {};
                return (
                  <div key={toolId} className="border-b border-slate-700 pb-6 last:border-0 last:pb-0">
                    <h3 className="font-medium text-white mb-3">{tool.name}</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-sm text-slate-400 mb-1 block">Plan</label>
                        <select
                          value={input.plan || tool.plans[0]}
                          onChange={(e) => updateToolInput(toolId, { plan: e.target.value })}
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                        >
                          {tool.plans.map((plan) => (
                            <option key={plan} value={plan}>
                              {plan.charAt(0).toUpperCase() + plan.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-slate-400 mb-1 block">Monthly Spend ($)</label>
                        <input
                          type="number"
                          min={0}
                          value={input.monthlySpend || ''}
                          placeholder="0"
                          onChange={(e) => updateToolInput(toolId, { monthlySpend: Number(e.target.value) })}
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-slate-400 mb-1 block">Seats</label>
                        <input
                          type="number"
                          min={1}
                          value={input.seats || ''}
                          placeholder="1"
                          onChange={(e) => updateToolInput(toolId, { seats: Number(e.target.value) })}
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || selectedTools.length === 0}
          className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white py-4 rounded-xl text-lg font-semibold transition"
        >
          {loading ? 'Analyzing your spend...' : 'Get My Free Audit →'}
        </button>
      </div>
    </div>
  );
}