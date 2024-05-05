'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { UserButton, SignOutButton, useUser } from '@clerk/nextjs';
import {
	TopCloseIcon,
	MenuIcon,
	UserIcon,
	Ruler,
	ActivityIcon,
	AppleIcon,
	ListTodoIcon,
	BarChartIcon,
	CameraIcon,
	AwardIcon,
	LogOut,
} from '../app/assets/svgIcons';

interface NavLinkProps {
	href: string;
	label: string;
	icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	closeSideNav: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, icon: Icon, closeSideNav }) => {
	const pathname = usePathname();
	const isActive = pathname === href;

	const inActiveLink = 'flex items-center gap-3 px-4 py-3 tracking-widest';
	const activeLink = `${inActiveLink} text-primary-light bg-blue-950 bg-opacity-20 rounded-l-md`;

	return (
		<Link href={href} className={isActive ? activeLink : inActiveLink} onClick={closeSideNav}>
			{Icon && <Icon className='text-primary-blue' />}
			<span>{label}</span>
		</Link>
	);
};

export default function SideNav(): React.ReactElement {
	const [isOpen, setIsOpen] = useState(false);

	const { user } = useUser();
	const userEmail = user?.emailAddresses[0].emailAddress;
	const userFirstName = user?.firstName;

	const closeSideNav = () => {
		setIsOpen(false);
	};

	return (
		<>
			<header className='flex p-4 items-center justify-between bg-primary-dark/100 md:block'>
				<button onClick={() => setIsOpen((prev) => !prev)} className='md:hidden'>
					{isOpen ? <TopCloseIcon /> : <MenuIcon />}
					<span className='sr-only'>Toggle navigation menu</span>
				</button>
				<Link href={'/userPage'} className='flex gap-1 items-center  md:hidden'>
					<p className='font-calligraphic text-sm tracking-wider'>GymBuddy4U</p>
					<Image src='/img-svg/svg/logoLight.svg' alt='GymBuddy4U logo' width={'50'} height={'50'} />
				</Link>
				<div className='flex  items-center gap-4 md:pl-4  '>
					<UserButton afterSignOutUrl='/' />
					<h2 className='text-xl font-semibold hidden md:block'>{userFirstName}</h2>
				</div>
				<p className='text-xs py-4 hidden lg:block '>{userEmail}</p>
			</header>
			<nav
				className={` -translate-x-full absolute z-[9999] mt-6 transition-all duration-300 ease-out md:relative md:translate-x-0 md:block'
		${
			isOpen
				? 'inset-x-0 top-11 bottom-0 pr-4 translate-x-0 block absolute bg-primary-dark bg-opacity-90'
				: ' -translate-x-full hidden  md:translate-x-0 md:block '
		}`}>
				<NavLink href='/userPage' label='User Page' icon={UserIcon} closeSideNav={closeSideNav} />
				<NavLink href='/userPage/measurements' label='Measurements' icon={Ruler} closeSideNav={closeSideNav} />
				<NavLink href='/userPage/workoutPlan' label='Workout Plan' icon={ActivityIcon} closeSideNav={closeSideNav} />
				<NavLink href='/userPage/nutrition' label='Nutritional Guidance' icon={AppleIcon} closeSideNav={closeSideNav} />
				<NavLink href='/userPage/taskList' label='Task List' icon={ListTodoIcon} closeSideNav={closeSideNav} />
				<NavLink href='/userPage/charts' label='Performance Stats' icon={BarChartIcon} closeSideNav={closeSideNav} />
				<NavLink href='/userPage/photos' label='Progress Photos' icon={CameraIcon} closeSideNav={closeSideNav} />
				<NavLink href='/userPage/achievements' label='Achievements' icon={AwardIcon} closeSideNav={closeSideNav} />
				<div className='flex items-center gap-3 px-4 pt-12 pointer-events-auto'>
					<LogOut />
					<SignOutButton redirectUrl='/'>Log Out</SignOutButton>
				</div>
			</nav>
		</>
	);
}
