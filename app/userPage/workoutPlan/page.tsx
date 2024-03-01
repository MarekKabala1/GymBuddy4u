'use client';
import WorkoutForm from '@/app/components/AddWorkoutForm';
import WorkoutRutineForm from '@/app/components/WorkoutRutineForm';
import { useToast } from '@/app/hooks/toast';
import { Workout, WorkoutRutine } from '@/app/types/types';
import { api } from '@/convex/_generated/api';
import { useQuery, useMutation } from 'convex/react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ScaleLoader } from 'react-spinners';

export default function Workoutt(): React.ReactElement {
	const [loading, setLoading] = useState(true);
	const [weekRutine, setWeekRutine] = useState<WorkoutRutine[]>([]);

	const dialog = useRef<HTMLDialogElement>(null);

	const { showErrorToast, showSuccessToast } = useToast();

	const getWeekRutine = useQuery(api.workouts?.getAllWeekRutines);
	const createWeekRutine = useMutation(api.workouts.addWeekRutine);
	// const handleSubmit = async (data: Workout) => {
	// 	console.log(data);
	// };
	const handleFormSubmit = async (data: WorkoutRutine) => {
		try {
			setLoading(true);
			await createWeekRutine(data as WorkoutRutine);
			dialog.current?.close();
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
			<h2>Workout Page</h2>
			<ul className='flex  gap-8'>
				<button
					className='btn-underline'
					type='button'
					onClick={() => dialog.current?.showModal()}>
					My Workouts Rutine
				</button>
				<li className='btn-underline'>Finde Workout</li>
			</ul>
			{/* <WorkoutForm onSubmit={handleSubmit} /> */}
			<dialog ref={dialog}>
				<WorkoutRutineForm onSubmit={handleFormSubmit} />
				<button onClick={() => dialog.current?.close()} className='btn-danger'>
					Close
				</button>
			</dialog>
		</article>
	);
}
