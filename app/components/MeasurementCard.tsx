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
		<div className='mb-4'>
			<h2 className='font-bold text-primary-blue border border-primary-light px-4'>
				{title}
			</h2>
			<div className='flex gap-4 justify-center items-center border border-dotted border-primary-light'>
				<p className='font-bold text-lg'>{userMeasurements}</p>
				<span>{unit}</span>
			</div>
		</div>
	);
};

export default MeasurementsCard;
