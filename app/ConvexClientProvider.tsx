'use client';

import { PropsWithChildren } from 'react';
import { ConvexReactClient } from 'convex/react';
import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { ConvexProviderWithClerk } from 'convex/react-clerk';

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!convexUrl || !clerkPublishableKey) {
	throw new Error('Missing environment variables');
}

const convex = new ConvexReactClient(convexUrl! as string);
const AFTER_SIGN_IN_URL = '/userPage';
const AFTER_SIGN_UP_URL = '/userPage';

export function Providers({ children }: PropsWithChildren) {
	return (
		<ClerkProvider
			publishableKey={clerkPublishableKey}
			afterSignInUrl={AFTER_SIGN_IN_URL}
			afterSignUpUrl={AFTER_SIGN_UP_URL}>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				{children}
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
}
