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
  timeStamp: number;
};
type Id<T> = string;