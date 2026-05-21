import { Router, Request, Response } from 'express';
import Lead from '../models/Lead.js';

const router = Router();

// POST /api/leads — email capture
router.post('/', async (req: Request, res: Response) => {
  try {
    const { email, companyName, role, teamSize, auditId, totalMonthlySavings } = req.body;

    if (!email || !auditId) {
      return res.status(400).json({ error: 'Email and auditId required' });
    }

    // Honeypot check — agar website field filled hai toh bot hai
    if (req.body.website) {
      return res.status(200).json({ message: 'ok' });
    }

    const isHighSavings = totalMonthlySavings > 500;

    const lead = new Lead({
      email,
      companyName,
      role,
      teamSize,
      auditId,
      totalMonthlySavings,
      isHighSavings,
    });

    await lead.save();

    res.status(201).json({
      message: 'Lead captured successfully',
      isHighSavings,
    });
  } catch (error) {
    console.error('Lead error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;