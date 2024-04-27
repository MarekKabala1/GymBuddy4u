import { Id } from "../../convex/_generated/dataModel";

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
  _id?: Id<"workouts">;
  _creationTime?: number;
  muscleGroup: string;
  name: string;
  repsValue: Array<number>;
  routineId: string;
  userId: string;
  sets: number

}

export interface WorkoutRoutine {
  _id?: Id<"workoutsWeekRoutine">;
  _creationTime?: number;
  routineId: string;
  userId: string;
  day: string;
  name: string;
  restDay?: boolean
}