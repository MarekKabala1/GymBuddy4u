import React, { useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Workout } from '../app/types/types';

interface WorkoutFormProps {
	onSubmit: SubmitHandler<Workout>;
	onCloseDialog: () => void;
}
//TODO: add error handling to the form
//TODO: add loading state to the form
//TODO: add validation to the form
const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSubmit, onCloseDialog }) => {
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

	const [sets, setSets] = useState(1);
	const [repsValue, setRepsValue] = useState<Array<number>>();
	const maxSets = 10;

	const handleSetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newSets = parseFloat(e.target.value);
		setSets(newSets as number);
		// Update repsValue array to match the new number of sets
		setRepsValue((prevReps) => {
			const newRepsValue: Array<number> = [];
			for (let i = 0; i < newSets; i++) {
				if (prevReps === undefined) {
					return;
				}
				if (prevReps[i]) {
					newRepsValue.push(prevReps[i]);
				}
			}
			return newRepsValue;
		});
	};

	const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const newReps = e.target.valueAsNumber;
		setRepsValue((prevReps) => {
			if (prevReps) {
				// Create a copy of the previous array
				const newRepsValue = prevReps.slice();
				// Fill the new value at the specified index
				newRepsValue.fill(newReps, index, index + 1);
				return newRepsValue;
			} else {
				return prevReps;
			}
		});
	};

	return (
		<>
			<form className='flex flex-col gap-4 items-end justify-center' onSubmit={handleSubmit(onSubmitHandler)}>
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
					{Array.from({ length: sets }, (_, index) => (
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
					<button onClick={onCloseDialog} className='btn-danger'>
						Close
					</button>
				</div>
			</form>
			<p className='text-xs text-primary-danger text-center w-full'>
				When you change the number of sets,
				<br /> the number of reps will be reset
			</p>
		</>
	);
};

export default WorkoutForm;
