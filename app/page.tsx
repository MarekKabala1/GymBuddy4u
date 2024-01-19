import { SignUpButton } from '@clerk/nextjs';

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<div className='h-screen'>
				<SignUpButton afterSignInUrl='/userPage' />
			</div>
		</main>
	);
}
