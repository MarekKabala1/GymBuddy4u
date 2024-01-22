import SideNav from '../components/SiedeNav';

export default function userPageLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className='flex min-h-dvh p-8 '>
			<aside className='border border-white w-64 overflow-auto'>
				<SideNav />
			</aside>
			<section className='border border-white w-full h-full m-auto'>
				{children}
			</section>
		</main>
	);
}
