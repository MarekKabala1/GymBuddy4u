'use client';
import { useCallback, useEffect, useState } from 'react';

import { useSession } from '@clerk/nextjs';

import { SubmitHandler, useForm } from 'react-hook-form';

import { WorkoutRoutine } from '../types/types';

import { PlusIcon } from '../assets/svgIcons';

const toCapitalCase = (word: string) => {
	return (word: string) => word.charAt(0).toUpperCase() + word.slice(1);
};

interface WorkoutRoutineFormProps {
	onSubmit: SubmitHandler<WorkoutRoutine>;
	onCloseDialog: () => void;
	weekRoutineDays: string[];
}

const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const WorkoutRoutineForm: React.FC<WorkoutRoutineFormProps> = ({ onSubmit, onCloseDialog, weekRoutineDays }) => {
	const [day, setDay] = useState<string>();
	const [restDay, setRestDay] = useState(false);
	const [displayError, setDisplayError] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm<WorkoutRoutine>();
	const session = useSession();
	const userId = session.session?.user?.id as string;

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRestDay(e.target.checked);
	};

	const onSubmitHandler: SubmitHandler<WorkoutRoutine> = (data: WorkoutRoutine) => {
		data.name = data.name?.split(' ').map(toCapitalCase(data.name)).join(' ');
		const dayExists = weekRoutineDays.includes(day as string);
		if (dayExists) {
			setError('day', { type: 'manual', message: 'Day already exists' });
			setDisplayError(true);
		} else {
			clearErrors('day');
			setDisplayError(false);
			// Submit the data if the day is unique
			const dataWithUserId = { ...data, userId, restDay };
			onSubmit(dataWithUserId);
			reset(data);
		}
	};

	const getTheDay = () => {
		const date = new Date();
		let day = weekDay[date.getDay()];
		return day;
	};
	useEffect(() => {
		setDay(getTheDay());
	}, []);

	useEffect(() => {
		setDisplayError(!!errors.day || !!errors.name);
		setTimeout(() => {
			setDisplayError(false);
		}, 3000);
	}, [errors.day, errors.name]);

	return (
		<form className='flex flex-col gap-4 items-end justify-center' onSubmit={handleSubmit(onSubmitHandler)}>
			<div className='flex items-center justify-end gap-4 w-full'>
				{displayError && <span className='text-xs text-primary-danger'>{errors.day?.message}</span>}
				{!displayError && (
					<>
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
					</>
				)}
			</div>
			<div className='flex items-center justify-end gap-4 w-full'>
				{displayError && errors.name && <span className='text-xs text-primary-danger'>{errors.name.message}</span>}
				{!displayError && (
					<>
						<label className=' tracking-wider' htmlFor='name'>
							{' '}
							Name :
						</label>
						<input
							className='input-field w-[60%]'
							type='text'
							id='name'
							{...register('name', { required: 'Name is required, max length is 10 characters', maxLength: 10 })}
							placeholder='Name for Routine'
						/>
					</>
				)}
			</div>
			<div className='flex items-center justify-end gap-4 w-full'>
				<label className=' tracking-wider' htmlFor='description'>
					{false}
					Mark as a Rest Day :
				</label>
				<input
					className='input-field w-[60%]'
					type='checkbox'
					id='restDay'
					{...register('restDay')}
					placeholder='restDay'
					checked={restDay}
					onChange={handleCheckboxChange}
				/>
			</div>
			<div className='flex  justify-end gap-4 w-full'>
				<button onClick={() => onCloseDialog()} className='btn-danger'>
					Close
				</button>
				<button className='btn-light flex justify-center items-center gap-1' type='submit'>
					<PlusIcon className='w-5 h-5' />
					<p>Add</p>
				</button>
			</div>
		</form>
	);
};

export default WorkoutRoutineForm;
