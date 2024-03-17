import React, { useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Workout, WorkoutSet } from '../types/types';
import { PlusIcon, TrashIcon } from '../assets/svgIcons';

interface WorkoutFormProps {
	onSubmit: SubmitHandler<Workout>;
	onCloseDialog: () => void;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({
	onSubmit,
	onCloseDialog,
}) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Workout>();

	const [repsValue, setRepsValue] = useState<WorkoutSet[]>([{ reps: 1 }]);

	const onSubmitHandler: SubmitHandler<Workout> = (data: Workout) => {
		onSubmit(data);
		data.reps = repsValue;
		setRepsValue([{ reps: 1 }]);
		reset({
			...data,
			reps: repsValue,
		});
	};

	const handleAddRepsField = () => {
		setRepsValue((prevReps) => [...prevReps, { reps: 0 }]);
	};
	const handleDeleteSet = (index: number) => {
		setRepsValue((prevReps) => prevReps.filter((_, i) => i !== index));
	};

	useEffect(() => {}, [repsValue]);

	return (
		<>
			<form
				className='flex flex-col gap-4 items-end justify-center'
				onSubmit={handleSubmit(onSubmitHandler)}>
				<div className='flex items-center justify-between w-full'>
					<label htmlFor='muscleGroup'>Muscle Group:</label>
					<input
						className='input-field w-[60%]'
						type='text'
						id='muscleGroup'
						{...register('muscleGroup', { required: true })}
						placeholder='Muscle Group optional'
						defaultValue={''}
					/>
					{errors.muscleGroup && (
						<span
							className={`${errors.muscleGroup.message ? 'block' : 'hidden'}`}>
							{errors.muscleGroup.message}
						</span>
					)}
				</div>
				<div className='flex items-center justify-between w-full'>
					<label htmlFor='exerciseName'>Exercise Name:</label>
					<input
						className='input-field w-[60%]'
						type='text'
						id='exerciseName'
						{...register('exerciseName', { required: true })}
						placeholder='Exercise Name'
						defaultValue={''}
					/>
					{errors.exerciseName && (
						<span
							className={`${errors.exerciseName.message ? 'block' : 'hidden'}`}>
							{errors.exerciseName.message}
						</span>
					)}
				</div>
				<div className='flex items-center justify-between w-full'>
					<label htmlFor='sets'>Number of Sets:</label>
					<input
						className='input-field w-[60%]'
						type='number'
						id='sets'
						{...register('sets', { required: true })}
						placeholder='Sets'
						defaultValue={1}
					/>
					{errors.sets && <span>{errors.sets.message}</span>}
				</div>

				{repsValue.map((set, index) => (
					<div
						key={index}
						className='flex items-center justify-between w-full relative'>
						<label htmlFor='reps'>Reps for Set {index + 1}:</label>
						<input
							className='input-field w-[60%] '
							type='number'
							{...register(`reps.${index}`, { required: true })}
							placeholder={`Reps for Set ${index + 1}`}
							defaultValue={set.reps}
							id='reps'
							onChange={(e) => {
								const value = parseInt(e.target.value, 10);
								setRepsValue((prevReps) =>
									prevReps.map((prevSet, i) =>
										i === index ? { reps: value } : prevSet
									)
								);
							}}
						/>
						{errors.sets && <span>{errors.sets.message}</span>}
						<button
							type='button'
							onClick={() => handleDeleteSet(index)}
							className='ml-2 text-red-500 cursor-pointer absolute right-5'>
							<TrashIcon className='w-4 h-4 ' />
						</button>
					</div>
				))}

				<button
					className='btn-underline text-primary-light'
					type='button'
					onClick={handleAddRepsField}>
					{/* <PlusIcon className='w-5 h-5' /> */}
					<p>Add More Sets</p>
				</button>
				<div className='flex  justify-end gap-4 w-full'>
					<button onClick={() => onCloseDialog()} className='btn-danger'>
						Close
					</button>
					<input className='btn-light hover:text-primary-blue' type='submit' />
				</div>
			</form>
			<p className='text-xs text-primary-danger'>
				If all the sets has same reps value don&apos;t have to add more fields
				for reps.
			</p>
		</>
	);
};

export default WorkoutForm;
