import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './ConvexClientProvider';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'GymBuddy4U',
	description: 'Best Fitness Trainer',
	icons: [
		{
			url: '/favicon.ico',
			rel: 'icon',
		},
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { userId }: { userId: string | null } = auth();

	return (
		<html lang='en'>
			<body className='m-auto min-h-screen bg-primary-dark text-primary-light'>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
