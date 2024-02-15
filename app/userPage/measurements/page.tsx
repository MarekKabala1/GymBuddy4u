'use client';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import UserMeasurementsForm from '../../components/UserMeasurementsForm';
import { UserMeasurements } from '../../types/UserMeasurements';
import toast, { Toaster } from 'react-hot-toast';

export default function Measurements(): React.ReactElement {
	const createUserMeasurement = useMutation(
		api.measurements.createUserMeasurement
	);
	const handleFormSubmit = async (data: UserMeasurements) => {
		try {
			const numericData = Object.fromEntries(
				Object.entries(data).map(([key, value]) =>
					key === 'userId' ? [key, value] : [key, parseFloat(value)]
				)
			);
			await createUserMeasurement(numericData as UserMeasurements);
			toast.success('Measurement added successfully');
		} catch (error) {
			console.error('Error submitting form:', error);
			toast.error('Failed to add measurement');
		}
	};
	return (
		<article>
			<UserMeasurementsForm onSubmit={handleFormSubmit} />
			<Toaster position='bottom-right' />
		</article>
	);
}
