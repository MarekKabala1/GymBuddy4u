import React, { useRef, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Workout } from '@/app/types/types';
import { addWorkout } from '../actions/actions';

interface WorkoutFormProps {
	onSubmit: SubmitHandler<Workout>;
	onCloseDialog: () => void;
	routineName: string;
}
//TODO: add error handling to the form
//TODO: add loading state to the form
//TODO: add validation to the form
const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSubmit, onCloseDialog, routineName }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Workout>();

	const onSubmitHandler: SubmitHandler<Workout> = (data: Workout) => {
		let originalRepsValue = [...data.repsValue];

		originalRepsValue = data.repsValue.map((value) => Number(value));
		const updatedData: Workout = {
			...data,
			repsValue: originalRepsValue.slice(0, data.sets),
			sets: data.sets as number,
		};

		onSubmit({ ...(updatedData as Workout) });
		reset(data);
	};

	const [sets, setSets] = useState('');
	const [repsValue, setRepsValue] = useState<Array<number>>();
	const maxSets = 10;
	const formRef = useRef<HTMLFormElement>(null);

	const handleSetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newSets = e.target.value;
		setSets(newSets);
		const numSets = Number(newSets);
		const newRepsValue = Array(numSets).fill('');
		setRepsValue(newRepsValue);
	};

	const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const newReps = Number(e.target.value);
		setRepsValue((prevReps) => {
			const newRepsValue = [...prevReps!];
			newRepsValue[index] = newReps;
			return newRepsValue;
		});
	};

	return (
		<>
			<form className='flex flex-col gap-4 items-end justify-center' ref={formRef} action={addWorkout} onSubmit={handleSubmit(onSubmitHandler)}>
				<h3 className='text-md text-primary-light w-full text-center font-bold'>{routineName}</h3>
				<div className='flex items-center justify-between w-full'>
					<label htmlFor='muscleGroup'>Muscle Group:</label>
					<input
						className='input-field w-[60%]'
						type='text'
						id='muscleGroup'
						{...register('muscleGroup', { required: true })}
						placeholder='Chest'
						defaultValue={''}
					/>
					{errors.muscleGroup && <span className={`${errors.muscleGroup.message ? 'block' : 'hidden'}`}>{errors.muscleGroup.message}</span>}
				</div>
				<div className='flex items-center justify-between w-full'>
					<label htmlFor='exerciseName'>Exercise Name:</label>
					<input
						className='input-field w-[60%]'
						type='text'
						id='exerciseName'
						{...register('name', { required: true })}
						placeholder='Bench press'
						defaultValue={''}
					/>
					{errors.name && <span className={`${errors.name.message ? 'block' : 'hidden'}`}>{errors.name.message}</span>}
				</div>
				<div className='flex items-center justify-between w-full'>
					<label htmlFor='sets'>Number of Sets:</label>
					<input
						className='input-field w-[60%]'
						type='number'
						{...register('sets', { required: true })}
						id='sets'
						value={sets}
						onChange={handleSetsChange}
						placeholder='Sets'
						min={1}
						max={maxSets}
					/>
					{errors.sets && <span>{errors.sets.message}</span>}
				</div>

				<div key={sets} className='flex flex-col gap-4  justify-between w-full relative'>
					{Array.from({ length: Number(sets) }, (_, index) => (
						<div key={index} className='flex items-end gap-1 justify-between w-full pl-8 relative'>
							<label htmlFor={`reps ${index + 1}`}>Rep {index + 1}:</label>
							<input
								className='input-field w-[60%] gap-1'
								{...register(`repsValue.${index}`, { required: true })}
								type='number'
								id={`reps ${index + 1}`}
								value={repsValue ? repsValue[index] : 1}
								onChange={(e) => handleRepsChange(e, index)}
								placeholder={`Rep ${index + 1}`}
							/>
						</div>
					))}
					{errors.sets && <span>{errors.sets.message}</span>}
				</div>
				<input className='btn-light hover:text-primary-blue' type='submit' />
				<div className='flex  justify-end gap-4 w-full'>
					<button onClick={() => onCloseDialog()} className='btn-danger'>
						Close
					</button>
				</div>
			</form>
		</>
	);
};

export default WorkoutForm;
