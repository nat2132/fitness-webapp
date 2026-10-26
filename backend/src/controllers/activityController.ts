import { Request, Response } from 'express';
import { Activity } from '../models/Activity';

export const getActivities = async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find({ user: req.user?._id }).sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
};

export const getActivity = async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findOne({ _id: req.params.id, user: req.user?._id });

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.json(activity);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch activity' });
  }
};

export const createActivity = async (req: Request, res: Response) => {
  try {
    const { title, activityType, durationMinutes, caloriesBurned, date, notes } = req.body;
    const activity = new Activity({
      user: req.user?._id,
      title,
      activityType,
      durationMinutes,
      caloriesBurned,
      date,
      notes,
    });
    await activity.save();

    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create activity' });
  }
};

export const updateActivity = async (req: Request, res: Response) => {
  try {
    const { title, activityType, durationMinutes, caloriesBurned, date, notes } = req.body;
    const activity = await Activity.findOneAndUpdate(
      { _id: req.params.id, user: req.user?._id },
      { title, activityType, durationMinutes, caloriesBurned, date, notes },
      { new: true, runValidators: true }
    );

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.json(activity);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update activity' });
  }
};

export const deleteActivity = async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findOneAndDelete({ _id: req.params.id, user: req.user?._id });

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
};
