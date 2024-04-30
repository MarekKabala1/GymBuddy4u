'use client';
import { useEffect, useRef, useState } from 'react';

import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

import { Workout } from '@/app/types/types';

import { useToast } from '@/app/hooks/toast';
import { ScaleLoader } from 'react-spinners';

import AddWorkoutForm from '@/app/components/AddWorkoutForm';
import { BackArrowIcon, PlusIcon } from '@/app/assets/svgIcons';
import { useParams, useRouter } from 'next/navigation';

export default function WeekRoutine(): React.ReactElement<Workout> {
	const [loading, setLoading] = useState(true);
	const [dayWorkout, setDayWorkout] = useState<Workout[]>([]);

	const { showErrorToast, showSuccessToast } = useToast();
	const router = useRouter();
	const params = useParams();
	const routineId = params.addWorkout[1] as string;
	const userId = params.addWorkout[0] as string;

	const dialog = useRef<HTMLDialogElement>(null);
	//ToDo:Check why userId is undefined when i try to fetch userId from Clerk Sesion
	const fetchWorkout = useQuery(api.workouts?.getWorkoutsForTheDay, { routineId: routineId, userId: userId });
	const createWorkout = useMutation(api.workouts?.addWorkoutForDayRoutine);

	useEffect(() => {
		if (fetchWorkout && fetchWorkout.length > 0 && userId) {
			setDayWorkout(fetchWorkout);
			setLoading(false);
		} else {
			setLoading(false);
			return;
		}
	}, [fetchWorkout, userId]);

	const handleFormSubmit = async (data: Workout) => {
		try {
			setLoading(true);
			//TOdO: Check in the form why sets are a string
			const dataWithIds = { ...data, userId: userId, routineId: routineId, sets: Number(data.sets) };
			console.log(dataWithIds);
			await createWorkout(dataWithIds);

			dialog.current?.close();
			setLoading(false);
			showSuccessToast('Workout Routine created successfully');
		} catch (error) {
			console.error('Error submitting form:', error);
			showErrorToast('Failed to create workout Routine');
		}
	};

	if (loading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<ScaleLoader color='#36D7B7' />
			</div>
		);
	}

	return (
		<article className='flex flex-col  w-full p-4 gap-4  overflow-auto'>
			<button className='flex gap-1 items-center' onClick={router.back}>
				<BackArrowIcon className='w-5 h-5 inline-block' />
				<p className='text-xs'>Go Back</p>
			</button>
			<div className='flex flex-col items-center w-full  gap-4  overflow-auto'>
				<button className='btn-dark' type='button' onClick={() => dialog.current?.showModal()}>
					<PlusIcon className='w-5 h-5 inline-block mr-1' />
					Add Workout
				</button>
				<dialog ref={dialog}>
					<AddWorkoutForm onSubmit={handleFormSubmit} onCloseDialog={() => dialog.current?.close()} />
				</dialog>

				<div className='flex flex-col items-center w-full gap-4  overflow-auto'>
					{dayWorkout?.map(({ routineId, userId, _id, ...workout }) => {
						return (
							<div key={_id} {...workout}>
								<h1>{workout.muscleGroup}</h1>
								<p>{workout.name}</p>
								<p>{workout.sets}</p>
								<p>
									{workout.repsValue.map((reps) => (
										<span key={_id}>{reps}</span>
									))}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</article>
	);
}
