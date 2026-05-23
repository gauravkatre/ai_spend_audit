import { runAuditEngine } from '../controllers/auditEngine.js';

describe('Audit Engine Tests', () => {

  // Test 1: Cursor Business 2 seats — downgrade to Pro
  test('Cursor Business with 2 seats should recommend downgrade to Pro', () => {
    const result = runAuditEngine(
      [{ toolName: 'cursor', plan: 'business', monthlySpend: 80, seats: 2 }],
      2,
      'coding'
    );
    expect(result.results[0].recommendedAction).toBe('Downgrade to Pro plan');
    expect(result.results[0].savings).toBe(40);
  });

  // Test 2: Claude Max 1 seat — downgrade to Pro
  test('Claude Max with 1 seat should recommend downgrade to Pro', () => {
    const result = runAuditEngine(
      [{ toolName: 'claude', plan: 'max', monthlySpend: 100, seats: 1 }],
      1,
      'writing'
    );
    expect(result.results[0].recommendedAction).toBe('Downgrade to Pro plan');
    expect(result.results[0].savings).toBe(80);
  });

  // Test 3: GitHub Copilot Business 2 seats — switch to Individual
  test('GitHub Copilot Business with 2 seats should recommend Individual plan', () => {
    const result = runAuditEngine(
      [{ toolName: 'github_copilot', plan: 'business', monthlySpend: 38, seats: 2 }],
      2,
      'coding'
    );
    expect(result.results[0].recommendedAction).toBe('Switch to Individual plan per developer');
    expect(result.results[0].savings).toBeGreaterThan(0);
  });

  // Test 4: Total savings calculation correct
  test('Total monthly and annual savings should be calculated correctly', () => {
    const result = runAuditEngine(
      [
        { toolName: 'cursor', plan: 'business', monthlySpend: 80, seats: 2 },
        { toolName: 'claude', plan: 'max', monthlySpend: 100, seats: 1 },
      ],
      3,
      'coding'
    );
    expect(result.totalMonthlySavings).toBe(120);
    expect(result.totalAnnualSavings).toBe(1440);
  });

  // Test 5: Optimal spend — no savings
  test('Well-optimized spend should return 0 savings', () => {
    const result = runAuditEngine(
      [{ toolName: 'cursor', plan: 'pro', monthlySpend: 20, seats: 1 }],
      1,
      'coding'
    );
    expect(result.results[0].savings).toBe(0);
    expect(result.results[0].recommendedAction).toBe('No changes needed');
  });

  // Test 6: Both Claude and ChatGPT — consolidate recommendation
  test('Having both Claude and ChatGPT should recommend consolidation', () => {
    const result = runAuditEngine(
      [
        { toolName: 'claude', plan: 'pro', monthlySpend: 20, seats: 1 },
        { toolName: 'chatgpt', plan: 'plus', monthlySpend: 20, seats: 1 },
      ],
      1,
      'writing'
    );
    const hasConsolidation = result.results.some(
      (r) => r.recommendedAction.includes('Consolidate')
    );
    expect(hasConsolidation).toBe(true);
  });

  // Test 7: Gemini Ultra small team — downgrade
  test('Gemini Ultra with 2 seats should recommend Pro plan', () => {
    const result = runAuditEngine(
      [{ toolName: 'gemini', plan: 'ultra', monthlySpend: 80, seats: 2 }],
      2,
      'research'
    );
    expect(result.results[0].recommendedAction).toBe('Downgrade to Pro plan');
    expect(result.results[0].savings).toBeGreaterThan(0);
  });

});