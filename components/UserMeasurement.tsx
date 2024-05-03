'use client';
import { useEffect, useState } from 'react';
import { Preloaded, useMutation, usePreloadedQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import MeasurementsCard from '@/components/MeasurementCard';
import UserMeasurementsForm from '@/components/UserMeasurementsForm';
import type { UserMeasurements } from '@/app/types/types';
import { TrashIcon } from '@/app/assets/svgIcons';
import { useToast } from '@/app/hooks/toast';
import { ScaleLoader } from 'react-spinners';
import { formatDistance } from 'date-fns';
import { Toaster } from 'react-hot-toast';

export function UserMeasurements(props: { userMeasurements: Preloaded<typeof api.measurements.getAllMesurmentsForUser> }) {
	const [lastThreeUserMeasurements, setLastThreeUserMeasurements] = useState<UserMeasurements[]>([]);
	const [loading, setLoading] = useState(true);
	const { showErrorToast, showSuccessToast } = useToast();
	const userMeasurements = usePreloadedQuery(props.userMeasurements);
	const deleteMeasurement = useMutation(api.measurements.deleteUserMeasurement);
	const createMeasurement = useMutation(api.measurements.createUserMeasurement);

	const handleFormSubmit = async (data: UserMeasurements) => {
		try {
			setLoading(true);
			const numericData = Object.fromEntries(
				Object.entries(data).map(([key, value]) => (key === 'userId' || key === 'unit' ? [key, value] : [key, parseFloat(value)]))
			);
			await createMeasurement(numericData as UserMeasurements);
			setLoading(false);
			showSuccessToast('Measurement added successfully');
		} catch (error) {
			console.error('Error submitting form:', error);
			showErrorToast('Failed to add measurement');
		}
	};

	useEffect(() => {
		setLoading(true);
		if (userMeasurements === null) {
			setLastThreeUserMeasurements([]);
			setLoading(false);
		} else {
			const sortedMeasurements = [...userMeasurements].sort((a, b) => (b._creationTime ?? 0) - (a._creationTime ?? 0));
			const lastThreeMeasurements = sortedMeasurements.slice(0, 3);
			setLastThreeUserMeasurements(lastThreeMeasurements);
			setLoading(false);
		}
	}, [userMeasurements]);

	if (loading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<ScaleLoader color='#36D7B7' />
			</div>
		);
	}

	return (
		<>
			<h1>Add Measurements</h1>
			<UserMeasurementsForm onSubmit={handleFormSubmit} />

			<div className='flex  gap-4'>
				{lastThreeUserMeasurements.map((measurement) => (
					<div key={measurement._id}>
						<h2>
							{formatDistance(new Date(measurement._creationTime as number), new Date(), {
								addSuffix: true,
							})}
						</h2>
						<div>
							<MeasurementsCard title='Biceps' userMeasurements={measurement.biceps} unit='cm' />
							<MeasurementsCard title='Chest' userMeasurements={measurement.chest} unit='cm' />
							<MeasurementsCard title='Calves' userMeasurements={measurement.calves} unit='cm' />
							<MeasurementsCard title='Thigh' userMeasurements={measurement.thigh} unit='cm' />
							<MeasurementsCard title='Hips' userMeasurements={measurement.hips} unit='cm' />
							<MeasurementsCard title='Belly' userMeasurements={measurement.belly} unit='cm' />
						</div>
						<button
							className='btn-danger z-50 flex justify-center items-center gap-1  sm:right-24 md:right-10 '
							id={measurement._id}
							onClick={() => deleteMeasurement({ measurementId: measurement._id as Id<'usersMesurments'> })}
							type='button'>
							<TrashIcon className='w-5 h-5' />
							<p>Deleta measurement</p>
						</button>
					</div>
				))}
			</div>
			<Toaster position='bottom-right' />
		</>
	);
}
