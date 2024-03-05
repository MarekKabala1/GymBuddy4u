'use client';
import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

import WorkoutRoutineForm from '@/app/components/WorkoutRoutineForm';

import { WorkoutRoutine } from '@/app/types/types';

import { useToast } from '@/app/hooks/toast';
import { ScaleLoader } from 'react-spinners';

export default function WeekRoutine(): React.ReactElement {
	const [loading, setLoading] = useState(true);
	const [weekRoutine, setWeekRoutine] = useState<WorkoutRoutine[]>([]);

	const { showErrorToast, showSuccessToast } = useToast();

	const getWeekRoutine = useQuery(api.workouts?.getAllWeekRoutines);
	const createWeekRoutine = useMutation(api.workouts.addWeekRoutine);
	const handleFormSubmit = async (data: WorkoutRoutine) => {
		try {
			setLoading(true);
			await createWeekRoutine(data as WorkoutRoutine);
			setLoading(false);
			console.log(data);
			showSuccessToast('Workout Routine created successfully');
		} catch (error) {
			console.error('Error submitting form:', error);
			showErrorToast('Failed to create workout Routine');
		}
	};

	useEffect(() => {
		setLoading(true);
		if (
			getWeekRoutine === undefined ||
			getWeekRoutine === null ||
			getWeekRoutine.length === 0
		) {
			setLoading(false);
			return;
		}
		if (getWeekRoutine) {
			setWeekRoutine(getWeekRoutine);
			setLoading(false);
		}
	}, [getWeekRoutine]);

	if (loading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<ScaleLoader color='#36D7B7' />
			</div>
		);
	}

	return (
		<article className='flex flex-col items-center w-full p-4 gap-4  overflow-auto'>
			<WorkoutRoutineForm onSubmit={handleFormSubmit} />
			{weekRoutine && weekRoutine.length > 0 && (
				<ul className='flex flex-col gap-4'>
					{weekRoutine.map((weekRoutine) => (
						<li key={weekRoutine._id}>
							<Link href={'#'}>
								{weekRoutine.name ? weekRoutine.name : weekRoutine.day}
							</Link>
						</li>
					))}
				</ul>
			)}
		</article>
	);
}
