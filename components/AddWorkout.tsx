'use client';
import { useEffect, useRef, useState } from 'react';

import { Preloaded, useMutation, usePreloadedQuery, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

import { Workout } from '@/app/types/types';

import { useToast } from '@/app/hooks/useToast';
import { ScaleLoader } from 'react-spinners';

import AddWorkoutForm from '@/components/AddWorkoutForm';
import { BackArrowIcon, PlusIcon } from '@/app/assets/svgIcons';
import { useParams, useRouter } from 'next/navigation';
import useLoading from '@/app/hooks/useLoading';
import { useSession } from '@clerk/nextjs';

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
								<p>Sets:&nbsp;{workout.sets}</p>
								<p>
									{workout.repsValue.map((reps, index) => (
										<div className='flex gap-2' key={index}>
											<p>Rep&nbsp;{index + 1}:</p>
											<p>{reps}</p>
										</div>
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
