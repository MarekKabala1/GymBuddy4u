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
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserMeasurements>();

	return (
		<>
			<form
				className='grid grid-cols-3 gap-4  justify-end p-8'
				onSubmit={handleSubmit(onSubmitWithUserId)}>
				<div className='flex flex-col items-end'>
					<label className='label'>
						Weight:
						<input
							type='number'
							{...register('weight', { required: 'Weight is required' })}
							className='input-field'
						/>
						{errors.weight && <span>{errors.weight.message}</span>}
					</label>
				</div>

				<div className='flex flex-col items-end'>
					<label className='label'>
						Height:
						<input
							type='number'
							{...register('height', { required: 'Height is required' })}
							className='input-field'
						/>
						{errors.height && <span>{errors.height.message}</span>}
					</label>
				</div>

				<div className='flex flex-col items-end'>
					<label className='label'>
						Age:
						<input
							type='number'
							{...register('age', { required: 'Age is required' })}
							className='input-field'
						/>
						{errors.age && <span>{errors.age.message}</span>}
					</label>
				</div>

				<div className='flex flex-col items-end'>
					<label className='label'>
						Biceps:
						<input
							type='number'
							{...register('biceps', {
								required: 'Biceps measurement is required',
							})}
							className='input-field'
						/>
						{errors.biceps && <span>{errors.biceps.message}</span>}
					</label>
				</div>

				<div className='flex flex-col items-end'>
					<label className='label'>
						Chest:
						<input
							type='number'
							{...register('chest', {
								required: 'Chest measurement is required',
							})}
							className='input-field'
						/>
						{errors.chest && <span>{errors.chest.message}</span>}
					</label>
				</div>

				<div className='flex flex-col items-end'>
					<label className='label'>
						Calves:
						<input
							type='number'
							{...register('calves', {
								required: 'Calves measurement is required',
							})}
							className='input-field'
						/>
						{errors.calves && <span>{errors.calves.message}</span>}
					</label>
				</div>

				<div className='flex flex-col items-end'>
					<label className='label'>
						Thigh:
						<input
							type='number'
							{...register('thigh', {
								required: 'Thigh measurement is required',
							})}
							className='input-field'
						/>
						{errors.thigh && <span>{errors.thigh.message}</span>}
					</label>
				</div>

				<div className='flex flex-col items-end'>
					<label className='label'>
						Hips:
						<input
							type='number'
							{...register('hips', {
								required: 'Hips measurement is required',
							})}
							className='input-field'
						/>
						{errors.hips && <span>{errors.hips.message}</span>}
					</label>
				</div>

				<div className='flex flex-col items-end'>
					<label className='label'>
						Belly:
						<input
							type='number'
							{...register('belly', {
								required: 'Belly measurement is required',
							})}
							className='input-field'
						/>
						{errors.belly && <span>{errors.belly.message}</span>}
					</label>
				</div>
			</form>
			<button
				className='btn-light relative left-8 '
				onClick={handleSubmit(onSubmitWithUserId)}
				type='submit'>
				Submit
			</button>
		</>
	);
};

export default UserMeasurementsForm;
