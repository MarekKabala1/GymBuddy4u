import React from 'react';
interface MeasurementsCardProps {
	title: string;
	userMeasurements: number | undefined;
	unit: string;
}

const MeasurementsCard: React.FC<MeasurementsCardProps> = ({ title, userMeasurements, unit }) => {
	return (
		<div className='mb-4'>
			<h2 className='font-bold text-primary-blue border border-primary-light text-sm md:text-lg px-4 mb-4'>{title}</h2>
			<div className='flex gap-4 justify-center items-center '>
				<p className='font-bold text-sm md:text-lg'>{userMeasurements}</p>
				<span>{unit}</span>
			</div>
		</div>
	);
};

export default MeasurementsCard;
