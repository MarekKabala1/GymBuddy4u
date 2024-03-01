'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { WorkoutRutine } from '../types/types';
import { useSession } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

interface WorkoutRutineFormProps {
	onSubmit: SubmitHandler<WorkoutRutine>;
}

const WorkoutRutineForm: React.FC<WorkoutRutineFormProps> = ({ onSubmit }) => {
	const [day, setDay] = useState<number>();

	const session = useSession();
	const userId = session.session?.user?.id as string;
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<WorkoutRutine>();

	const onSubmitHandler: SubmitHandler<WorkoutRutine> = (
		data: WorkoutRutine
	) => {
		const dataWithUserId = { ...data, userId };
		onSubmit(dataWithUserId);
		reset(data);
	};

	//get curent timestamp to convert to the day of the week

	useEffect(() => {
		const today = new Date();
		const dayOfWeek = today.getDay();
		setDay(dayOfWeek);
		console.log(day);
	}, [day]);

	return (
		<form
			className='flex flex-col gap-4 items-end justify-center '
			onSubmit={handleSubmit(onSubmitHandler)}>
			<div className='flex items-center justify-between w-full'>
				<label htmlFor='day'>Chose day:</label>
				<select
					className='w-[60%] input-field'
					id='day'
					{...register('day', { required: true })}
					required>
					{/* <option value='Chose a day for rutine'>Chose a day for rutine</option> */}
					<option value='1'>Monday</option>
					<option value='2'>Tuesday</option>
					<option value='3'>Wednesday</option>
					<option value='4'>Thursday</option>
					<option value='5'>Friday</option>
					<option value='6'>Saturday</option>
					<option value='7'>Sunday</option>
				</select>
				{errors.day && <span>{errors.day.message}</span>}
			</div>
			<div className='flex items-center justify-between w-full'>
				<label htmlFor='name'>Name for your routine</label>
				<input
					className='input-field w-[60%]'
					type='text'
					id='name'
					{...register('name', { required: true })}
					placeholder='Name for Rutine'
				/>
			</div>
			<button className='btn-light' type='submit'>
				Add to rutine
			</button>
		</form>
	);
};

export default WorkoutRutineForm;
