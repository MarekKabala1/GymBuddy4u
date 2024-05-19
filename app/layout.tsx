import './globals.css';
import type { Metadata } from 'next';
import { Irish_Grover } from 'next/font/google';
import { Providers } from './ConvexClientProvider';
import { StrictMode } from 'react';

// const inter = Inter({ subsets: ['latin'] });
const IrishGrove = Irish_Grover({
	subsets: ['latin'],
	weight: '400',
	variable: '--font-irishGrove',
});

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<StrictMode>
				<body className={`${IrishGrove.variable} font-sans m-auto  bg-primary-dark text-primary-light overflow-auto `}>
					<Providers>{children}</Providers>
				</body>
			</StrictMode>
		</html>
	);
}
