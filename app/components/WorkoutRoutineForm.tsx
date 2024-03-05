'use client';
import { useEffect, useState } from 'react';

import { useSession } from '@clerk/nextjs';

import { SubmitHandler, useForm } from 'react-hook-form';

import { WorkoutRoutine } from '../types/types';

interface WorkoutRoutineFormProps {
	onSubmit: SubmitHandler<WorkoutRoutine>;
}

const WorkoutRoutineForm: React.FC<WorkoutRoutineFormProps> = ({
	onSubmit,
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
			className='flex flex-col gap-4 items-end justify-center '
			onSubmit={handleSubmit(onSubmitHandler)}>
			<div className='flex items-center justify-between w-full'>
				<label htmlFor='day'>Chose day:</label>
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
				{errors.day && <span>{errors.day.message}</span>}
			</div>
			<div className='flex items-center justify-between w-full'>
				<label htmlFor='name'>Name for your routine</label>
				<input
					className='input-field w-[60%]'
					type='text'
					id='name'
					{...register('name', { required: true, maxLength: 10 })}
					placeholder='Name for Routine'
				/>
				{errors.name && <span>{errors.name.message}</span>}
			</div>
			<button className='btn-light' type='submit'>
				Add to Routine
			</button>
		</form>
	);
};

export default WorkoutRoutineForm;
