import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserId } from "./utils";




export const createUserMeasurement = mutation({
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
    unit: v.string()

  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    if (!userId) {
      throw new Error("no user with that id found");
    }
    await ctx.db.insert('usersMesurments', {
      age: args.age,
      biceps: args.biceps,
      chest: args.chest,
      calves: args.calves,
      belly: args.belly,
      hips: args.hips,
      thigh: args.thigh,
      userId: args.userId,
      weight: args.weight,
      height: args.height,
      unit: args.unit
    })
  }
})


export const getAllMesurmentsForUser = query({
  args: {},
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("usersMesurments")
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("desc")
      .collect();
  },
});

export const getLastMeasurementForUser = query({
  args: {},
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("usersMesurments")
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("desc")
      .first();
  }
})

export const deleteUserMeasurement = mutation({
  args: { measurementId: v.id('usersMesurments') },
  async handler(ctx, args) {
    const userId = await getUserId(ctx);
    if (!userId) {
      console.warn("userId is null or undefined");
      return;
    }

    const userMeasuremrnt = await ctx.db.get(args.measurementId);

    if (!userMeasuremrnt) {
      console.warn("can't find user, does not exist", userId);
      return "User measurement not found";
    } else {
      await ctx.db.delete(userMeasuremrnt._id);
      return "User measurement deleted";

    }
  },
});