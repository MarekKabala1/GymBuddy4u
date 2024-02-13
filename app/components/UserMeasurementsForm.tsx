import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UserMeasurements } from '../types/UserMeasurements';
import { useSession } from '@clerk/nextjs';

interface UserMeasurementsFormProps {
	onSubmit: SubmitHandler<UserMeasurements>;
}

const UserMeasurementsForm: React.FC<UserMeasurementsFormProps> = ({
	onSubmit,
}) => {
	const session = useSession();
	const userId = session.session?.user?.id as string;
	const onSubmitWithUserId = (data: UserMeasurements) => {
		const dataWithUserId = { ...data, userId };
		onSubmit(dataWithUserId);
		reset();
	};
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<UserMeasurements>();

	return (
		<>
			<form
				className='grid grid-cols-2 gap-4 justify-end p-8 md:grid-cols-3'
				onSubmit={handleSubmit(onSubmitWithUserId)}>
				<div className='flex items-center justify-center md:justify-end gap-2'>
					<label className='label hidden lg:block'>Weight:</label>
					<input
						type='number'
						{...register('weight', { required: 'Weight is required' })}
						className='input-field max-w-[80%]'
						defaultValue=''
						placeholder='Weight'
					/>
					{errors.weight && <span>{errors.weight.message}</span>}
				</div>

				<div className='flex items-center justify-center md:justify-end gap-2'>
					<label className='label hidden lg:block'>Height:</label>
					<input
						type='number'
						{...register('height', { required: 'Height is required' })}
						className='input-field max-w-[80%]'
						defaultValue=''
						placeholder='Height'
					/>
					{errors.height && <span>{errors.height.message}</span>}
				</div>

				<div className='flex items-center justify-center md:justify-end gap-2'>
					<label className='label hidden lg:block'>Age:</label>
					<input
						type='number'
						{...register('age', { required: 'Age is required' })}
						className='input-field max-w-[80%]'
						defaultValue=''
						placeholder='Age'
					/>
					{errors.age && <span>{errors.age.message}</span>}
				</div>

				<div className='flex items-center justify-center md:justify-end gap-2'>
					<label className='label hidden lg:block'>Biceps:</label>
					<input
						type='number'
						{...register('biceps', {
							required: 'Biceps measurement is required',
						})}
						className='input-field max-w-[80%]'
						defaultValue=''
						placeholder='Biceps'
					/>
					{errors.biceps && <span>{errors.biceps.message}</span>}
				</div>

				<div className='flex items-center justify-center md:justify-end gap-2'>
					<label className='label hidden lg:block'>Chest:</label>
					<input
						type='number'
						{...register('chest', {
							required: 'Chest measurement is required',
						})}
						className='input-field max-w-[80%]'
						defaultValue=''
						placeholder='Chest'
					/>
					{errors.chest && <span>{errors.chest.message}</span>}
				</div>

				<div className='flex items-center justify-center md:justify-end gap-2'>
					<label className='label hidden lg:block'>Calves:</label>
					<input
						type='number'
						{...register('calves', {
							required: 'Calves measurement is required',
						})}
						className='input-field max-w-[80%]'
						defaultValue=''
						placeholder='Calves'
					/>
					{errors.calves && <span>{errors.calves.message}</span>}
				</div>

				<div className='flex items-center justify-center md:justify-end gap-2'>
					<label className='label hidden lg:block'>Thigh:</label>
					<input
						type='number'
						{...register('thigh', {
							required: 'Thigh measurement is required',
						})}
						className='input-field max-w-[80%]'
						defaultValue=''
						placeholder='Thigh'
					/>
					{errors.thigh && <span>{errors.thigh.message}</span>}
				</div>

				<div className='flex items-center justify-center md:justify-end gap-2'>
					<label className='label hidden lg:block'>Hips:</label>
					<input
						type='number'
						{...register('hips', {
							required: 'Hips measurement is required',
						})}
						className='input-field max-w-[80%]'
						defaultValue=''
						placeholder='Hips'
					/>
					{errors.hips && <span>{errors.hips.message}</span>}
				</div>

				<div className='flex items-center justify-center md:justify-end gap-2'>
					<label className='label hidden lg:block'>Belly:</label>
					<input
						type='number'
						{...register('belly', {
							required: 'Belly measurement is required',
						})}
						className='input-field max-w-[80%]'
						defaultValue=''
						placeholder='Belly'
					/>
					{errors.belly && <span>{errors.belly.message}</span>}
				</div>
			</form>
			<button
				className='btn-light absolute z-50 right-12 sm:right-24 md:right-10 '
				onClick={handleSubmit(onSubmitWithUserId)}
				type='submit'>
				Submit
			</button>
		</>
	);
};

export default UserMeasurementsForm;
