import { SignInButton, SignUpButton } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function TopNav() {
	const authObject = auth();

	if (authObject.userId) {
		redirect('/userPage');
		return (
			<header className='flex items-center justify-between p-4 px-2 bg-primary-dark/100 sm:px-8 '>
				<Link href='#'>
					<Image src='/img-svg/svg/logoLight.svg' alt='GymBuddy4U logo' width={'150'} height={'150'} style={{ height: 'auto', width: '100%' }} />
					<span className='sr-only'>GymBuddy4u</span>
				</Link>
				<Link href='/userPage' className='btn-light p-4'>
					Go to User Page
				</Link>
			</header>
		);
	} else {
		return (
			<header className='flex items-center justify-between p-4 px-2 bg-primary-dark/100 sm:px-8 '>
				<Link href='/userPage'>
					<Image src='/img-svg/svg/logoLight.svg' alt='GymBuddy4U logo' width={'150'} height={'150'} style={{ height: 'auto', width: '100%' }} />
					<span className='sr-only'>GymBuddy4u</span>
				</Link>
				<div className='flex gap-4 sm:gap-8'>
					<SignInButton afterSignInUrl='/userPage' mode='modal'>
						<button className='btn-light'>Log In</button>
					</SignInButton>
					<SignUpButton afterSignInUrl='/userPage' mode='modal'>
						<button className='btn-dark'>Register</button>
					</SignUpButton>
				</div>
			</header>
		);
	}
}
