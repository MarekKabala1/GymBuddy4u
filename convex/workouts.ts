import { v } from "convex/values";
import { ActionCtx, MutationCtx, QueryCtx, mutation, query } from "./_generated/server";
import { getUserId } from "./utils"
import { Doc, Id } from "./_generated/dataModel";


export async function getSingleDayRoutine(
  ctx: QueryCtx,
  routineId: string
) {
  return await ctx.db
    .query("workoutsWeekRoutine")
    .withIndex("by_routineId", (q) => q.eq("routineId", routineId))
    .unique();
}
export const getDayRoutine = query({
  args: {
    routineId: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("workoutsWeekRoutine")
      .filter((q) => q.eq(q.field("routineId"), args.routineId))
      .order("desc")
      .collect();
  },
});


export const addDayForWeekRoutine = mutation({
  args: {
    routineId: v.string(),
    userId: v.string(),
    day: v.string(),
    name: v.string(),
    restDay: v.optional(v.boolean())
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    if (!userId) {
      throw new Error("no user with that id found");
    }
    await ctx.db.insert('workoutsWeekRoutine', {
      routineId: args.routineId,
      name: args.name,
      userId: args.userId,
      day: args.day,
      restDay: args.restDay
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
      .query("workoutsWeekRoutine")
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("desc")
      .collect();
  },
});

export const deleteDayRoutine = mutation({
  args: { id: v.id('workoutsWeekRoutine') },
  async handler(ctx, args) {
    const user = await getUserId(ctx);
    if (!user) {
      console.warn("No User found");
      return;
    }

    const dayRoutine = await ctx.db.get(args.id);

    if (!dayRoutine) {
      console.warn("can't find user, does not exist");
      return "User routine not found";
    } else {
      await ctx.db.delete(dayRoutine._id);
      return "User routine deleted";

    }
  },
});

export const updateDayRoutine = mutation({
  args: {
    routineId: v.string(),
    name: v.string(),
    restDay: v.optional(v.boolean()),
    userId: v.string(),
    day: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getUserId(ctx);
    if (!user) {
      console.warn("No User found");
    }

    const currentDayRoutine = await getSingleDayRoutine(ctx, args.routineId);

    if (!currentDayRoutine || args.routineId === undefined) {
      throw new Error(`No routine found with that id. Id: ${args.routineId}`);
    }

    console.log(await ctx.db.get(currentDayRoutine._id));
    await ctx.db.patch(currentDayRoutine._id, args);
  }

})

