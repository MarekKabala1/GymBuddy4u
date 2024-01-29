import { v } from "convex/values";
import { internalMutation, QueryCtx } from "./_generated/server";

import { Id } from "./_generated/dataModel";




export const createUser = internalMutation({
  args: { email: v.string(), userId: v.string(), name: v.optional(v.string()), timeStamp: v.number() },
  handler: async (ctx, args) => {
    await ctx.db.insert('users', {
      userId: args.userId,
      name: args.name,
      email: args.email,
      timeStamp: args.timeStamp
    })
  }
})


export const deleteUser = internalMutation({
  args: { userId: v.string() },
  async handler(ctx, { userId }) {
    const userRecord = await userQuery(ctx, userId);

    if (userRecord === null) {
      console.warn("can't delete user, does not exist", userId);
    } else {
      await ctx.db.delete(userRecord._id);
    }
  },
});
export async function userQuery(
  ctx: QueryCtx,
  userId: string
) {
  return await ctx.db
    .query("users")
    .withIndex("by_userId", (q) => q.eq("userId", userId))
    .unique();
}




