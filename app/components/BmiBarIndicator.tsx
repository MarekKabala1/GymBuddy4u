import React, { useEffect, useState } from 'react';

const BMIPanel: React.FC<{ bmi: number | undefined }> = ({ bmi }) => {
	const getColor = (bmi: number | undefined) => {
		if (bmi === undefined) {
			return 'gray';
		}
		if (bmi < 18.5) {
			return 'yellow';
		} else if (bmi >= 18.5 && bmi <= 24.9) {
			return 'green';
		} else {
			return 'red';
		}
	};

	const getProgressBarPercentage = (bmi: number) => {
		if (bmi < 0) {
			return '0%';
		} else if (bmi > 40) {
			return '100%';
		} else {
			return `${(bmi / 40) * 100}%`;
		}
	};

	const [barColor, setBarColor] = useState('yellow');

	useEffect(() => {
		setBarColor(getColor(bmi));
	}, [bmi]);

	return (
		<div className='m-1 flex justify-center items-center relative'>
			<div
				className={` relative top-0 left-0 w-[230px] aspect-[2/1] rounded-[50%] box-border border-[25px] border-b-0 border-primary-blue
					 `}
				//TODO:Adjust border color to BMI%
				style={{
					borderRadius: '50% / 100% 100% 0 0',
					animation: 'progress 2s 0.5s forwards',
				}}>
				<div
					style={{
						content: '""',
						position: 'absolute',
						top: '-25px',
						left: '-25px',
						width: '230px',
						height: '115px',
						borderRadius: '50% / 100% 100% 0 0',
						mask: 'radial-gradient(at 50% 100%, white 55%, transparent 55.5%)',
						maskMode: 'alpha',
						WebkitMask: 'radial-gradient(at 50% 100%, #0000 55%, #000 55.5%)',
						background: `conic-gradient(from 0.75turn at 50% 100%, ${barColor} calc(var(--percentage) * 1% / 2), transparent calc( var(--percentage) * 1% / 2 + 0.1%))`,
					}}>
					<style>
						{`
                @property --percentage {
									syntax: '<number>';
									inherits: true;
									initial-value: 0;
								}

                @keyframes progress {
									0% { --percentage:0 }
									100% { --percentage:${parseFloat(getProgressBarPercentage(bmi as number))}
								}
            `}
					</style>
				</div>
			</div>
		</div>
	);
};

export default BMIPanel;
