import React, { useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Workout, WorkoutSet } from '../types/UserMeasurements';
import { TrashIcon } from '../assets/svgIcons';

interface WorkoutFormProps {
	onSubmit: SubmitHandler<Workout>;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSubmit }) => {
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
					<label htmlFor='day'>Day:</label>
					<input
						className='input-field w-[60%]'
						type='date'
						{...register('day', { required: true })}
						placeholder='Day'
						defaultValue={new Date().toISOString().split('T')[0]}
					/>
					{errors.day && <span>{errors.day.message}</span>}
				</div>
				<div className='flex items-center justify-between w-full'>
					<label htmlFor='muscleGroup'>Muscle Group:</label>
					<input
						className='input-field w-[60%]'
						type='text'
						{...register('muscleGroup', { required: true })}
						placeholder='Muscle Group'
						defaultValue={''}
					/>
					{errors.muscleGroup && <span>{errors.muscleGroup.message}</span>}
				</div>
				<div className='flex items-center justify-between w-full'>
					<label htmlFor='exerciseName'>Exercise Name:</label>
					<input
						className='input-field w-[60%]'
						type='text'
						{...register('exerciseName', { required: true })}
						placeholder='Exercise Name'
						defaultValue={''}
					/>
					{errors.exerciseName && <span>{errors.exerciseName.message}</span>}
				</div>
				<div className='flex items-center justify-between w-full'>
					<label htmlFor='sets'>Number of Sets:</label>
					<input
						className='input-field w-[60%]'
						type='number'
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
					className='btn-light'
					type='button'
					onClick={handleAddRepsField}>
					Add More Sets
				</button>

				<input type='submit' />
			</form>
		</>
	);
};

export default WorkoutForm;
