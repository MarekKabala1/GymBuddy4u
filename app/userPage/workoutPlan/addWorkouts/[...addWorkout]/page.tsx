import { headers } from 'next/headers';

import { api } from '@/convex/_generated/api';
import { auth } from '@clerk/nextjs/server';
import { preloadQuery } from 'convex/nextjs';

import AddUserWorkout from './AddUserWorkout';

export default async function AddWorkout() {
	const headerList = headers();
	const pathname = headerList.get('x-current-path');
	const routineId = pathname?.split('/')[4] as string;
	const { userId }: { userId: string | null } = auth();

	const getUserWorkoutForTheDay = await preloadQuery(api.workouts.getWorkoutsForTheDay, {
		routineId: routineId || '',
		userId: userId || '',
	});

	return (
		<article className='flex flex-col  w-full p-4 gap-4  overflow-auto'>
			<AddUserWorkout getUserWorkoutForTheDay={getUserWorkoutForTheDay} />
		</article>
	);
}
