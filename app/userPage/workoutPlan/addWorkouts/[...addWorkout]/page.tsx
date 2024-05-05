import AddUserWorkout from '@/components/AddWorkout';
import { api } from '@/convex/_generated/api';
import { auth } from '@clerk/nextjs/server';
import { preloadQuery } from 'convex/nextjs';
import { headers } from 'next/headers';

export default async function AddWorkout() {
	const headerList = headers();
	const pathname = headerList.get('x-current-path');
	const routineId = pathname?.split('/')[4] as string;
	const { userId }: { userId: string | null } = auth();

	const getUserWorkoutForTheDay = await preloadQuery(api.workouts.getWorkoutsForTheDay, {
		routineId: routineId || '',
		userId: userId || '',
	});

	return <AddUserWorkout getUserWorkoutForTheDay={getUserWorkoutForTheDay} />;
}
