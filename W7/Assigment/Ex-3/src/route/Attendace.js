import { Router } from 'express';
const router = Router();
import { Student, Class, AttendanceRecord } from '../models/index.js';

// POST /attendance?studentId=1&date=2025-06-17
router.post('/', async (req, res) => {
  try {
    const { studentId, date } = req.query;
    const { classId, present } = req.body;
    

    // Validate inputs
    if (!studentId || !date || !classId || present === undefined) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Check if student and class exist
    const student = await Student.findByPk(studentId);
    const classInstance = await Class.findByPk(classId);
    if (!student || !classInstance) {
      return res.status(404).json({ error: 'Student or Class not found' });
    }

    // Create attendance record
    const attendance = await AttendanceRecord.create({
      date: new Date(date),
      present,
      StudentId: studentId,
      ClassId: classId
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /attendance?studentId=1&date=2025-06-17
router.get('/', async (req, res) => {
  try {
    const { studentId, date } = req.query;

    // Validate inputs
    if (!studentId || !date) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const attendance = await AttendanceRecord.findOne({
      where: {
        StudentId: studentId,
        date: new Date(date)
      }
    });

    if (!attendance) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /classes/:id/attendance
router.get('/classes/:id/attendance', async (req, res) => {
  try {
    const classInstance = await Class.findByPk(req.params.id, {
      include: [{
        model: AttendanceRecord,
        include: [Student]
      }]
    });

    if (!classInstance) {
      return res.status(404).json({ error: 'Class not found' });
    }

    res.json(classInstance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /students/:id/attendance
router.get('/students/:id/attendance', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id, {
      include: [AttendanceRecord]
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;