import { UserMeasurements } from '@/components/UserMeasurement';
import { api } from '@/convex/_generated/api';
import { preloadQuery } from 'convex/nextjs';

export default async function Measurements() {
	if (!api.measurements || !api.measurements.getAllMesurmentsForUser) {
		console.error('API method is undefined');
		return;
	}
	const userMeasurements = await preloadQuery(api.measurements?.getAllMesurmentsForUser);
	if (!userMeasurements) return null;
	return (
		<article className='flex flex-col items-center w-full p-4 gap-8  overflow-auto '>
			<UserMeasurements userMeasurements={userMeasurements} />
		</article>
	);
}
