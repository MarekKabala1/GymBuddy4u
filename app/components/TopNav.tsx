import { SignInButton, SignUpButton } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';

export default function TopNav() {
	return (
		<header className='flex items-center justify-between p-4 px-8 bg-primary-dark/100 '>
			<Link href='#'>
				<Image
					src='/img-svg/svg/logoLight.svg'
					alt='GymBuddy4U logo'
					width={150}
					height={150}
				/>
				<span className='sr-only'>GymBuddy4u</span>
			</Link>
			<div className='flex gap-8 '>
				<SignInButton afterSignInUrl='/userPage' mode='modal'>
					<button className='btn-light'>Sign In</button>
				</SignInButton>
				<SignUpButton afterSignInUrl='/userPage' mode='modal'>
					<button className='btn-dark'>Sign Up</button>
				</SignUpButton>
			</div>
		</header>
	);
}
