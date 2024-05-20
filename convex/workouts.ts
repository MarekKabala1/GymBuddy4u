import { v } from "convex/values";
import { QueryCtx, mutation, query } from "./_generated/server";
import { getUserId } from "./utils"



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

export const createWorkoutForRoutine = mutation({
  args: {
    name: v.string(),
    userId: v.string(),
    routineId: v.string(),
    muscleGroup: v.string(),
    sets: v.number(),
    repsValue: v.array(v.number()),
    index: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    if (!userId) {
      throw new Error("no user with that id found");
    }
    await ctx.db.insert('workouts', {
      name: args.name,
      userId: args.userId,
      routineId: args.routineId,
      muscleGroup: args.muscleGroup,
      sets: args.sets,
      repsValue: args.repsValue,
      index: args.index
    })
  }
})

export const getWorkoutsForTheDay = query({
  args: {
    routineId: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    if (!userId) {
      return [];
    }
    return await ctx.db
      .query("workouts")
      .filter((q) => q.eq(q.field("routineId"), args.routineId))
      .collect();
  },
})
export const updateWorkoutIndex = mutation({
  args: {
    _id: v.id('workouts'),
    index: v.number(),
    userId: v.string()
  },
  async handler(ctx, args) {
    const user = await getUserId(ctx);
    if (!user) {
      console.warn("No User found");
      return;
    }
    const currentWorkout = await getWorkoutsForTheDay(ctx, {
      routineId: args._id,
      userId: args.userId
    });

    const getCurrentWorkout = await ctx.db.get(args._id);
    if (!args._id || !getCurrentWorkout) {
      console.warn("No Routine found");
      return;
    }
    await ctx.db.patch(getCurrentWorkout._id, {
      index: args.index
    });
    return currentWorkout

  }
})


export const createDayForWeekRoutine = mutation({
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

export const deleteWorkout = mutation({
  args: { workoutId: v.id('workouts') },
  async handler(ctx, args) {
    const user = await getUserId(ctx);
    if (!user) {
      console.warn("No User found");
      return;
    }
    const workout = await ctx.db.get(args.workoutId);
    if (!workout) {
      console.warn("can't find user, does not exist");
      return "User workout not found";
    } else {
      await ctx.db.delete(workout._id);
      return "User workout deleted";
    }
  },
});

export const deleteDayRoutine = mutation({
  args: {
    id: v.id('workoutsWeekRoutine'),

  },
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
    await ctx.db.get(currentDayRoutine._id);
    await ctx.db.patch(currentDayRoutine._id, args);
  }

})

