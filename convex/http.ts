import { httpRouter } from "convex/server";
import { api, internal } from "./_generated/api";
import { httpAction } from "./_generated/server"
import { UserMeasurements } from "../app/types/types";
// import { submitFormMeasurementAction } from "../app/userPage/measurements/action";


const http = httpRouter()

http.route({
  path: '/clerk',
  method: 'POST',
  handler: httpAction(async (ctx, request) => {
    const payloadString = await request.text();
    const headerPayload = request.headers;

    try {
      const result = await ctx.runAction(internal.clerk.fulfill, {
        payload: payloadString,
        headers: {
          "svix-id": headerPayload.get("svix-id")!,
          "svix-timestamp": headerPayload.get("svix-timestamp")!,
          "svix-signature": headerPayload.get("svix-signature")!,
        }
      })

      switch (result.type) {
        case 'user.created': {
          await ctx.runMutation(internal.users?.createUser, {
            email: result.data.email_addresses[0]?.email_address,
            userId: result.data.id,
            name: result.data.username as string,
            timeStamp: result.data.created_at
          })
          break;
        }
        case 'user.deleted': {
          await ctx.runMutation(internal.users?.deleteUser, { userId: result.data.id as string })
        }
      }
      return new Response(null, {
        status: 200,
      });
    } catch (err) {
      return new Response('Webhook Error', {
        status: 400,
      });
    }
  })
})
http.route({
  path: "/userPage/measurements",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const data = await request.json() as UserMeasurements
    try {


      const result = await ctx.runMutation(api.measurements.createUserMeasurement, {
        age: data.age,
        biceps: data.biceps,
        chest: data.chest,
        calves: data.calves,
        belly: data.belly,
        hips: data.hips,
        thigh: data.thigh,
        userId: data.userId,
        weight: data.weight,
        height: data.height,
        unit: data.unit,
      })
      console.log('All done')
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (err) {

      console.error(err)
      return new Response(null, {
        status: 400,
      })
    }
  }),
});
// http.route({
//   path: "/userPage/measurements",
//   method: "GET",
//   handler: submitFormMeasurementAction
// })




export default http
