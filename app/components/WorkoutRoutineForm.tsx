'use client';
import { useEffect, useState } from 'react';

import { useSession } from '@clerk/nextjs';

import { SubmitHandler, useForm } from 'react-hook-form';

import { WorkoutRoutine } from '../types/types';
import { PlusIcon } from '../assets/svgIcons';

interface WorkoutRoutineFormProps {
	onSubmit: SubmitHandler<WorkoutRoutine>;
	onCloseDialog: () => void;
}

const WorkoutRoutineForm: React.FC<WorkoutRoutineFormProps> = ({
	onSubmit,
	onCloseDialog,
}) => {
	const [day, setDay] = useState<string>();
	const weekDay = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	const session = useSession();
	const userId = session.session?.user?.id as string;

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<WorkoutRoutine>();

	const toCapitalCase = (word: string) => {
		return (word: string) => word.charAt(0).toUpperCase() + word.slice(1);
	};
	const onSubmitHandler: SubmitHandler<WorkoutRoutine> = (
		data: WorkoutRoutine
	) => {
		data.name = data.name?.split(' ').map(toCapitalCase(data.name)).join(' ');
		const dataWithUserId = { ...data, userId };
		onSubmit(dataWithUserId);
		reset(data);
	};
	const getTheDay = () => {
		const date = new Date();
		let day = weekDay[date.getDay()];
		return day;
	};
	useEffect(() => {
		setDay(getTheDay());
	}, []);

	return (
		<form
			className='flex flex-col gap-4 items-end justify-center'
			onSubmit={handleSubmit(onSubmitHandler)}>
			<div className='flex items-center justify-end gap-4 w-full'>
				<label className=' tracking-wider' htmlFor='day'>
					Chose day :
				</label>
				<select
					className='w-[60%] input-field'
					id='day'
					value={day}
					defaultValue={day as string}
					{...register('day', { required: true })}
					onChange={(e) => setDay(e.target.value)}
					required>
					{Array.from(weekDay).map((days) => (
						<option key={days} value={days}>
							{days}
						</option>
					))}
				</select>
				{errors.day && (
					<span className={`${errors.day.message ? 'block' : 'hidden'}`}>
						{errors.day.message}
					</span>
				)}
			</div>
			<div className='flex items-center justify-end gap-4 w-full'>
				<label className=' tracking-wider' htmlFor='name'>
					{' '}
					Name :
				</label>
				<input
					className='input-field w-[60%]'
					type='text'
					id='name'
					{...register('name', { required: true, maxLength: 10 })}
					placeholder='Name for Routine'
				/>
				{errors.name && (
					<span className={`${errors.name.message ? 'block' : 'hidden'}`}>
						{errors.name.message}
					</span>
				)}
			</div>
			<div className='flex  justify-end gap-4 w-full'>
				<button onClick={() => onCloseDialog()} className='btn-danger'>
					Close
				</button>
				<button
					className='btn-light flex justify-center items-center gap-1'
					type='submit'>
					<PlusIcon className='w-5 h-5' />
					<p>Add</p>
				</button>
			</div>
		</form>
	);
};

export default WorkoutRoutineForm;
