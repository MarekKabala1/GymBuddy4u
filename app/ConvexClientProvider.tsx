'use client';

import { PropsWithChildren } from 'react';
import { ConvexReactClient } from 'convex/react';
import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { ConvexProviderWithClerk } from 'convex/react-clerk';

const convex = new ConvexReactClient(
	process.env.NEXT_PUBLIC_CONVEX_URL! as string
);

export function Providers({ children }: PropsWithChildren) {
	return (
		<ClerkProvider
			publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
			afterSignInUrl='/userPage'
			afterSignUpUrl='/userPage'>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				{children}
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
}
