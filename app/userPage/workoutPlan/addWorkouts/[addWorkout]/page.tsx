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
import { useParams, useRouter } from 'next/navigation';
import { useSession } from '@clerk/nextjs';

export default function WeekRoutine(): React.ReactElement<Workout> {
	const [loading, setLoading] = useState(true);
	const [dayWorkout, setDayWorkout] = useState<Workout[]>([]);

	const { showErrorToast, showSuccessToast } = useToast();
	const router = useRouter();
	const params = useParams();
	const routineId = params.addWorkout as string;

	const session = useSession();
	const userId = session.session?.user?.id as string;
	const dialog = useRef<HTMLDialogElement>(null);

	const fetchWorkout = useQuery(api.workouts?.getWorkoutsForTheDay, { routineId: routineId, userId: userId });
	const createWorkout = useMutation(api.workouts?.addWorkoutForDayRoutine);

	useEffect(() => {
		if (fetchWorkout && fetchWorkout.length > 0 && userId) {
			setDayWorkout(fetchWorkout);
			setLoading(false);
			// console.log(dayWorkout);
		} else {
			setLoading(false);
			return;
		}
	}, [fetchWorkout, userId]);

	// useEffect(() => {
	// 	if (getRoutine) {
	// 		setWeekRoutine(getRoutine);
	// 		setLoading(false);
	// 		weekRoutine.map((rutine) => {
	// 			const routineId = rutine._id;
	// 			const userId = rutine.userId;
	// 			console.log(routineId, userId);
	// 		});
	// 	}
	// }, [getRoutine]);
	// const createWeekRoutine = useMutation(
	// 	api.workoutsWeekRoutine.addDayForWeekRoutine
	// );
	const handleFormSubmit = async (data: Workout) => {
		try {
			setLoading(true);
			const dataWithIds = { ...data, userId: userId, routineId: routineId };
			await createWorkout(dataWithIds);
			console.log(dataWithIds);
			dialog.current?.close();
			showSuccessToast('Workout Routine created successfully');
		} catch (err) {
			console.error(err);
		}
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
				<button className='btn-dark' type='button' onClick={() => dialog.current?.showModal()}>
					<PlusIcon className='w-5 h-5 inline-block mr-1' />
					Add Workout
				</button>
				<dialog ref={dialog}>
					<AddWorkoutForm onSubmit={handleFormSubmit} onCloseDialog={() => dialog.current?.close()} />
				</dialog>

				<div className='flex flex-col items-center w-full gap-4  overflow-auto'>
					{dayWorkout?.map((workout) => {
						return (
							<div key={workout._id} {...workout}>
								<h1>{workout.muscleGroup}</h1>
								<p>{workout.name}</p>
								<p>{workout.sets}</p>
								<p>{workout.repsValue.map((rep) => rep.reps)}</p>
							</div>
						);
					})}
				</div>
			</div>
		</article>
	);
}
