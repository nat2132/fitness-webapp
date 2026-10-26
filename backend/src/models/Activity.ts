import mongoose from 'mongoose';

export type ActivityType = 'walk' | 'run' | 'cycling' | 'swimming' | 'strength' | 'other';

const ACTIVITY_TYPES: ActivityType[] = ['walk', 'run', 'cycling', 'swimming', 'strength', 'other'];

export interface IActivity extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  title: string;
  activityType: ActivityType;
  durationMinutes: number;
  caloriesBurned?: number;
  date: Date;
  notes?: string;
}

const activitySchema = new mongoose.Schema<IActivity>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  activityType: {
    type: String,
    enum: ACTIVITY_TYPES,
    required: true,
  },
  durationMinutes: {
    type: Number,
    required: true,
    min: 1,
  },
  caloriesBurned: {
    type: Number,
    min: 0,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  notes: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);