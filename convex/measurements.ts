import { v } from "convex/values";
import { internalMutation, mutation } from "./_generated/server";
import { getUserId } from "./utils";


export const usersMesurments = mutation({
  args: {
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

  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    console.log(userId)
    if (!userId) {
      throw new Error("no user with that id found");
    }
    const createUserMeasurement = await ctx.db.insert('usersMesurments', {
      age: args.age,
      biceps: args.biceps,
      chest: args.chest,
      calves: args.calves,
      belly: args.belly,
      hips: args.hips,
      thigh: args.thigh,
      userId: args.userId,
      weight: args.weight,
      height: args.height
    })
  }
})