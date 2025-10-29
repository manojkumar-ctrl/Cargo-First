import express from 'express';
import { createJob, getJobs, updateJob, deleteJob } from '../controllers/jobController.js';
import { authMiddleware } from '../middleware/authMiddleware.js'; // ✅ correct import

const router = express.Router();

// Public route
router.get('/', getJobs);

// Protected routes
router.post('/', authMiddleware, createJob);
router.put('/:id', authMiddleware, updateJob);
router.delete('/:id', authMiddleware, deleteJob);

export default router;
