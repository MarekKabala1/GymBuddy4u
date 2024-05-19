import { preloadQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';

import UserWorkout from './UserWorkout';

export default async function Workout() {
	if (!api.workouts || !api.workouts?.getAllWeekRoutines) {
		console.error('API method is undefined');
		return;
	}

	const getWorkoutRoutine = await preloadQuery(api.workouts?.getAllWeekRoutines, {});
	return (
		<article className='flex flex-col items-center w-full p-4 gap-4 overflow-auto h-screen'>
			<UserWorkout getWorkoutRoutine={getWorkoutRoutine} />
		</article>
	);
}
