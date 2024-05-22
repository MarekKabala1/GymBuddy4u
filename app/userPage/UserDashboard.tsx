'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Preloaded, usePreloadedQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

import { ScaleLoader } from 'react-spinners';

import MeasurementsCard from '../../components/MeasurementCard';

import { UserMeasurements } from '../types/types';
import { PlusIcon } from '../assets/svgIcons';
import BMIPanel from '../../components/BmiBarIndicator';
import useLoading from '@/app/hooks/useLoading';

export function Dashboard(props: { getLastMeasurement: Preloaded<typeof api.measurements.getLastMeasurementForUser> }) {
	const [userMeasurements, setUserMeasurements] = useState<UserMeasurements>();
	const [loading, setLoading] = useLoading();
	const [bmiName, setBmiName] = useState<string>();
	const [bmiValue, setBmiValue] = useState<number>();

	const lastMeasurement = usePreloadedQuery(props?.getLastMeasurement);
	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading({ type: 'SET_LOADING', payload: true });
				setUserMeasurements(lastMeasurement as UserMeasurements);
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading({ type: 'SET_LOADING', payload: false });
			}
		};

		fetchData();
	}, [lastMeasurement, setLoading]);

	const measurementsUnit = userMeasurements?.unit === 'metric' ? 'cm' : 'in';

	const calculateBMI = async (weight: number, height: number, unit: string) => {
		try {
			if (unit === 'metric') {
				const bmiNumber = weight / height ** 2;
				const bmi = bmiNumber * 10000;
				return bmi.toFixed(2);
			} else {
				const inchesHeight = height * 12;
				const bmi = (weight / (inchesHeight * inchesHeight)) * 703;
				return bmi.toFixed(2);
			}
		} catch (error) {
			console.error('Error calculating BMI:', error);
		}
	};

	useEffect(() => {
		if (!userMeasurements) return;

		calculateBMI(userMeasurements.weight, userMeasurements.height, userMeasurements.unit)
			.then((bmi) => {
				const bmiNumber = Number(bmi);
				if (!bmiNumber) {
					console.warn('Invalid BMI value:', bmi);
					setBmiValue(0);
					setBmiName('Invalid BMI');
					return;
				}
				setBmiValue(bmiNumber);
				if (!bmi) {
					return;
				} else if (bmiNumber < 18.5) {
					setBmiName('Underweight ');
				} else if (bmiNumber >= 18.5 && bmiNumber <= 24.9) {
					setBmiName('Healthy Weight');
				} else if (bmiNumber >= 25 && bmiNumber <= 29.9) {
					setBmiName('Overweight ');
				} else {
					setBmiName('To much Mate');
				}
			})
			.catch((error) => {
				console.error('Error calculating BMI:', error);
			});
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
			<div className='grid grid-rows-4 grid-col-[1fr,2fr,1fr] place-items-center p-4'>
				<div className='col-start-1 row-start-1 flex flex-col justify-center items-center'>
					<p className='font-bold text-primary-blue pb-1 '>Age</p>
					<p className='font-bold text-sm md:text-lg'>{userMeasurements?.age}</p>
					<span>Years</span>
				</div>
				<div className='col-start-3 row-start-1 flex  flex-col justify-center items-center'>
					<p className='font-bold text-primary-blue pb-1'>Height</p>
					<p className='font-bold text-sm md:text-lg'>{userMeasurements?.height}</p>
					<span>{userMeasurements?.unit === 'metric' ? 'cm' : 'inch'}</span>
				</div>
				<div className='col-start-2 row-start-1 flex  flex-col justify-center items-center'>
					<p className='font-bold text-primary-blue pb-1'>Weight</p>
					<p className='font-bold text-sm md:text-lg'>{userMeasurements?.weight}</p>
					<span>{userMeasurements?.unit === 'metric' ? 'kg' : 'lbs'}</span>
				</div>

				<div className='col-start-1 row-start-2  '>
					<MeasurementsCard title='Biceps' userMeasurements={userMeasurements?.biceps} unit={measurementsUnit} />
				</div>
				<div className='col-start-3 row-start-2 '>
					<MeasurementsCard title='Chest' userMeasurements={userMeasurements?.chest} unit={measurementsUnit} />
				</div>
				<div className='col-start-3 row-start-4 '>
					<MeasurementsCard title='Calves' userMeasurements={userMeasurements?.calves} unit={measurementsUnit} />
				</div>
				<div className='col-start-3 row-start-3 '>
					<MeasurementsCard title='Thigh' userMeasurements={userMeasurements?.thigh} unit={measurementsUnit} />
				</div>
				<div className='col-start-1 row-start-4 '>
					<MeasurementsCard title='Hips' userMeasurements={userMeasurements?.hips} unit={measurementsUnit} />
				</div>
				<div className='col-start-1 row-start-3 '>
					<MeasurementsCard title='Belly' userMeasurements={userMeasurements?.belly} unit={measurementsUnit} />
				</div>

				<Image
					src='/img-svg/img/FULL1.png'
					alt='Posture of the man with highlighted muscles'
					width={'200'}
					height={'300'}
					priority={true}
					className=' row-start-2 row-span-4 col-start-2'
				/>
			</div>
			<div className=' flex flex-col justify-center items-center'>
				<h2 className='font-bold text-primary-blue'>BMI</h2>
				<BMIPanel bmi={bmiValue} />
				<p
					className={`${
						bmiName === 'Underweight' || bmiName === 'Overweight' || bmiName === 'To much Mate'
							? 'font-bold text-sm md:text-lg text-primary-danger '
							: 'font-bold text-sm md:text-lg text-primary-success'
					}`}>
					{bmiValue}
				</p>
				<span
					className={`${
						bmiName === 'Underweight' || bmiName === 'Overweight' || bmiName === 'To much Mate'
							? ' text-sm md:text-lg text-primary-danger '
							: ' text-sm md:text-lg text-primary-success'
					}`}>
					{bmiName}
				</span>
			</div>

			<Link
				role='button'
				href='/userPage/measurements'
				className='btn-light text-primary-blue m-auto flex gap-1 items-center hover:drop-shadow-2xl hover:border-primary-light hover:text-primary-success transition: all .2s ease-in-out'>
				<PlusIcon /> Measurement
			</Link>
		</>
	);
}
