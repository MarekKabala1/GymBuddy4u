'use client';
import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { Preloaded, useMutation, usePreloadedQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

import AddWorkoutForm from '@/components/AddWorkoutForm';

import { useSession } from '@clerk/nextjs';

import { ScaleLoader } from 'react-spinners';

import { useToast } from '@/app/hooks/useToast';
import useLoading from '@/app/hooks/useLoading';
import { Workout } from '@/app/types/types';

import { BackArrowIcon, PlusIcon, TrashIcon } from '@/app/assets/svgIcons';
import { Id } from '@/convex/_generated/dataModel';

export default function AddUserWorkout(props: { getUserWorkoutForTheDay: Preloaded<typeof api.workouts.getWorkoutsForTheDay> }) {
	const [loading, setLoading] = useLoading();
	const [dayWorkout, setDayWorkout] = useState<Workout[]>([]);

	const { showErrorToast, showSuccessToast } = useToast();
	const session = useSession();
	const router = useRouter();
	const params = useParams();
	const routineId = params.addWorkout[0] as string;

	const userId = session.session?.user?.id as string;

	const dialog = useRef<HTMLDialogElement>(null);
	const fetchWorkout = usePreloadedQuery(props.getUserWorkoutForTheDay);
	const createWorkout = useMutation(api.workouts?.addWorkoutForDayRoutine);
	const deleteWorkout = useMutation(api.workouts.deleteWorkout);

	useEffect(() => {
		if (fetchWorkout && fetchWorkout.length > 0) {
			setDayWorkout(fetchWorkout);
			setLoading({ type: 'SET_LOADING', payload: false });
		} else {
			setLoading({ type: 'SET_LOADING', payload: false });
			return;
		}
	}, [fetchWorkout, setLoading]);

	const handleFormSubmit = async (data: Workout) => {
		try {
			setLoading({ type: 'SET_LOADING', payload: true });
			//TOdO: Check in the form why sets are a string
			const dataWithIds = { ...data, userId: userId, routineId: routineId, sets: Number(data.sets) };
			console.log(dataWithIds);
			await createWorkout(dataWithIds);

			dialog.current?.close();
			setLoading({ type: 'SET_LOADING', payload: false });
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
		<>
			<button className='flex gap-1 items-center' onClick={router.back}>
				<BackArrowIcon className='w-5 h-5 inline-block' />
				<p className='text-xs'>Go Back</p>
			</button>
			<div className='flex flex-col items-center w-full  gap-8  overflow-auto'>
				<button className='btn-dark' type='button' onClick={() => dialog.current?.showModal()}>
					<PlusIcon className='w-5 h-5 inline-block mr-1' />
					Add Workout
				</button>
				<dialog ref={dialog}>
					<AddWorkoutForm onSubmit={handleFormSubmit} onCloseDialog={() => dialog.current?.close()} />
				</dialog>

				<div className='flex flex-col items-center w-full overflow-auto gap-1 '>
					<div className='flex items-start flex-1 w-full px-4 justify-between text-xs'>
						<p className='w-1/3'>Name</p>
						<p className='w-1/6'>Group</p>
						<p className='w-1/6 max-w-[45.5px]'>Sets</p>
						<p className='w-1/7 min-w-[55px]'>Reps</p>
						<p className='w-5 h-5'></p>
					</div>
					{dayWorkout?.map(({ routineId, userId, _id, ...workout }) => {
						return (
							<div className='flex items-center flex-1 w-full px-4 justify-between  border border-primary-dark rounded-[5px] bg-primary-dark' key={_id}>
								<p className='w-1/3'>{workout.name}</p>
								<h3 className='w-1/6'>{workout.muscleGroup}</h3>
								<p className='w-1/7'>Sets:&nbsp;{workout.sets}</p>
								<p>
									{workout.repsValue.map((reps, index) => (
										<div className='flex gap-2 w-1/4' key={index}>
											<p>Rep&nbsp;{index + 1}:</p>
											<p>{reps}</p>
										</div>
									))}
								</p>
								<button onClick={() => deleteWorkout({ workoutId: _id as Id<'workouts'> })} disabled={loading}>
									<TrashIcon className='w-5 h-5 inline-block' />
								</button>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
