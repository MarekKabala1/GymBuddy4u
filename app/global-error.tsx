'use client';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return (
		<html>
			<body>
				<div className='flex  h-[calc(100vh-82px)] flex-col items-center justify-center'>
					<div className=' h-max w-max flex flex-col items-center justify-center gap-4  bg-primary-dark p-8 rounded-md'>
						<h2 className='text-3xl text-primary-danger'>Something went wrong!</h2>

						<p className='text-primary-light text-xs bg-primary-danger bg-opacity-20 p-4 border border-primary-danger rounded-md'>{error.message}</p>
						<button className='btn-light' onClick={() => reset()}>
							Try again
						</button>
					</div>
				</div>
			</body>
		</html>
	);
}
