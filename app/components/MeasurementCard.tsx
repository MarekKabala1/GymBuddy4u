import React from 'react';
interface MeasurementsCardProps {
	title: string;
	userMeasurements: number | undefined;
	unit: string;
}

const MeasurementsCard: React.FC<MeasurementsCardProps> = ({
	title,
	userMeasurements,
	unit,
}) => {
	return (
		<>
			<p className='font-bold text-primary-blue border border-primary-light px-4'>
				{title}
			</p>
			<div className='flex gap-4 justify-center items-center'>
				<p className='font-bold text-lg'>{userMeasurements}</p>
				<span>{unit}</span>
			</div>
		</>
	);
};

export default MeasurementsCard;
