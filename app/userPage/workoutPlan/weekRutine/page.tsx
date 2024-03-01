'use client';
import { useEffect, useState } from 'react';

import WorkoutRutineForm from '@/app/components/WorkoutRutineForm';

import { WorkoutRutine } from '@/app/types/types';

import { useToast } from '@/app/hooks/toast';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { ScaleLoader } from 'react-spinners';
import Link from 'next/link';

export default function WeekRutine(): React.ReactElement {
	const [loading, setLoading] = useState(true);
	const [weekRutine, setWeekRutine] = useState<WorkoutRutine[]>([]);

	const { showErrorToast, showSuccessToast } = useToast();

	const getWeekRutine = useQuery(api.workouts?.getAllWeekRutines);
	const createWeekRutine = useMutation(api.workouts.addWeekRutine);
	const handleFormSubmit = async (data: WorkoutRutine) => {
		try {
			setLoading(true);
			await createWeekRutine(data as WorkoutRutine);
			setLoading(false);
			console.log(data);
			showSuccessToast('Workout rutine created successfully');
		} catch (error) {
			console.error('Error submitting form:', error);
			showErrorToast('Failed to create workout rutine');
		}
	};

	useEffect(() => {
		setLoading(true);
		if (
			getWeekRutine === undefined ||
			getWeekRutine === null ||
			getWeekRutine.length === 0
		) {
			setLoading(false);
			return;
		}
		if (getWeekRutine) {
			setWeekRutine(getWeekRutine);
			setLoading(false);
		}
	}, [getWeekRutine]);

	if (loading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<ScaleLoader color='#36D7B7' />
			</div>
		);
	}

	return (
		<article className='flex flex-col items-center w-full p-4 gap-4  overflow-auto'>
			<WorkoutRutineForm onSubmit={handleFormSubmit} />
			{weekRutine && weekRutine.length > 0 && (
				<ul className='flex flex-col gap-4'>
					{weekRutine.map((weekRutine) => (
						<li key={weekRutine._id}>
							<Link href={'#'}>
								{weekRutine.name ? weekRutine.name : weekRutine.day}
							</Link>
						</li>
					))}
				</ul>
			)}
		</article>
	);
}
