import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Audit from '../models/Audit.js';
import { runAuditEngine } from '../controllers/auditEngine.js';
import { generateAISummary } from '../controllers/geminiSummary.js';

const router = Router();

// POST /api/audit — new audit create karo
router.post('/', async (req: Request, res: Response) => {
  try {
    const { tools, teamSize, primaryUseCase } = req.body;

    if (!tools || !teamSize || !primaryUseCase) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!Array.isArray(tools) || tools.length === 0) {
      return res.status(400).json({ error: 'At least one tool required' });
    }

    // Run audit engine
    const { results, totalMonthlySavings, totalAnnualSavings } = runAuditEngine(
      tools,
      teamSize,
      primaryUseCase
    );

    // Generate AI summary
    const aiSummary = await generateAISummary(
      tools,
      results,
      totalMonthlySavings,
      teamSize,
      primaryUseCase
    );

    // Save to MongoDB
    const shareId = uuidv4().slice(0, 8);
    const audit = new Audit({
      shareId,
      tools,
      teamSize,
      primaryUseCase,
      results,
      totalMonthlySavings,
      totalAnnualSavings,
      aiSummary,
    });

    await audit.save();

    res.status(201).json({
      shareId,
      results,
      totalMonthlySavings,
      totalAnnualSavings,
      aiSummary,
    });
  } catch (error) {
    console.error('Audit error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/audit/:shareId — public share URL ke liye
router.get('/:shareId', async (req: Request, res: Response) => {
  try {
    const audit = await Audit.findOne({ shareId: req.params.shareId });

    if (!audit) {
      return res.status(404).json({ error: 'Audit not found' });
    }

    // Email strip karke public version return karo
    res.json({
      shareId: audit.shareId,
      tools: audit.tools,
      results: audit.results,
      totalMonthlySavings: audit.totalMonthlySavings,
      totalAnnualSavings: audit.totalAnnualSavings,
      aiSummary: audit.aiSummary,
      primaryUseCase: audit.primaryUseCase,
      teamSize: audit.teamSize,
      createdAt: audit.createdAt,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;