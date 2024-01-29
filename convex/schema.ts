import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.optional(v.string()) || undefined,
    timeStamp: v.float64(),
    userId: v.string(),
  })
    .index("by_userId", ["userId"])
})