'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { useQuery, useMutation } from 'convex/react';
import { Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';

import { WorkoutRoutine } from '@/app/types/types';

import WorkoutRoutineForm from '@/components/AddWorkoutRoutineForm';

import { EditIcon, PlusIcon, SubMenuIcon, TrashIcon } from '@/app/assets/svgIcons';

import { Toaster } from 'react-hot-toast';
import { useToast } from '@/app/hooks/useToast';

import { ScaleLoader } from 'react-spinners';
import useLoading from '@/app/hooks/useLoading';

export default function Workoutt(): React.ReactElement {
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

	const getWeekRoutine = useQuery(api.workouts?.getAllWeekRoutines);

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

	const handleClick = (id: Id<'workoutsWeekRoutine'>) => {
		if (id === undefined) {
			return;
		}
		setOpenMenuId((prev) => (prev === id ? null : id));
	};

	//close tolpit when click outside
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

	//sort by week day  fetched data
	const sortedWeekRoutine = <T extends { day: string }>(data: T[]): T[] => {
		const daysOfWeekOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

		return [...data].sort((a, b) => {
			const dayA = daysOfWeekOrder.indexOf(a.day);
			const dayB = daysOfWeekOrder.indexOf(b.day);
			return dayA - dayB;
		});
	};

	useEffect(() => {
		setLoading({ type: 'SET_LOADING', payload: true });
		if (getWeekRoutine === undefined || getWeekRoutine === null || getWeekRoutine.length === 0) {
			setLoading({ type: 'SET_LOADING', payload: false });
			return;
		}
		if (getWeekRoutine) {
			setWeekRoutine(sortedWeekRoutine(getWeekRoutine));
			setWeekDays(getWeekRoutine.map((item) => item.day));

			setLoading({ type: 'SET_LOADING', payload: false });
		}
		// console.log(editedRoutine);
	}, [editedRoutine, getWeekRoutine, setLoading]);

	///edit routine
	const handleEdit = (id: Id<'workoutsWeekRoutine'>) => {
		const routineToEdit = getWeekRoutine?.find((item) => item._id === id);

		if (routineToEdit) {
			setEditedRoutine(routineToEdit);
			dialog.current?.showModal();
		} else {
			setEditedRoutine(null);
			showErrorToast('Failed to edit workout Routine');
		}
	};
	useEffect(() => {}, [editedRoutine, getWeekRoutine, showErrorToast]);

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
	// delete routine
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
		<article className='flex flex-col items-center w-full h-full p-4 gap-4'>
			<div className='flex justify-between items-center w-full'>
				<h2>Workout Page</h2>
			</div>
			<ul className='flex gap-8'>
				<button
					role='button'
					onClick={() => setActiveIndex(0)}
					className={`${activeIndex === 0 ? 'btn-underline border-primary-blue text-primary-blue' : 'btn-underline'} `}>
					My Workout Rotine
				</button>
				<button
					role='button'
					onClick={() => setActiveIndex(1)}
					className={`${activeIndex === 1 ? 'btn-underline text-primary-blue border-primary-blue ' : 'btn-underline'} `}>
					Finde Workout
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
					// Render the regular add form
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
							<div key={weekRoutine._id} className='flex justify-between items-center w-full'>
								<Link
									className='hover:text-primary-blue'
									href={`/userPage/workoutPlan/addWorkouts/${weekRoutine.userId}/${weekRoutine.routineId}`}
									key={weekRoutine._id}>
									<div className='flex gap-2 items-center h-full'>
										<p className='flex gap-1 items-center justify-center text-xs w-[35px] aspect-square border border-primary-light p-1 bg-primary-dark rounded-md'>
											{weekRoutine.day.slice(0, 3)}
										</p>
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
							</div>
						))}
					</ul>
				</div>
			)}
			{showModal && (
				<div className='fixed z-50 inset-0 overflow-y-auto'>
					<div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
						<div className='fixed inset-0 transition-opacity' aria-hidden='true'>
							<div className='absolute inset-0 bg-gray-500 opacity-75'></div>
						</div>
						<span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
							&#8203;
						</span>
						<div className='inline-block align-bottom bg-primary-dark rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
							<div className='bg-primary-dark px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
								<div className='sm:flex sm:items-start'>
									<div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
										<h3 className='text-lg leading-6 font-medium text-primary-danger'>Delete Workout Routine</h3>
										<div className='mt-2'>
											<p className='text-sm text-primary-danger'>Are you sure you want to delete this workout routine?</p>
										</div>
									</div>
								</div>
							</div>
							<div className='bg-primary-dark px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
								<button
									onClick={handleRoutineDelete}
									type='button'
									className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-danger text-base font-medium text-primary-light hover:text-primary-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue sm:ml-3 sm:w-auto sm:text-sm'>
									Delete
								</button>

								<button
									onClick={() => setShowModal(false)}
									type='button'
									className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-primary-light text-base font-medium text-primary-dark hover:text-primary-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
			<Toaster position='bottom-center' />
		</article>
	);
}
