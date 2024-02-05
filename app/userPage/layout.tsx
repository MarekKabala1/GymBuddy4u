import SideNav from '../components/SiedeNav';

export default function UserPageLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className=' flex min-h-dvh p-4 flex-col gap-4 md:flex-row md:min-h-dvh'>
			<aside className=''>
				<SideNav />
			</aside>
			<section className=' flex-1 w-full  bg-blue-950 bg-opacity-20 max-h-dvh md:flex-1 md:flex-shrink-0'>
				{children}
			</section>
		</main>
	);
}
