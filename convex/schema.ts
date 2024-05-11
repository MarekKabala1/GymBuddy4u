import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.optional(v.string()) || undefined,
    timeStamp: v.float64(),
    userId: v.string(),
  }).index("by_userId", ["userId"]),
  usersMesurments: defineTable({
    userId: v.string(),
    weight: v.number(),
    height: v.number(),
    age: v.number(),
    biceps: v.number(),
    chest: v.number(),
    calves: v.number(),
    thigh: v.number(),
    hips: v.number(),
    belly: v.number(),
    unit: v.string(),
  }).index("by_userId", ["userId"]),
  workoutsWeekRoutine: defineTable({
    creationTime: v.optional(v.number()),
    routineId: v.string(),
    name: v.string(),
    userId: v.string(),
    day: v.string(),
    restDay: v.optional(v.boolean())
  }).index("by_routineId", ["routineId"]),
  workouts: defineTable({
    name: v.string(),
    userId: v.string(),
    index: v.optional(v.number()),
    routineId: v.string(),
    muscleGroup: v.string(),
    sets: v.number(),
    repsValue: v.array(v.number()),
  }).index("by_routineId", ["routineId"])

})