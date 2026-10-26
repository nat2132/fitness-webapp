import express from 'express';
import {
  getActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
} from '../controllers/activityController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.use(auth);

router.route('/').get(getActivities).post(createActivity);
router.route('/:id').get(getActivity).put(updateActivity).delete(deleteActivity);

export default router;
