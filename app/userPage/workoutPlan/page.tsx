import UserWorkout from '@/components/UserWorkout';
import { api } from '@/convex/_generated/api';
import { preloadQuery } from 'convex/nextjs';

export default async function Workout() {
	if (!api.workouts || !api.workouts?.getAllWeekRoutines) {
		console.error('API method is undefined');
		return;
	}

	const getWorkoutRoutine = await preloadQuery(api.workouts?.getAllWeekRoutines, {});
	return (
		<article className='flex flex-col items-center w-full h-full p-4 gap-4'>
			<UserWorkout getWorkoutRoutine={getWorkoutRoutine} />
		</article>
	);
}
