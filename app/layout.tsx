import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './ConvexClientProvider';

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
	return (
		<html lang='en'>
			<body className='m-auto min-h-screen bg-primary-dark text-primary-light'>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
