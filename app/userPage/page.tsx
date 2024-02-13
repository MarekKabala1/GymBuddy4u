'use client';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import Image from 'next/image';

export default function UserPage(): React.ReactElement {
	const userMeasurements = useQuery(api.measurements.getMesurmentsForUser);
	console.log(userMeasurements);

	return (
		<article className='grid grid-cols-1fr,2fr h-full gap-4'>
			{userMeasurements &&
				userMeasurements?.map((measurement) => (
					<div
						key={measurement._id}
						className='flex flex-col items-start p-4 gap-1 justify-center'>
						<p>{`Weight: ${measurement.weight} kg`}</p>
						<p>{`Height: ${measurement.height} cm`}</p>
						<p>{`Age: ${measurement.age} years`}</p>
						<p>{`Biceps: ${measurement.biceps} cm`}</p>
						<p>{`Chest: ${measurement.chest} cm `}</p>
						<p>{`Calves: ${measurement.calves} cm `}</p>
						<p>{`Thigh: ${measurement.thigh} cm `}</p>
						<p>{`Hips: ${measurement.hips} cm `}</p>
						<p>{`Belly: ${measurement.belly} cm `}</p>
					</div>
				))}
			<Image
				src='/img-svg/img/FULL1.png'
				alt='Posture of the man with highlighted muscels'
				width={'300'}
				height={'400'}
				priority={true}
				style={{ height: 'auto', width: '300' }}
			/>
		</article>
	);
}
