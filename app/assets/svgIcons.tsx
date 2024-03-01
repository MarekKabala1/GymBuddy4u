import { IconProps } from '../types/types';

export function UserIcon({ className, ...props }: IconProps) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
			<circle cx='12' cy='7' r='4' />
		</svg>
	);
}

export function Ruler({ className, ...props }: IconProps) {
	return (
		<svg
			{...props}
			width='24'
			height='24'
			version='1.1'
			fill='none'
			stroke='currentColor'
			strokeWidth='3'
			viewBox='0 0 8.2 8.2'
			xmlns='http://www.w3.org/2000/svg'>
			<g transform='matrix(.088 0 0 .088 .064 .17)' strokeLinecap='round'>
				<path d='m13 90c-0.26 0-0.51-0.098-0.71-0.29l-12-12c-0.39-0.39-0.39-1 0-1.4l76-76c0.39-0.39 1-0.39 1.4 0l12 12c0.39 0.39 0.39 1 0 1.4l-76 76c-0.2 0.2-0.45 0.29-0.71 0.29zm-11-13 11 11 74-74-11-11z' />
				<path d='m44 45c-0.26 0-0.51-0.098-0.71-0.29l-4.9-4.9c-0.39-0.39-0.39-1 0-1.4s1-0.39 1.4 0l4.9 4.9c0.39 0.39 0.39 1 0 1.4-0.2 0.2-0.45 0.29-0.71 0.29z' />
				<path d='m25 64c-0.26 0-0.51-0.098-0.71-0.29l-4.9-4.9c-0.39-0.39-0.39-1 0-1.4s1-0.39 1.4 0l4.9 4.9c0.39 0.39 0.39 1 0 1.4-0.2 0.2-0.45 0.29-0.71 0.29z' />
				<path d='m63 26c-0.26 0-0.51-0.098-0.71-0.29l-4.9-4.9c-0.39-0.39-0.39-1 0-1.4 0.39-0.39 1-0.39 1.4 0l4.9 4.9c0.39 0.39 0.39 1 0 1.4-0.2 0.2-0.45 0.29-0.71 0.29z' />
				<path d='m33 53c-0.26 0-0.51-0.098-0.71-0.29l-3.7-3.7c-0.39-0.39-0.39-1 0-1.4s1-0.39 1.4 0l3.7 3.7c0.39 0.39 0.39 1 0 1.4-0.2 0.2-0.45 0.29-0.71 0.29z' />
				<path d='m52 34c-0.26 0-0.51-0.098-0.71-0.29l-3.7-3.7c-0.39-0.39-0.39-1 0-1.4s1-0.39 1.4 0l3.7 3.7c0.39 0.39 0.39 1 0 1.4-0.2 0.2-0.45 0.29-0.71 0.29z' />
				<path d='m15 72c-0.26 0-0.51-0.098-0.71-0.29l-3.7-3.7c-0.39-0.39-0.39-1 0-1.4s1-0.39 1.4 0l3.7 3.7c0.39 0.39 0.39 1 0 1.4-0.2 0.2-0.45 0.29-0.71 0.29z' />
				<path d='m71 16c-0.26 0-0.51-0.098-0.71-0.29l-3.7-3.7c-0.39-0.39-0.39-1 0-1.4s1-0.39 1.4 0l3.7 3.7c0.39 0.39 0.39 1 0 1.4-0.2 0.2-0.45 0.29-0.71 0.29z' />
				<path d='m13 84c-0.86 0-1.7-0.32-2.4-0.98-1.3-1.3-1.3-3.4 0-4.7 1.3-1.3 3.5-1.3 4.7 0 0.63 0.63 0.98 1.5 0.98 2.4s-0.35 1.7-0.98 2.4c-0.65 0.65-1.5 0.98-2.4 0.98zm1.7-1.7h0.01zm-1.7-3c-0.36 0-0.7 0.14-0.95 0.39-0.52 0.52-0.52 1.4 0 1.9s1.4 0.52 1.9 0c0.52-0.52 0.52-1.4 0-1.9-0.25-0.25-0.59-0.39-0.95-0.39z' />
			</g>
		</svg>
	);
}

export function AppleIcon({ className, ...props }: IconProps) {
	return (
		<svg
			{...props}
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
export function ActivityIcon({ className, ...props }: IconProps) {
	return (
		<svg
			{...props}
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

export function AwardIcon({ className, ...props }: IconProps) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
		</svg>
	);
}

export function BarChartIcon({ className, ...props }: IconProps) {
	return (
		<svg
			{...props}
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

export function CameraIcon({ className, ...props }: IconProps) {
	return (
		<svg
			{...props}
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

export function ListTodoIcon({ className, ...props }: IconProps) {
	return (
		<svg
			{...props}
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

export function LogOut({ className, ...props }: IconProps) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth='1.5'
			stroke='currentColor'
			className={`w-6 h-6 ${className || ''}`}>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75'
			/>
		</svg>
	);
}
export function MenuIcon({ className, ...props }: IconProps) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<line x1='4' x2='20' y1='12' y2='12' />
			<line x1='4' x2='20' y1='6' y2='6' />
			<line x1='4' x2='20' y1='18' y2='18' />
		</svg>
	);
}

export function TopCloseIcon({ className, ...props }: IconProps) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth='1.5'
			stroke='currentColor'
			className={`w-6 h-6 ${className || ''}`}>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M6 18 18 6M6 6l12 12'
			/>
		</svg>
	);
}
export function TrashIcon({ className, ...props }: IconProps) {
	return (
		<svg
			{...props}
			className={` ${className || ''}`}
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth='1.5'
			stroke='currentColor'>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
			/>
		</svg>
	);
}
