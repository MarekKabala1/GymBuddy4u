import { Id } from "@/convex/_generated/dataModel";

export interface UserMeasurements {
  _id?: Id<"usersMesurments">;
  _creationTime?: number;
  userId: string;
  weight: number;
  height: number;
  age: number;
  biceps: number;
  chest: number;
  calves: number;
  thigh: number;
  hips: number;
  belly: number;
  unit: string
};

export interface IconProps {
  className?: string;
}

export interface WorkoutSet {
  reps: number;
}

export interface Workout {
  day: string;
  muscleGroup: string;
  exerciseName: string;
  sets: number
  reps: WorkoutSet[];
}