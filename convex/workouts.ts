import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserId } from "./utils"

export const addWeekRoutine = mutation({
  args: {
    userId: v.string(),
    day: v.string(),
    name: v.string()
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    if (!userId) {
      throw new Error("no user with that id found");
    }
    await ctx.db.insert('workouts', {
      name: args.name,
      userId: args.userId,
      day: args.day
    })
  }
})

export const getAllWeekRoutines = query({
  args: {},
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("workouts")
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("desc")
      .collect();
  },
});
