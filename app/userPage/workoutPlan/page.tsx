'use client';
import WorkoutForm from '@/app/components/WorkoutForm';
import { Workout } from '@/app/types/UserMeasurements';

export default function Workout() {
	const handleSubmit = async (data: Workout) => {
		console.log(data);
	};
	return (
		<article className='flex flex-col items-center w-full p-4 gap-8  overflow-auto'>
			<h1>Workout Page</h1>
			<WorkoutForm onSubmit={handleSubmit} />
		</article>
	);
}
