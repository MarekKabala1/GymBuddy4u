'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className='flex  h-[calc(100vh-82px)]  flex-col items-center justify-center p-8 '>
			<div className=' h-max flex  flex-col items-center justify-center gap-4   bg-primary-dark p-8 rounded-md'>
				<h2 className='text-3xl text-primary-danger'>Something went wrong!</h2>

				<p className='text-primary-light text-xs bg-primary-danger bg-opacity-20 p-4 border border-primary-danger rounded-md w-full'>{error.message}</p>
				<button
					className='btn-light'
					onClick={
						// Attempt to recover by trying to re-render the segment
						() => reset()
					}>
					Try again
				</button>
			</div>
		</div>
	);
}
