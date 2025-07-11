import { Router } from 'express';
import {
  getStudentTickets,
  getSubmissionPdf,
  getTAStats,
  getTAProfile,
  getPendingEnrollments,
  handleEnrollmentDecision,
  resolveTicket,
  escalateTicketToTeacher
} from '../../controllers/ta/ta.controller.ts';
import { authMiddleware } from '../../middlewares/authMiddleware.ts';
import { authorizeRoles } from '../../middlewares/authorizeRoles.ts';
import { authorizeTA } from '../../middlewares/authorizeTA.ts';

const router = Router();

// Wrap async middleware to handle errors properly
const asyncHandler = (fn: any) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Apply authentication middleware to all routes
router.use(asyncHandler(authMiddleware));
router.use(asyncHandler(authorizeTA));

// Get TA profile with assigned courses and batches
router.get('/profile', asyncHandler(getTAProfile));

// Get pending enrollments for TA's assigned batches
router.get('/pending-enrollments', asyncHandler(getPendingEnrollments));

// Handle enrollment decision (approve/reject)
router.post('/enrollment/:enrollmentId/decision', asyncHandler(handleEnrollmentDecision));

// Get TA dashboard statistics
router.get('/stats', asyncHandler(getTAStats));

// Get all student tickets for TA's assigned batches and courses
router.get('/student-tickets', asyncHandler(getStudentTickets));

// Get submission PDF for an evaluation
// ...existing code...

// Get submission PDF for a ticket
router.get('/submission/:ticketId', asyncHandler(getSubmissionPdf));

// ...existing code...
// Resolve a student ticket
router.post('/resolve-ticket/:ticketId', asyncHandler(resolveTicket));

// Escalate a ticket to teachers
router.post('/escalate-ticket/:ticketId', asyncHandler(escalateTicketToTeacher));

export default router;