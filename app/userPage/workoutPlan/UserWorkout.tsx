'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

import { useMutation, Preloaded, usePreloadedQuery } from 'convex/react';
import { Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';

import WorkoutRoutineForm from './WorkoutRoutineForm';

import { WorkoutRoutine } from '@/app/types/types';
import { EditIcon, PlusIcon, SubMenuIcon, TrashIcon } from '@/app/assets/svgIcons';

import { useToast } from '@/app/hooks/useToast';
import useLoading from '@/app/hooks/useLoading';

import { Toaster } from 'react-hot-toast';
import { ScaleLoader } from 'react-spinners';
import DeleteConfirm from '../../../components/DeleteConfirm';

export default function UserWorkout(props: { getWorkoutRoutine: Preloaded<typeof api.workouts.getAllWeekRoutines> }) {
	const [loading, setLoading] = useLoading();
	const [showModal, setShowModal] = useState(false);
	const [openMenuId, setOpenMenuId] = useState<Id<'workoutsWeekRoutine'> | undefined | null>(null);
	const [activeIndex, setActiveIndex] = useState<number | null>(0);
	const [weekDays, setWeekDays] = useState<string[]>([]);
	const [id, setId] = useState<Id<'workoutsWeekRoutine'> | null>(null);
	const [weekRoutine, setWeekRoutine] = useState<WorkoutRoutine[]>([]);
	const [editedRoutine, setEditedRoutine] = useState<WorkoutRoutine | null>(null);

	const dialog = useRef<HTMLDialogElement>(null);

	const { showErrorToast, showSuccessToast } = useToast();

	const WeekRoutine = usePreloadedQuery(props.getWorkoutRoutine);

	const createWeekRoutine = useMutation(api.workouts?.addDayForWeekRoutine);

	const deleteRoutine = useMutation(api.workouts?.deleteDayRoutine);

	const editRoutine = useMutation(api.workouts?.updateDayRoutine);

	const handleFormSubmit = async (data: WorkoutRoutine) => {
		try {
			showSuccessToast('Workout Routine created successfully');
			setLoading({ type: 'SET_LOADING', payload: true });
			await createWeekRoutine(data as WorkoutRoutine);
			dialog.current?.close();
			setLoading({ type: 'SET_LOADING', payload: false });
		} catch (error) {
			showErrorToast('Failed to create workout Routine');
		}
	};

	// Open and close menu
	const handleClick = useCallback((id: Id<'workoutsWeekRoutine'>) => {
		if (id === undefined) {
			return;
		}
		setOpenMenuId((prev) => (prev === id ? null : id));
	}, []);

	const handleClickOutsideToClosePopUp = useCallback(
		(event: MouseEvent) => {
			const target = event.target as HTMLElement;

			if (openMenuId && !target.closest(`[data-menu-id="${openMenuId}"]`)) {
				setOpenMenuId(null);
			}
		},
		[openMenuId]
	);

	useEffect(() => {
		document.body.addEventListener('click', handleClickOutsideToClosePopUp);

		return () => {
			document.body.removeEventListener('click', handleClickOutsideToClosePopUp);
		};
	}, [handleClickOutsideToClosePopUp, openMenuId]);

	// Sort Routine by day
	const sortedWeekRoutine = useMemo(() => {
		const daysOfWeekOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

		const sortedData = [...WeekRoutine].sort((a, b) => {
			const dayA = daysOfWeekOrder.indexOf(a.day);
			const dayB = daysOfWeekOrder.indexOf(b.day);
			return dayA - dayB;
		});

		setWeekRoutine(sortedData);
		setWeekDays(sortedData.map((item) => item.day));

		return sortedData;
	}, [WeekRoutine]);

	useEffect(() => {
		setLoading({ type: 'SET_LOADING', payload: true });
		if (WeekRoutine === undefined || WeekRoutine === null || WeekRoutine.length === 0) {
			setLoading({ type: 'SET_LOADING', payload: false });
			return;
		}
		setLoading({ type: 'SET_LOADING', payload: false });
	}, [editedRoutine, WeekRoutine, setLoading]);

	// Edit Routine
	const handleEdit = useCallback(
		(id: Id<'workoutsWeekRoutine'>) => {
			const routineToEdit = WeekRoutine?.find((item) => item._id === id);

			if (routineToEdit) {
				setEditedRoutine(routineToEdit);
				dialog.current?.showModal();
			} else {
				setEditedRoutine(null);
				showErrorToast('Failed to edit workout Routine');
			}
		},
		[WeekRoutine, showErrorToast]
	);

	const handleEditFormSubmit = async (data: WorkoutRoutine) => {
		try {
			const editedData = {
				...data,
				_id: id as Id<'workoutsWeekRoutine'>,
			};
			await editRoutine(data as WorkoutRoutine);
			dialog.current?.close();
			setEditedRoutine(null);

			showSuccessToast('Workout Routine updated successfully');
		} catch (error) {
			dialog.current?.close();
			showErrorToast('Failed to update workout Routine');
		}
	};

	// Delete Routine
	const handleRoutineDelete = async () => {
		try {
			await deleteRoutine({
				id: id as Id<'workoutsWeekRoutine'>,
			});
			setShowModal(false);
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

	return (
		<>
			<ul className='flex gap-8'>
				<button
					role='button'
					onClick={() => setActiveIndex(0)}
					className={`${activeIndex === 0 ? 'btn-underline border-primary-blue text-primary-blue' : 'btn-underline'} `}>
					My Workout Routine
				</button>
				<button
					role='button'
					onClick={() => setActiveIndex(1)}
					className={`${activeIndex === 1 ? 'btn-underline text-primary-blue border-primary-blue ' : 'btn-underline'} `}>
					Find Workout
				</button>
			</ul>
			<button className='btn-dark' type='button' onClick={() => dialog.current?.showModal()}>
				<PlusIcon className='w-5 h-5 inline-block mr-1' />
				Add Days to this Routine
			</button>
			<dialog ref={dialog}>
				{editedRoutine ? (
					<WorkoutRoutineForm
						onSubmit={handleEditFormSubmit}
						onCloseDialog={() => {
							dialog.current?.close();
							setEditedRoutine(null);
						}}
						weekRoutineDays={weekDays}
						dataToEdit={editedRoutine}
						isEditing={true}
					/>
				) : (
					<WorkoutRoutineForm
						onSubmit={handleFormSubmit}
						onCloseDialog={() => {
							dialog.current?.close();
							setEditedRoutine(null);
						}}
						weekRoutineDays={weekDays}
					/>
				)}
			</dialog>
			{weekRoutine && weekRoutine.length > 0 && activeIndex === 0 && (
				<div className='w-full'>
					<ul className='flex flex-col gap-4 w-full items-start justify-center'>
						{weekRoutine.map((weekRoutine) => (
							<li key={weekRoutine._id} className='flex justify-between items-center w-full'>
								<Link
									className='hover:text-primary-blue'
									href={{ pathname: `/userPage/workoutPlan/addWorkouts/${weekRoutine.routineId}`, query: { name: `${weekRoutine.name}` } }}
									key={weekRoutine._id}>
									<div className='flex gap-2 items-center h-full'>
										<span className='flex gap-1 items-center justify-center text-xs w-[35px] aspect-square border border-primary-light p-1 bg-primary-dark rounded-md'>
											{weekRoutine.day.slice(0, 3)}
										</span>
										{weekRoutine.name ? weekRoutine.name : weekRoutine.day}
									</div>
								</Link>
								<div className='flex flex-col gap-1 relative'>
									<button data-menu-id={weekRoutine._id} onClick={() => handleClick(weekRoutine._id as Id<'workoutsWeekRoutine'>)}>
										<SubMenuIcon className='w-5 h-5 inline-block cursor-pointer' />
									</button>
									<div
										className={`${
											openMenuId === weekRoutine._id ? 'border rounded-lg border-primary-blue p-2 flex flex-col gap-1 absolute -top-2 right-4' : 'hidden'
										}  `}>
										<button
											data-menu-id={weekRoutine._id}
											role='button'
											onClick={() => {
												setShowModal(true);
												setId(weekRoutine._id as Id<'workoutsWeekRoutine'>);
											}}
											className='flex gap-1 cursor-pointer hover:text-primary-blue'>
											<TrashIcon className='w-5 h-5 inline-block stroke-primary-danger ' />
											<p className='text-primary-danger text-sm'>Delete</p>
										</button>
										<button
											data-menu-id={weekRoutine._id}
											onClick={() => handleEdit(weekRoutine._id as Id<'workoutsWeekRoutine'>)}
											className='flex gap-1 cursor-pointer hover:text-primary-blue'>
											<EditIcon className='w-5 h-5  inline-block' />
											<p className='text-sm'>Edit</p>
										</button>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			)}
			{showModal && <DeleteConfirm handleDelete={handleRoutineDelete} setShowModal={setShowModal} id={id} />}
			<Toaster position='bottom-center' />
		</>
	);
}
