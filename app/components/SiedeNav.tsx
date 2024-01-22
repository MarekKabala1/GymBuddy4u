import React from 'react';
import { UserButton, SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function SideNav(): React.ReactElement {
	return (
		<>
			<div className='flex  items-center px-4  pt-6 gap-4'>
				<UserButton afterSignOutUrl='/' />
				<h2 className='text-xl font-semibold '>User Name</h2>
			</div>
			<p className='text-sm px-4'>username@example.com</p>
			<nav className='mt-6'>
				<Link className='flex items-center gap-2 px-4 py-2' href='#'>
					<span>Custom Workout Plan</span>
				</Link>
				<Link className='flex items-center gap-2 px-4 py-2' href='#'>
					<span>Body Measurements</span>
				</Link>
				<Link className='flex items-center gap-2 px-4 py-2' href='#'>
					<span>Nutritional Guidance</span>
				</Link>
				<Link className='flex items-center gap-2 px-4 py-2' href='#'>
					<span>Task List</span>
				</Link>
				<Link className='flex items-center gap-2 px-4 py-2' href='#'>
					<span>Performance Stats</span>
				</Link>
				<Link className='flex items-center gap-2 px-4 py-2' href='#'>
					<span>Progress Photos</span>
				</Link>
				<Link className='flex items-center gap-2 px-4 py-2' href='#'>
					<span>Achievements</span>
				</Link>
				<div className='flex items-center gap-2 px-4 py-2 pointer-events-auto'>
					<SignOutButton>Log Out</SignOutButton>
				</div>
			</nav>
		</>
	);
}
