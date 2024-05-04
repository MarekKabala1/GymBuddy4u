import React, { useCallback, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UserMeasurements } from '../app/types/types';
import { useSession } from '@clerk/nextjs';

interface UserMeasurementsFormProps {
	onSubmit: SubmitHandler<UserMeasurements>;
}

const UserMeasurementsForm: React.FC<UserMeasurementsFormProps> = ({ onSubmit }) => {
	const session = useSession();
	const userId = session.session?.user?.id as string;
	const [displayError, setDisplayError] = useState(false);
	const onSubmitWithUserId = (data: UserMeasurements) => {
		if (errors) {
			Object.keys(errors).forEach((key) => {
				const fieldKey = key as keyof UserMeasurements;
				const errorMessage = errors[fieldKey as keyof UserMeasurements]?.message as string;
				setFieldError(fieldKey, errorMessage);
			});
			setDisplayError(true);
		}
		clearErrors();
		const dataWithUserId = { ...data, userId };
		onSubmit(dataWithUserId);
		reset();
	};
	const {
		register,
		handleSubmit,
		reset,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm<UserMeasurements>();

	const setFieldError = useCallback(
		(field: keyof typeof errors, message: string) => {
			if (message) {
				setError(field, { type: 'manual', message });
			} else {
				setError(field, { type: 'manual', message: '' });
			}
		},
		[setError]
	);

	useEffect(() => {
		if (errors && Object.keys(errors).length > 0) {
			Object.keys(errors).forEach((key) => {
				const fieldKey = key as keyof UserMeasurements;
				setFieldError(fieldKey, errors[fieldKey]?.message || '');
			});
			setDisplayError(true);
			console.log(errors);
			setTimeout(() => {
				setDisplayError(false);
				clearErrors();
			}, 3000);
		}
	}, [clearErrors, errors, setFieldError]);

	return (
		<>
			<form className='grid grid-cols-2 gap-4 justify-end md:grid-cols-3' onSubmit={handleSubmit(onSubmitWithUserId)}>
				{displayError && errors.weight ? (
					<span className='text-primary-danger text-xs text-center'>{errors.weight.message}</span>
				) : (
					<div className='flex items-center justify-center md:justify-end gap-2'>
						<label className='label hidden lg:block'>Weight:</label>
						<input
							type='number'
							{...register('weight', { required: 'Weight is required' })}
							className='input-field max-w-[80%]'
							defaultValue=''
							placeholder='Weight'
						/>
					</div>
				)}
				{displayError && errors.height ? (
					<span className='text-primary-danger text-xs text-center'>{errors.height.message}</span>
				) : (
					<div className='flex items-center justify-center md:justify-end gap-2'>
						<label className='label hidden lg:block'>Height:</label>
						<input
							type='number'
							{...register('height', { required: 'Height is required' })}
							className='input-field max-w-[80%]'
							defaultValue=''
							placeholder='Height'
						/>
					</div>
				)}
				{displayError && errors.age ? (
					<span className='text-primary-danger text-xs text-center'>{errors.age.message}</span>
				) : (
					<div className='flex items-center justify-center md:justify-end gap-2'>
						<label className='label hidden lg:block'>Age:</label>
						<input type='number' {...register('age', { required: 'Age is required' })} className='input-field max-w-[80%]' defaultValue='' placeholder='Age' />
					</div>
				)}
				{displayError && errors.biceps ? (
					<span className='text-primary-danger text-xs text-center'>{errors.biceps.message}</span>
				) : (
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
					</div>
				)}
				{displayError && errors.chest ? (
					<span className='text-primary-danger text-xs text-center'>{errors.chest.message}</span>
				) : (
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
					</div>
				)}
				{displayError && errors.calves ? (
					<span className='text-primary-danger text-xs text-center'>{errors.calves.message}</span>
				) : (
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
					</div>
				)}
				{displayError && errors.thigh ? (
					<span className='text-primary-danger text-xs text-center'>{errors.thigh.message}</span>
				) : (
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
					</div>
				)}
				{displayError && errors.hips ? (
					<span className='text-primary-danger text-xs text-center'>{errors.hips.message}</span>
				) : (
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
					</div>
				)}
				{displayError && errors.belly ? (
					<span className='text-primary-danger text-xs text-center'>{errors.belly.message}</span>
				) : (
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
					</div>
				)}
				{displayError && errors.unit ? (
					<span className='text-primary-danger text-xs text-center'>{errors.unit.message}</span>
				) : (
					<div className='flex items-center justify-center gap-2'>
						<label className='sr-only'>Unit:</label>
						<div className='flex items-center justify-center'>
							<input type='radio' {...register('unit', { required: 'Unit is required' })} value='metric' className='input-field max-w-[80%]' />
							<span className='ml-1'>Metric</span>
						</div>
						<div className='flex items-center ml-4'>
							<input type='radio' {...register('unit', { required: 'Unit is required' })} value='imperial' />
							<span className='ml-1'>Imperial</span>
						</div>
					</div>
				)}
			</form>
			<button className='btn-light z-50  sm:right-24 md:right-10 ' onClick={handleSubmit(onSubmitWithUserId)} type='submit'>
				Submit
			</button>
		</>
	);
};

export default UserMeasurementsForm;
