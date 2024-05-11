'use client';
import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { Preloaded, useMutation, usePreloadedQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

import AddWorkoutForm from './AddWorkoutForm';
import SortableWorkout from './SortableWorkout';

import { useSession } from '@clerk/nextjs';

import { ScaleLoader } from 'react-spinners';

import { useToast } from '@/app/hooks/useToast';
import useLoading from '@/app/hooks/useLoading';
import { Workout } from '@/app/types/types';

import { BackArrowIcon, PlusIcon } from '@/app/assets/svgIcons';
import { Id } from '@/convex/_generated/dataModel';
import { DndContext, KeyboardSensor, MouseSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';

import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

export default function AddUserWorkout(props: { getUserWorkoutForTheDay: Preloaded<typeof api.workouts.getWorkoutsForTheDay> }) {
	const [loading, setLoading] = useLoading();
	const [dayWorkout, setDayWorkout] = useState<Workout[]>([]);

	const { showErrorToast, showSuccessToast } = useToast();
	const session = useSession();
	const router = useRouter();
	const params = useParams();
	const searchParams = useSearchParams();
	const routineName = searchParams.get('name');

	const routineId = params.addWorkout[1] as string;

	const userId = session.session?.user?.id as string;

	const sensors = useSensors(useSensor(TouchSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }), useSensor(MouseSensor));

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

	const handleWorkoutDelete = async (_id: Id<'workouts'>) => {
		try {
			await deleteWorkout({
				workoutId: _id as Id<'workouts'>,
			});
			showSuccessToast('Workout Routine deleted successfully');
		} catch (error) {
			showErrorToast('Failed to delete workout Routine');
		}
	};

	if (loading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<ScaleLoader color='#36D7B7' />
			</div>
		);
	}

	const onDragEnd = (event: any) => {
		const { active, over } = event;
		if (active.id === over?.id) {
			return;
		}
		//update creation time of workout to swap them in db for fetching in sorted order

		const dayWorkoutWitIndex = (prev: Workout[]) => {
			const activeIndex = prev.findIndex((item) => item._id === active.id);
			const overIndex = prev.findIndex((item) => item._id === over?.id);
			const newItems = arrayMove(prev, activeIndex, overIndex);
			const updatedWorkout = newItems.map((item, index) => {
				console.log('first', { ...item, index: index + 1 });
				return { ...item, index: index + 1 };
			});
			setDayWorkout(updatedWorkout);

			return updatedWorkout;
		};
		console.log(dayWorkout);
		dayWorkoutWitIndex(dayWorkout);
	};

	return (
		<>
			<button className='flex gap-1 items-center' onClick={router.back}>
				<BackArrowIcon className='w-5 h-5 inline-block' />
				<p className='text-xs'>Go Back</p>
			</button>

			<div className='flex flex-1 flex-col items-center w-full h-full gap-8  overflow-auto'>
				<button className='btn-dark' type='button' onClick={() => dialog.current?.showModal()}>
					<PlusIcon className='w-5 h-5 inline-block mr-1' />
					Add Workout
				</button>
				<dialog ref={dialog}>
					<AddWorkoutForm onSubmit={handleFormSubmit} onCloseDialog={() => dialog.current?.close()} routineName={routineName as string} />
				</dialog>

				<h3 className='text-lg font-bold'>{routineName}</h3>
				<div className='flex flex-col items-center w-full h-full overflow-auto gap-2 '>
					<div className={dayWorkout?.length === 0 ? 'hidden' : 'flex items-start w-full px-4 justify-between text-xs'}>
						{/* //ToDo:Change the styling to remove two empty p tags */}
						<p className='w-5 h-5'></p>
						<p className=' w-1/3'>Name</p>
						<p className='w-1/6'>Group</p>
						<p className='w-1/6 max-w-[45.5px]'>Sets</p>
						<p className='w-1/7 min-w-[55px]'>Reps</p>
						<p className='w-5 h-5'></p>
					</div>
					<DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd} sensors={sensors}>
						<SortableContext items={dayWorkout.map((workout) => workout._id as string)} strategy={verticalListSortingStrategy}>
							{dayWorkout.length === 0 ? (
								<div className=' h-screen'>
									<p className='text-primary-light'>No Workouts Added</p>
								</div>
							) : (
								dayWorkout?.map(({ routineId, userId, _id, ...workout }) => {
									if (_id === undefined) {
										console.warn('id is undefined');
										return null;
									}

									return (
										<SortableWorkout
											key={_id}
											_id={_id}
											workout={{
												_creationTime: workout._creationTime,
												muscleGroup: workout.muscleGroup,
												name: workout.name,
												repsValue: workout.repsValue,
												sets: workout.sets,
												routineId: routineId,
												userId: userId,
											}}
											handleWorkoutDelete={handleWorkoutDelete}
											loading={loading}
											routineId={''}
											userId={''}
										/>
									);
								})
							)}
						</SortableContext>
					</DndContext>
				</div>
			</div>
		</>
	);
}
