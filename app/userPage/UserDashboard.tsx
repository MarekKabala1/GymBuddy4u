'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Preloaded, usePreloadedQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

import MeasurementsCard from '../../components/MeasurementCard';
import { UserMeasurements } from '../types/types';
import { PlusIcon } from '../assets/svgIcons';
import BMIPanel from '../../components/BmiBarIndicator';
import useLoading from '@/app/hooks/useLoading';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function Dashboard(props: { getLastMeasurement: Preloaded<typeof api.measurements.getLastMeasurementForUser> }) {
	const [userMeasurements, setUserMeasurements] = useState<UserMeasurements>();
	const [loading, setLoading] = useLoading();
	const [bmiName, setBmiName] = useState<string>();
	const [bmiValue, setBmiValue] = useState<number>();

	const lastMeasurement = usePreloadedQuery(props?.getLastMeasurement);

	useEffect(() => {
		const fetchData = async () => {
			setLoading({ type: 'SET_LOADING', payload: true });
			try {
				setUserMeasurements(lastMeasurement as UserMeasurements);
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading({ type: 'SET_LOADING', payload: false });
			}
		};
		fetchData();
	}, [lastMeasurement, setLoading]);

	const calculateBMI = async (weight: number, height: number, unit: string) => {
		try {
			if (unit === 'metric') {
				const bmiNumber = weight / height ** 2;
				return (bmiNumber * 10000).toFixed(2);
			} else {
				const inchesHeight = height * 12;
				const bmi = (weight / inchesHeight ** 2) * 703;
				return bmi.toFixed(2);
			}
		} catch (error) {
			console.error('Error calculating BMI:', error);
		}
	};

	useEffect(() => {
		if (!userMeasurements) return;

		const updateBMI = async () => {
			const bmi = await calculateBMI(userMeasurements.weight, userMeasurements.height, userMeasurements.unit);
			const bmiNumber = Number(bmi);
			if (isNaN(bmiNumber)) {
				setBmiValue(0);
				setBmiName('Invalid BMI');
				return;
			}
			setBmiValue(bmiNumber);
			if (bmiNumber < 18.5) {
				setBmiName('Underweight');
			} else if (bmiNumber < 25) {
				setBmiName('Healthy Weight');
			} else if (bmiNumber < 30) {
				setBmiName('Overweight');
			} else {
				setBmiName('Obese');
			}
		};
		updateBMI();
	}, [userMeasurements]);

	const measurementsUnit = userMeasurements?.unit === 'metric' ? 'cm' : 'in';

	return (
		<>
			<div className='grid grid-rows-4 grid-cols-[1fr,2fr,1fr] place-items-center p-4'>
				<div className='col-start-1 row-start-1 flex flex-col justify-center items-center'>
					<p className='font-bold text-primary-blue pb-1'>Age</p>
					<p className='font-bold text-sm md:text-lg'>{userMeasurements?.age || <Skeleton />}</p>
					<span>Years</span>
				</div>
				<div className='col-start-3 row-start-1 flex flex-col justify-center items-center'>
					<p className='font-bold text-primary-blue pb-1'>Height</p>
					<p className='font-bold text-sm md:text-lg'>{userMeasurements?.height || <Skeleton />}</p>
					<span>{measurementsUnit}</span>
				</div>
				<div className='col-start-2 row-start-1 flex flex-col justify-center items-center'>
					<p className='font-bold text-primary-blue pb-1'>Weight</p>
					<p className='font-bold text-sm md:text-lg'>{userMeasurements?.weight || <Skeleton />}</p>
					<span>{userMeasurements?.unit === 'metric' ? 'kg' : 'lbs'}</span>
				</div>

				{/* Measurement Cards */}
				<div className='col-start-1 row-start-2'>
					<MeasurementsCard title='Biceps' userMeasurements={userMeasurements?.biceps} unit={measurementsUnit} />
				</div>
				<div className='col-start-3 row-start-2'>
					<MeasurementsCard title='Chest' userMeasurements={userMeasurements?.chest} unit={measurementsUnit} />
				</div>
				<div className='col-start-3 row-start-4'>
					<MeasurementsCard title='Calves' userMeasurements={userMeasurements?.calves} unit={measurementsUnit} />
				</div>
				<div className='col-start-3 row-start-3'>
					<MeasurementsCard title='Thigh' userMeasurements={userMeasurements?.thigh} unit={measurementsUnit} />
				</div>
				<div className='col-start-1 row-start-4'>
					<MeasurementsCard title='Hips' userMeasurements={userMeasurements?.hips} unit={measurementsUnit} />
				</div>
				<div className='col-start-1 row-start-3'>
					<MeasurementsCard title='Belly' userMeasurements={userMeasurements?.belly} unit={measurementsUnit} />
				</div>

				<Image
					src='/img-svg/img/FULL1.png'
					alt='Posture of the man with highlighted muscles'
					width={200}
					height={300}
					priority
					className='row-start-2 row-span-4 col-start-2'
					placeholder='blur'
					blurDataURL='/img-svg/img/FULL1.png'
				/>
			</div>
			<div className='flex flex-col justify-center items-center'>
				<h2 className='font-bold text-primary-blue'>BMI</h2>
				<BMIPanel bmi={bmiValue} />
				<p
					className={`font-bold text-sm md:text-lg ${
						bmiName === 'Underweight' || bmiName === 'Overweight' || bmiName === 'Obese' ? 'text-primary-danger' : 'text-primary-success'
					}`}>
					{bmiValue}
				</p>
				<span
					className={`text-sm md:text-lg ${
						bmiName === 'Underweight' || bmiName === 'Overweight' || bmiName === 'Obese' ? 'text-primary-danger' : 'text-primary-success'
					}`}>
					{bmiName}
				</span>
			</div>

			<Link
				role='button'
				href='/userPage/measurements'
				className='btn-light text-primary-blue m-auto flex gap-1 items-center hover:drop-shadow-2xl hover:border-primary-light hover:text-primary-success transition-all duration-200 ease-in-out'>
				<PlusIcon /> Measurement
			</Link>
		</>
	);
}
