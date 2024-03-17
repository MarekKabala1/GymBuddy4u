'use client';
import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

import { Workout, WorkoutRoutine } from '@/app/types/types';

import { useToast } from '@/app/hooks/toast';
import { ScaleLoader } from 'react-spinners';

import AddWorkoutForm from '@/app/components/AddWorkoutForm';
import { BackArrowIcon, PlusIcon } from '@/app/assets/svgIcons';
import { useRouter } from 'next/navigation';

export default function WeekRoutine(): React.ReactElement {
	const [loading, setLoading] = useState(true);
	const [weekRoutine, setWeekRoutine] = useState<WorkoutRoutine[]>([]);

	const { showErrorToast, showSuccessToast } = useToast();
	const router = useRouter();
	const dialog = useRef<HTMLDialogElement>(null);

	// const getWeekRoutine = useQuery(api.workoutsWeekRoutine?.getAllWeekRoutines);
	// const createWeekRoutine = useMutation(
	// 	api.workoutsWeekRoutine.addDayForWeekRoutine
	// );
	const handleFormSubmit = async (data: Workout) => {
		// try {
		// 	setLoading(true);
		// 	await createWeekRoutine(data as Workout);
		// 	setLoading(false);
		// 	console.log(data);
		// 	showSuccessToast('Workout Routine created successfully');
		// } catch (error) {
		// 	console.error('Error submitting form:', error);
		// 	showErrorToast('Failed to create workout Routine');
		// }
	};

	// useEffect(() => {
	// 	setLoading(true);
	// 	if (
	// 		getWeekRoutine === undefined ||
	// 		getWeekRoutine === null ||
	// 		getWeekRoutine.length === 0
	// 	) {
	// 		setLoading(false);
	// 		return;
	// 	}
	// 	if (getWeekRoutine) {
	// 		setWeekRoutine(getWeekRoutine);
	// 		setLoading(false);
	// 	}
	// }, [getWeekRoutine]);

	// if (loading) {
	// 	return (
	// 		<div className='flex justify-center items-center h-screen'>
	// 			<ScaleLoader color='#36D7B7' />
	// 		</div>
	// 	);
	// }

	return (
		<article className='flex flex-col  w-full p-4 gap-4  overflow-auto'>
			<button className='flex gap-1 items-center' onClick={router.back}>
				<BackArrowIcon className='w-5 h-5 inline-block' />
				<p className='text-xs'>Go Back</p>
			</button>
			<div className='flex flex-col items-center w-full  gap-4  overflow-auto'>
				<button
					className='btn-dark'
					type='button'
					onClick={() => dialog.current?.showModal()}>
					<PlusIcon className='w-5 h-5 inline-block mr-1' />
					Add Workout
				</button>
				<dialog ref={dialog}>
					<AddWorkoutForm
						onSubmit={handleFormSubmit}
						onCloseDialog={() => dialog.current?.close()}
					/>
				</dialog>
			</div>
		</article>
	);
}
