'use server';
import SideNav from '@/components/SiedeNav';
import { Suspense } from 'react';
import Loading from './loading';

export default async function UserPageLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className=' flex flex-col h-full overflow-auto  md:flex-row'>
			<aside className='min-w-[250px] sm:h-[80px]'>
				<SideNav />
			</aside>
			<section className='flex-1  w-full bg-blue-950 bg-opacity-20 relative overflow-auto md:flex-1 md:flex-shrink-0 h-[calc(100vh-80px)] sm:h-screen '>
				<Suspense fallback={<Loading />}>{children}</Suspense>
			</section>
		</main>
	);
}
