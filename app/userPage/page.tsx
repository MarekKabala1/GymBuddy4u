'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

import { ScaleLoader } from 'react-spinners';

import MeasurementsCard from '../components/MeasurementCard';

import { UserMeasurements } from '../types/types';
import { PlusIcon } from '../assets/svgIcons';
import BMIPanel from '../components/BmiBarIndicator';

export default function UserPage(): React.ReactElement {
	const [userMeasurements, setUserMeasurements] = useState<UserMeasurements>();
	const [loading, setLoading] = useState(true);
	const [bmiName, setBmiName] = useState<string>();
	const [bmiValue, setBmiValue] = useState<number>();

	const measurementsUnit = userMeasurements?.unit === 'metric' ? 'cm' : 'in';

	const getLastMeasurement = useQuery(
		api.measurements?.getLastMeasurementForUser
	);

	const calculateBMI = async (
		weight: number | undefined,
		height: number | undefined,
		unit: string | undefined
	) => {
		if (weight === undefined || height === undefined || unit === undefined) {
			console.error('Weight, height, or unit is undefined');
			return undefined;
		}

		if (unit === 'metric') {
			const bmiNumber = weight / height ** 2;
			const bmi = bmiNumber * 10000;
			return bmi.toFixed(2);
		} else {
			const inchesHeight = height * 12;
			console.log(inchesHeight);
			const bmi = (weight / (inchesHeight * inchesHeight)) * 703;
			return bmi.toFixed(2);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const measurementsData = getLastMeasurement;
				setUserMeasurements(measurementsData as UserMeasurements);
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [getLastMeasurement]);

	useEffect(() => {
		if (!userMeasurements) return;

		calculateBMI(
			userMeasurements.weight,
			userMeasurements.height,
			userMeasurements.unit
		)
			.then((bmi) => {
				const bmiNumber = parseFloat(bmi as string);
				if (isNaN(bmiNumber) || bmiNumber === undefined) {
					console.error('BMI is NaN or undefined');
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
		<article className='py-4 w-full flex flex-col gap-4 justify-center'>
			<div className='grid grid-cols-3 grid-rows-4  h-full  place-items-center'>
				<div className='col-start-1 row-start-1 flex flex-col justify-center items-center'>
					<p className='font-bold text-primary-blue '>Age</p>
					<p className='font-bold text-lg'>{userMeasurements?.age}</p>
					<span>Years</span>
				</div>
				<div className='col-start-3 row-start-1 flex  flex-col justify-center items-center'>
					<p className='font-bold text-primary-blue'>Height</p>
					<p className='font-bold text-lg'>{userMeasurements?.height}</p>
					<span>{userMeasurements?.unit === 'metric' ? 'cm' : 'inch'}</span>
				</div>
				<div className='col-start-2 row-start-1 flex  flex-col justify-center items-center'>
					<p className='font-bold text-primary-blue'>Weight</p>
					<p className='font-bold text-lg'>{userMeasurements?.weight}</p>
					<span>{userMeasurements?.unit === 'metric' ? 'kg' : 'lbs'}</span>
				</div>
				<div className='col-start-1 row-start-2 w-max h-max flex flex-col items-center '>
					<MeasurementsCard
						title='Biceps'
						userMeasurements={userMeasurements?.biceps}
						unit={measurementsUnit}
					/>
				</div>
				<div className='col-start-3 row-start-2 w-max h-max flex flex-col items-center '>
					<MeasurementsCard
						title='Chest'
						userMeasurements={userMeasurements?.chest}
						unit={measurementsUnit}
					/>
				</div>
				<div className='col-start-3 row-start-4 w-max h-max flex flex-col items-center '>
					<MeasurementsCard
						title='Calves'
						userMeasurements={userMeasurements?.calves}
						unit={measurementsUnit}
					/>
				</div>
				<div className='col-start-3 row-start-3 w-max h-max flex flex-col items-center '>
					<MeasurementsCard
						title='Thigh'
						userMeasurements={userMeasurements?.thigh}
						unit={measurementsUnit}
					/>
				</div>
				<div className='col-start-1 row-start-4 w-max h-max flex flex-col items-center '>
					<MeasurementsCard
						title='Hips'
						userMeasurements={userMeasurements?.hips}
						unit={measurementsUnit}
					/>
				</div>
				<div className='col-start-1 row-start-3 w-max h-max flex flex-col items-center '>
					<MeasurementsCard
						title='Belly'
						userMeasurements={userMeasurements?.belly}
						unit={measurementsUnit}
					/>
				</div>

				<Image
					src='/img-svg/img/FULL1.png'
					alt='Posture of the man with highlighted muscels'
					width={'300'}
					height={'400'}
					priority={true}
					style={{ height: 'auto', width: '300' }}
					className=' row-start-2 row-span-4 col-start-2'
				/>
			</div>

			<div className=' flex flex-col justify-center items-center'>
				<h2 className='font-bold text-primary-blue'>BMI</h2>
				<BMIPanel bmi={bmiValue} />
				<p
					className={`${
						bmiName === 'Underweight' ||
						bmiName === 'Overweight' ||
						bmiName === 'To much Mate'
							? 'font-bold text-lg text-primary-danger'
							: 'font-bold text-lg text-primary-success '
					}`}>
					{bmiValue}
				</p>
				<span
					className={`${
						bmiName === 'Underweight' ||
						bmiName === 'Overweight' ||
						bmiName === 'To much Mate'
							? ' text-lg text-primary-danger'
							: ' text-lg text-primary-success '
					}`}>
					{bmiName}
				</span>
			</div>

			<Link
				role='button'
				href='/userPage/measurements'
				className='btn-light text-primary-blue m-auto flex gap-1 items-center hover:text-primary-blue'>
				<PlusIcon /> Measurement
			</Link>
		</article>
	);
}
