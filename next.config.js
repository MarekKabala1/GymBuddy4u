/** @type {import('next').NextConfig} */
const nextConfig = {};

(module.exports = {
	async headers() {
		return [
			{
				source: '/userPage/workoutPlan',
				headers: [
					{
						key: 'Cache-Control',
						value: 'no-store',
					},
				],
			},
		];
	},
}),
	nextConfig;
