
import { ActionCtx, MutationCtx, QueryCtx } from "./_generated/server";
export const getUserId = async (ctx: QueryCtx | MutationCtx | ActionCtx) => {
  console.log(ctx.auth.getUserIdentity())
  return (await ctx.auth.getUserIdentity())?.subject;
};