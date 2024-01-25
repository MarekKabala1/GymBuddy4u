'use client';

import React from 'react';
import { UserButton, SignOutButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SideNav(): React.ReactElement {
	const inActiveLink = ' flex items-center gap-3 px-4 py-3 tracking-widest';
	const activeLink = `${inActiveLink} font-bold text-primary-light bg-blue-950 bg-opacity-20 rounded-l-md `;

	const { user } = useUser();
	const userEmail = user?.emailAddresses[0].emailAddress;
	const userFirstName = user?.firstName;

	const pathname = usePathname();

	return (
		<>
			<div className='flex  items-center px-4 pt-6 gap-4  '>
				<UserButton afterSignOutUrl='/' />
				<h2 className='text-xl font-semibold '>{userFirstName}</h2>
			</div>
			<p className='text-xs px-4'>{userEmail}</p>
			<nav className='mt-6'>
				<Link
					className={
						pathname.includes('measurements') ? activeLink : inActiveLink
					}
					href='measurements'>
					<Ruler />
					<span>Measurements</span>
				</Link>
				<Link
					className={
						pathname.includes('workoutPlan') ? activeLink : inActiveLink
					}
					href='workoutPlan'>
					<ActivityIcon />
					<span>Workout Plan</span>
				</Link>
				<Link
					className={pathname.includes('nutrition') ? activeLink : inActiveLink}
					href='nutrition'>
					<AppleIcon />
					<span>Nutritional Guidance</span>
				</Link>
				<Link
					className={pathname.includes('taskList') ? activeLink : inActiveLink}
					href='taskList'>
					<ListTodoIcon />
					<span>Task List</span>
				</Link>
				<Link
					className={pathname.includes('charts') ? activeLink : inActiveLink}
					href='charts'>
					<BarChartIcon />
					<span>Performance Stats</span>
				</Link>
				<Link
					className={pathname.includes('photos') ? activeLink : inActiveLink}
					href='photos'>
					<CameraIcon />
					<span>Progress Photos</span>
				</Link>
				<Link
					className={
						pathname.includes('achievements') ? activeLink : inActiveLink
					}
					href='achievements'>
					<AwardIcon />
					<span>Achievements</span>
				</Link>
				<div className='flex items-center gap-3 px-4 pt-12 pointer-events-auto'>
					<LogOut />
					<SignOutButton>Log Out</SignOutButton>
				</div>
			</nav>
		</>
	);
}

export function Ruler() {
	return (
		<svg
			width='31'
			height='31'
			version='1.1'
			viewBox='0 0 8.2 8.2'
			xmlns='http://www.w3.org/2000/svg'>
			<g
				transform='matrix(.088 0 0 .088 .064 .17)'
				strokeLinecap='round'
				style={{ fill: 'none' }}>
				<path
					d='m13 90c-0.26 0-0.51-0.098-0.71-0.29l-12-12c-0.39-0.39-0.39-1 0-1.4l76-76c0.39-0.39 1-0.39 1.4 0l12 12c0.39 0.39 0.39 1 0 1.4l-76 76c-0.2 0.2-0.45 0.29-0.71 0.29zm-11-13 11 11 74-74-11-11z'
					style={{ fill: '#E5E1E6' }}
				/>
				<path
					d='m44 45c-0.26 0-0.51-0.098-0.71-0.29l-4.9-4.9c-0.39-0.39-0.39-1 0-1.4s1-0.39 1.4 0l4.9 4.9c0.39 0.39 0.39 1 0 1.4-0.2 0.2-0.45 0.29-0.71 0.29z'
					style={{ fill: '#E5E1E6' }}
				/>
				<path
					d='m25 64c-0.26 0-0.51-0.098-0.71-0.29l-4.9-4.9c-0.39-0.39-0.39-1 0-1.4s1-0.39 1.4 0l4.9 4.9c0.39 0.39 0.39 1 0 1.4-0.2 0.2-0.45 0.29-0.71 0.29z'
					style={{ fill: '#E5E1E6' }}
				/>
				<path
					d='m63 26c-0.26 0-0.51-0.098-0.71-0.29l-4.9-4.9c-0.39-0.39-0.39-1 0-1.4 0.39-0.39 1-0.39 1.4 0l4.9 4.9c0.39 0.39 0.39 1 0 1.4-0.2 0.2-0.45 0.29-0.71 0.29z'
					style={{ fill: '#E5E1E6' }}
				/>
				<path
					d='m33 53c-0.26 0-0.51-0.098-0.71-0.29l-3.7-3.7c-0.39-0.39-0.39-1 0-1.4s1-0.39 1.4 0l3.7 3.7c0.39 0.39 0.39 1 0 1.4-0.2 0.2-0.45 0.29-0.71 0.29z'
					style={{ fill: '#E5E1E6' }}
				/>
				<path
					d='m52 34c-0.26 0-0.51-0.098-0.71-0.29l-3.7-3.7c-0.39-0.39-0.39-1 0-1.4s1-0.39 1.4 0l3.7 3.7c0.39 0.39 0.39 1 0 1.4-0.2 0.2-0.45 0.29-0.71 0.29z'
					style={{ fill: '#E5E1E6' }}
				/>
				<path
					d='m15 72c-0.26 0-0.51-0.098-0.71-0.29l-3.7-3.7c-0.39-0.39-0.39-1 0-1.4s1-0.39 1.4 0l3.7 3.7c0.39 0.39 0.39 1 0 1.4-0.2 0.2-0.45 0.29-0.71 0.29z'
					style={{ fill: '#E5E1E6' }}
				/>
				<path
					d='m71 16c-0.26 0-0.51-0.098-0.71-0.29l-3.7-3.7c-0.39-0.39-0.39-1 0-1.4s1-0.39 1.4 0l3.7 3.7c0.39 0.39 0.39 1 0 1.4-0.2 0.2-0.45 0.29-0.71 0.29z'
					style={{ fill: '#E5E1E6' }}
				/>
				<path
					d='m13 84c-0.86 0-1.7-0.32-2.4-0.98-1.3-1.3-1.3-3.4 0-4.7 1.3-1.3 3.5-1.3 4.7 0 0.63 0.63 0.98 1.5 0.98 2.4s-0.35 1.7-0.98 2.4c-0.65 0.65-1.5 0.98-2.4 0.98zm1.7-1.7h0.01zm-1.7-3c-0.36 0-0.7 0.14-0.95 0.39-0.52 0.52-0.52 1.4 0 1.9s1.4 0.52 1.9 0c0.52-0.52 0.52-1.4 0-1.9-0.25-0.25-0.59-0.39-0.95-0.39z'
					style={{ fill: '#E5E1E6' }}
				/>
			</g>
		</svg>
	);
}

function AppleIcon() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<path d='M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z' />
			<path d='M10 2c1 .5 2 2 2 5' />
		</svg>
	);
}
function ActivityIcon() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<path d='M22 12h-4l-3 9L9 3l-3 9H2' />
		</svg>
	);
}

function AwardIcon() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<circle cx='12' cy='8' r='6' />
			<path d='M15.477 12.89 17 22l-5-3-5 3 1.523-9.11' />
		</svg>
	);
}

function BarChartIcon() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<line x1='12' x2='12' y1='20' y2='10' />
			<line x1='18' x2='18' y1='20' y2='4' />
			<line x1='6' x2='6' y1='20' y2='16' />
		</svg>
	);
}

function CameraIcon() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<path d='M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z' />
			<circle cx='12' cy='13' r='3' />
		</svg>
	);
}

function ListTodoIcon() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<rect x='3' y='5' width='6' height='6' rx='1' />
			<path d='m3 17 2 2 4-4' />
			<path d='M13 6h8' />
			<path d='M13 12h8' />
			<path d='M13 18h8' />
		</svg>
	);
}

function LogOut() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth='1.5'
			stroke='currentColor'
			className='w-6 h-6'>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75'
			/>
		</svg>
	);
}
