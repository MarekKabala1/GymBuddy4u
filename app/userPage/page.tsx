'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

import { UserMeasurements } from '../types/UserMeasurements';

export default function UserPage(): React.ReactElement {
	const [userMeasurements, setUserMeasurements] = useState<UserMeasurements>();

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
		} else {
			console.error('No measurement data available.');
		}
	}, [getLastMeasurement, userMeasurements]);

	return (
		<article>
			<div className='flex justify-evenly w-full mb-12'>
				<div className='flex flex-col justify-center items-center'>
					<p className=' font-bold'>Age</p>
					<p>{userMeasurements?.age}</p>
					<span>Years</span>
				</div>
				<div className='flex flex-col justify-center items-center'>
					<p className='font-bold'>Height</p>
					<p>{userMeasurements?.height}</p>
					<span>cm</span>
				</div>
				<div className='flex flex-col justify-center items-center'>
					<p className='font-bold'>Weight</p>
					<p>{userMeasurements?.weight}</p>
					<span>kg</span>
				</div>
			</div>
			<div className='grid grid-cols-3 grid-rows-3  h-full overflow-y-auto place-items-center'>
				<div className='col-start-1 row-start-1 w-max h-max flex flex-col items-center gap-2 p-4 '>
					<p className='font-bold border border-primary-light px-4'>Biceps</p>
					<div className='flex gap-4 justify-center items-center'>
						<p>{userMeasurements?.biceps}</p>
						<span>cm</span>
					</div>
				</div>

				<div className='col-start-3 row-start-1 w-max h-max flex flex-col items-center gap-2 p-4 '>
					<p className='font-bold'>Chest</p>
					<div className='flex gap-4 justify-center items-center'>
						<p>{userMeasurements?.chest}</p>
						<span>cm</span>
					</div>
				</div>
				<div className='col-start-3 row-start-3 w-max h-max flex flex-col items-center gap-2 p-4 '>
					<p className='font-bold'>Calves</p>
					<div className='flex gap-4 justify-center items-center'>
						<p>{userMeasurements?.calves}</p>
						<span>cm</span>
					</div>
				</div>
				<div className='col-start-3 row-start-2 w-max h-max flex flex-col items-center gap-2 p-4 '>
					<p className='font-bold'>Thigh</p>
					<div className='flex gap-4 justify-center items-center'>
						<p>{userMeasurements?.thigh}</p>
						<span>cm</span>
					</div>
				</div>
				<div className='col-start-1 row-start-3 w-max h-max flex flex-col items-center gap-2 p-4 '>
					<p className='font-bold'>Hips</p>
					<div className='flex gap-4 justify-center items-center'>
						<p>{userMeasurements?.hips}</p>
						<span>cm</span>
					</div>
				</div>
				<div className='col-start-1 row-start-2 w-max h-max flex flex-col items-center gap-2 p-4 '>
					<p className='font-bold'>Belly</p>
					<div className='flex gap-4 justify-center items-center'>
						<p>{userMeasurements?.belly}</p>
						<span>cm</span>
					</div>
				</div>

				<Image
					src='/img-svg/img/FULL1.png'
					alt='Posture of the man with highlighted muscels'
					width={'300'}
					height={'400'}
					priority={true}
					style={{ height: 'auto', width: '300' }}
					className=' row-start-1 row-span-3 col-start-2'
				/>
			</div>
		</article>
	);
}
