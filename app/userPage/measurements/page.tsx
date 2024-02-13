'use client';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import UserMeasurementsForm from '../../components/UserMeasurementsForm';
import { UserMeasurements } from '../../types/UserMeasurements';

export default function Measurements(): React.ReactElement {
	const createUserMeasurement = useMutation(
		api.measurements.createUserMeasurement
	);
	const handleFormSubmit = (data: UserMeasurements) => {
		const numericData = Object.fromEntries(
			Object.entries(data).map(([key, value]) =>
				key === 'userId' ? [key, value] : [key, parseFloat(value)]
			)
		);
		createUserMeasurement(numericData as UserMeasurements);
	};

	return (
		<article>
			<UserMeasurementsForm onSubmit={handleFormSubmit} />
		</article>
	);
}
