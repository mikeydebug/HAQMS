const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/reports/doctor-stats
// Highly inefficient nested loop aggregate reporting for admin/receptionists dashboard
// PERFORMANCE BUG: Performs multiple nested DB queries inside a loop for every doctor.
// Runs sequentially, blocking/scaling terrible with doctors count.
router.get('/doctor-stats', authenticate, async (req, res) => {
  try {
    const start = Date.now();

    // 1. Fetch all doctors
    const doctors = await prisma.doctor.findMany();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Fetch all related data in bulk (O(1) queries instead of O(N))
    const [allAppointments, allTokens] = await Promise.all([
      prisma.appointment.findMany(),
      prisma.queueToken.findMany({ where: { createdAt: { gte: today } } })
    ]);

    const reportData = doctors.map((doc) => {
      const docAppointments = allAppointments.filter(a => a.doctorId === doc.id);
      const totalAppointments = docAppointments.length;
      const completedAppointments = docAppointments.filter(a => a.status === 'COMPLETED').length;
      const cancelledAppointments = docAppointments.filter(a => a.status === 'CANCELLED').length;
      const queueTokensCount = allTokens.filter(t => t.doctorId === doc.id).length;
      
      const revenue = completedAppointments * (doc.consultationFee || 0);

      return {
        id: doc.id,
        name: doc.name,
        specialization: doc.specialization,
        department: doc.department,
        totalAppointments,
        completedAppointments,
        cancelledAppointments,
        todayQueueSize: queueTokensCount,
        revenue,
      };
    });

    const durationMs = Date.now() - start;

    res.json({
      success: true,
      timeTakenMs: durationMs,
      data: reportData,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate report', details: error.message });
  }
});

module.exports = router;
