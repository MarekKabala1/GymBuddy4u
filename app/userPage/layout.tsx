import SideNav from '@/components/SiedeNav';

export default async function UserPageLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className=' flex min-h-dvh  flex-col  md:flex-row md:min-h-dvh'>
			<aside className=''>
				<SideNav />
			</aside>
			<section className='flex-1  w-full bg-blue-950 bg-opacity-20 relative md:flex-1 md:flex-shrink-0'>{children}</section>
		</main>
	);
}
