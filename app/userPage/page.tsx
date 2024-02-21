'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

import { ScaleLoader } from 'react-spinners';

import MeasurementsCard from '../components/MeasurementCard';
import { UserMeasurements } from '../types/UserMeasurements';

export default function UserPage(): React.ReactElement {
	const [userMeasurements, setUserMeasurements] = useState<UserMeasurements>();
	const [loading, setLoading] = useState(true);

	const getLastMeasurement = useQuery(
		api.measurements?.getLastMeasurementForUser
	);
	useEffect(() => {
		if (Array.isArray(getLastMeasurement) && getLastMeasurement.length > 0) {
			setUserMeasurements(getLastMeasurement[0]);
		} else if (
			typeof getLastMeasurement === 'object' &&
			getLastMeasurement !== null
		) {
			setUserMeasurements(getLastMeasurement as UserMeasurements);
		}
		setLoading(false);
	}, [getLastMeasurement]);

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
					<p className=' font-bold text-primary-blue '>Age</p>
					<p>{userMeasurements?.age}</p>
					<span>Years</span>
				</div>
				<div className='col-start-3 row-start-1 flex  flex-col justify-center items-center'>
					<p className='font-bold text-primary-blue'>Height</p>
					<p className='font-bold text-lg'>{userMeasurements?.height}</p>
					<span>cm</span>
				</div>
				<div className='col-start-2 row-start-1 flex  flex-col justify-center items-center'>
					<p className='font-bold text-primary-blue'>Weight</p>
					<p className='font-bold text-lg'>{userMeasurements?.weight}</p>
					<span>kg</span>
				</div>
				<div className='col-start-1 row-start-2 w-max h-max flex flex-col items-center '>
					<MeasurementsCard
						title='Biceps'
						userMeasurements={userMeasurements?.biceps}
						unit='cm'
					/>
				</div>
				<div className='col-start-3 row-start-2 w-max h-max flex flex-col items-center '>
					<MeasurementsCard
						title='Chest'
						userMeasurements={userMeasurements?.chest}
						unit='cm'
					/>
				</div>
				<div className='col-start-3 row-start-4 w-max h-max flex flex-col items-center '>
					<MeasurementsCard
						title='Calves'
						userMeasurements={userMeasurements?.calves}
						unit='cm'
					/>
				</div>
				<div className='col-start-3 row-start-3 w-max h-max flex flex-col items-center '>
					<MeasurementsCard
						title='Thigh'
						userMeasurements={userMeasurements?.thigh}
						unit='cm'
					/>
				</div>
				<div className='col-start-1 row-start-4 w-max h-max flex flex-col items-center '>
					<MeasurementsCard
						title='Hips'
						userMeasurements={userMeasurements?.hips}
						unit='cm'
					/>
				</div>
				<div className='col-start-1 row-start-3 w-max h-max flex flex-col items-center '>
					<MeasurementsCard
						title='Belly'
						userMeasurements={userMeasurements?.belly}
						unit='cm'
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

			<Link
				href='/userPage/measurements'
				className='btn-light text-primary-blue m-auto flex gap-1 items-center'>
				<Plus />
				Add Measurement
			</Link>
		</article>
	);
}

function Plus(props: {}) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth='1.5'
			stroke='currentColor'
			className='w-6 h-6'>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
			/>
		</svg>
	);
}
