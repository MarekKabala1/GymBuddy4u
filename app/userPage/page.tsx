import { UserButton } from '@clerk/nextjs';

export default function UserPage() {
	return (
		<div>
			<h1>User Page</h1>
			<UserButton afterSignOutUrl='/' />
		</div>
	);
}
