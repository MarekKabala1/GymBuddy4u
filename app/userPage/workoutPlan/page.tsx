'use client';
import {
	EditIcon,
	PlusIcon,
	SubMenuIcon,
	TrashIcon,
} from '@/app/assets/svgIcons';
import WorkoutForm from '@/app/components/AddWorkoutForm';
import WorkoutRoutineForm from '@/app/components/WorkoutRoutineForm';
import { useToast } from '@/app/hooks/toast';
import { Workout, WorkoutRoutine } from '@/app/types/types';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery, useMutation } from 'convex/react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { ScaleLoader } from 'react-spinners';

export default function Workoutt(): React.ReactElement {
	const [loading, setLoading] = useState(true);
	const [weekRoutine, setWeekRoutine] = useState<WorkoutRoutine[]>([]);
	const [activeIndex, setActiveIndex] = useState<number | null>(0);
	const [openMenuId, setOpenMenuId] = useState<
		Id<'workouts'> | undefined | null
	>(null);

	const dialog = useRef<HTMLDialogElement>(null);

	const { showErrorToast, showSuccessToast } = useToast();

	const getWeekRoutine = useQuery(api.workouts?.getAllWeekRoutines);

	const createWeekRoutine = useMutation(api.workouts.addWeekRoutine);

	const handleFormSubmit = async (data: WorkoutRoutine) => {
		try {
			if (weekRoutine.map((item) => item.day === data.day).includes(true)) {
				dialog.current?.close();
				showErrorToast('Day already exist');
				return;
			} else {
				setLoading(true);
				await createWeekRoutine(data as WorkoutRoutine);
				dialog.current?.close();
				setLoading(false);
				console.log(data);
				showSuccessToast('Workout Routine created successfully');
			}
		} catch (error) {
			console.error('Error submitting form:', error);
			showErrorToast('Failed to create workout Routine');
		}
	};

	const handleClick = (id: Id<'workouts'>) => {
		if (id === undefined) {
			return;
		}
		setOpenMenuId((prev) => (prev === id ? null : id));
	};

	//close tolpit when click outside
	const handleClickOutside = (event: MouseEvent) => {
		const target = event.target as HTMLElement;

		if (openMenuId && !target.closest(`[data-menu-id="${openMenuId}"]`)) {
			setOpenMenuId(null);
		}
	};
	useEffect(() => {
		document.body.addEventListener('click', handleClickOutside);

		return () => {
			document.body.removeEventListener('click', handleClickOutside);
		};
	}, [openMenuId]);

	//sort by day for fetched data
	const sortedWeekRoutine = <T extends { day: string }>(data: T[]): T[] => {
		const daysOfWeekOrder = [
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
			'Sunday',
		];

		return [...data].sort((a, b) => {
			const dayA = daysOfWeekOrder.indexOf(a.day);
			const dayB = daysOfWeekOrder.indexOf(b.day);
			return dayA - dayB;
		});
	};

	useEffect(() => {
		setLoading(true);
		if (
			getWeekRoutine === undefined ||
			getWeekRoutine === null ||
			getWeekRoutine.length === 0
		) {
			setLoading(false);
			return;
		}
		if (getWeekRoutine) {
			setWeekRoutine(sortedWeekRoutine(getWeekRoutine));

			setLoading(false);
		}
	}, [getWeekRoutine]);

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
					className={`${
						activeIndex === 0
							? 'btn-underline border-primary-blue text-primary-blue'
							: 'btn-underline'
					} `}>
					My Workout Rotine
				</button>
				<button
					role='button'
					onClick={() => setActiveIndex(1)}
					className={`${
						activeIndex === 1
							? 'btn-underline text-primary-blue border-primary-blue '
							: 'btn-underline'
					} `}>
					Finde Workout
				</button>
			</ul>
			<button
				className='btn-dark'
				type='button'
				onClick={() => dialog.current?.showModal()}>
				<PlusIcon className='w-5 h-5 inline-block mr-1' />
				Day Routine
			</button>
			<dialog ref={dialog}>
				<WorkoutRoutineForm onSubmit={handleFormSubmit} />
				<button onClick={() => dialog.current?.close()} className='btn-danger'>
					Close
				</button>
			</dialog>
			{weekRoutine && weekRoutine.length > 0 && activeIndex === 0 && (
				<ul className='flex flex-wrap gap-4 items-center justify-center'>
					{weekRoutine.map((weekRoutine) => (
						<li key={weekRoutine._id}>
							<div className='flex gap-1 items-center h-full'>
								<div className='flex flex-col gap-1 items-center'>
									<p className='text-xs'>{weekRoutine.day}</p>
									{weekRoutine.name ? weekRoutine.name : weekRoutine.day}
								</div>
								<div className='flex flex-col gap-1 relative'>
									<button
										data-menu-id={weekRoutine._id}
										onClick={() =>
											handleClick(weekRoutine._id as Id<'workouts'>)
										}>
										<SubMenuIcon className='w-5 h-5 inline-block cursor-pointer' />
									</button>
									<div
										className={`${
											openMenuId === weekRoutine._id
												? 'border rounded-lg border-primary-blue p-1 flex flex-col gap-1 absolute top-8 right-0'
												: 'hidden'
										}  `}>
										<div
											role='button'
											className='flex gap-1 cursor-pointer hover:text-primary-blue'>
											<TrashIcon className='w-4 h-4 inline-block stroke-primary-danger ' />
											<p className='text-primary-danger text-xs'>Delete</p>
										</div>
										<div
											role='button'
											className='flex gap-1 cursor-pointer hover:text-primary-blue'>
											<EditIcon className='w-4 h-4  inline-block' />
											<p className='text-xs'>Edit</p>
										</div>
									</div>
								</div>
							</div>
						</li>
					))}
				</ul>
			)}
			<Toaster position='bottom-center' />
		</article>
	);
}
