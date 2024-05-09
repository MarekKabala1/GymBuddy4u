'use client';
import { useEffect, useState } from 'react';

import { Preloaded, useMutation, usePreloadedQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

import MeasurementsCard from '@/components/MeasurementCard';
import UserMeasurementsForm from './MeasurementsForm';

import type { UserMeasurements } from '@/app/types/types';
import { TrashIcon } from '@/app/assets/svgIcons';
import { useToast } from '@/app/hooks/useToast';

import useLoading from '@/app/hooks/useLoading';

import { ScaleLoader } from 'react-spinners';
import { formatDistance } from 'date-fns';
import { Toaster } from 'react-hot-toast';

export function UserMeasurements(props: { userMeasurements: Preloaded<typeof api.measurements.getAllMesurmentsForUser> }) {
	const [lastThreeUserMeasurements, setLastThreeUserMeasurements] = useState<UserMeasurements[]>([]);
	const [loading, setLoading] = useLoading();
	const { showErrorToast, showSuccessToast } = useToast();

	const excludedKeysForMeasurementCard = ['_id', 'unit', '_creationTime', 'userId', 'height'];

	const userMeasurements = usePreloadedQuery(props.userMeasurements);
	const deleteMeasurement = useMutation(api.measurements.deleteUserMeasurement);
	const createMeasurement = useMutation(api.measurements.createUserMeasurement);

	const handleFormSubmit = async (data: UserMeasurements) => {
		try {
			setLoading({ type: 'SET_LOADING', payload: true });
			const numericData = Object.fromEntries(
				Object.entries(data).map(([key, value]) => (key === 'userId' || key === 'unit' ? [key, value] : [key, parseFloat(value)]))
			);
			await createMeasurement(numericData as UserMeasurements);
			setLoading({ type: 'SET_LOADING', payload: false });
			showSuccessToast('Measurement added successfully');
		} catch (error) {
			console.error('Error submitting form:', error);
			showErrorToast('Failed to add measurement');
		}
	};

	useEffect(() => {
		setLoading({ type: 'SET_LOADING', payload: true });
		if (userMeasurements === null) {
			setLastThreeUserMeasurements([]);
			setLoading({ type: 'SET_LOADING', payload: false });
		} else {
			const sortedMeasurements = [...userMeasurements].sort((a, b) => (b._creationTime ?? 0) - (a._creationTime ?? 0));
			const lastThreeMeasurements = sortedMeasurements.slice(0, 3);
			setLastThreeUserMeasurements(lastThreeMeasurements);
			setLoading({ type: 'SET_LOADING', payload: false });
		}
	}, [setLoading, userMeasurements]);

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
							{Object.entries(measurement).map(
								([key, value]) =>
									!excludedKeysForMeasurementCard.includes(key) && (
										<MeasurementsCard
											key={key}
											title={key}
											userMeasurements={value}
											unit={key === 'weight' && measurement.unit === 'metric' ? 'kg' : measurement.unit === 'metric' ? 'cm' : 'in'}
										/>
									)
							)}
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
