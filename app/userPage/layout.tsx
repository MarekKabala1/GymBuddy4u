'use client';
import SideNav from '../components/SiedeNav';

export default function UserPageLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className='flex min-h-screen p-4'>
			<aside className=' overflow-auto'>
				<SideNav />
			</aside>
			<section className='flex-1 overflow-auto'>{children}</section>
		</main>
	);
}
