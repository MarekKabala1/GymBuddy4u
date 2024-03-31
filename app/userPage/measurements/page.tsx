'use client';
import { MouseEventHandler, useEffect, useState } from 'react';

import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

import MeasurementsCard from '@/app/components/MeasurementCard';
import UserMeasurementsForm from '@/app/components/UserMeasurementsForm';

import { UserMeasurements } from '@/app/types/types';
import { TrashIcon } from '@/app/assets/svgIcons';

import { useToast } from '@/app/hooks/toast';
import { ScaleLoader } from 'react-spinners';

import { formatDistance } from 'date-fns';
import { Toaster } from 'react-hot-toast';
import { useSession } from '@clerk/nextjs';

export default function Measurements(): React.ReactElement {
	const [lastThreeUserMeasurements, setLastThreeUserMeasurements] = useState<UserMeasurements[]>([]);
	const [loading, setLoading] = useState(true);
	const { showErrorToast, showSuccessToast } = useToast();
	const session = useSession();

	const userMeasurements = useQuery(api.measurements.getAllMesurmentsForUser);
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

	const measurements = userMeasurements;

	useEffect(() => {
		setLoading(true);
		if (measurements === undefined) {
			return;
		}
		if (measurements && measurements.length > 0) {
			const sortedMeasurements = measurements.sort((a, b) => (b._creationTime ?? 0) - (a._creationTime ?? 0));
			const lastThreeMeasurements = sortedMeasurements?.slice(0, 3);
			setLoading(false);
			setLastThreeUserMeasurements(lastThreeMeasurements);
		} else {
			setLoading(false);
			setLastThreeUserMeasurements([]);
		}
	}, [measurements]);

	if (loading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<ScaleLoader color='#36D7B7' />
			</div>
		);
	}

	return (
		<article className='flex flex-col items-center w-full p-4 gap-8  overflow-auto '>
			<h1>Add Measurements</h1>
			<UserMeasurementsForm onSubmit={handleFormSubmit} />

			<div className='flex  gap-4'>
				{lastThreeUserMeasurements?.map((measurement) => (
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
		</article>
	);
}
