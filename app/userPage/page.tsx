'use server';
import { preloadQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';

import { Dashboard } from './UserDashboard';

export default async function UserPage() {
	if (!api.measurements || !api.measurements.getLastMeasurementForUser) {
		console.error('API method is undefined');
		return;
	}

	const getLastMeasurement = await preloadQuery(api.measurements?.getLastMeasurementForUser, {});

	return (
		<article className='py-4 w-full  flex flex-col gap-4 justify-center'>
			<Dashboard getLastMeasurement={getLastMeasurement} />
		</article>
	);
}
