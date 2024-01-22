import { SignUpButton } from '@clerk/nextjs';
import TopNav from './components/TopNav';

export default function Home() {
	return (
		<>
			<TopNav />
			<main className='min-h-screen w-[800px] m-auto flex flex-col items-center  gap-8 px-16 py-16 bg-primary-dark/100 text-primary-light leading-8 '>
				<section className=' flex flex-col items-center justify-center gap-8'>
					<h1 className='text-5xl font-bold text-center'>
						Unlock Your Ultimate Fitness Journey
					</h1>
					<p className='text-xl'>
						Welcome to Gymbuddy4U, where your health and wellness take center
						stage. Transform your fitness goals into reality with our powerful
						suite of tools designed for enthusiasts, beginners, and everyone in
						between.
					</p>
				</section>
				<section>
					<ul>
						<li>
							<span className='icon'>🏋️‍♂️</span> Track every rep, set, and
							milestone in your fitness journey.
						</li>
						<li>
							<span className='icon'>🍏</span> Monitor your nutrition with
							precision and achieve your dietary goals.
						</li>
						<li>
							<span className='icon'>📈</span> Visualize your progress with
							insightful charts and analytics.
						</li>
						<li>
							<span className='icon'>📋</span> Stay organized and focused with
							our dynamic to-do list feature.
						</li>
						<li>
							<span className='icon'>📸</span> Capture your fitness
							transformation with progress photos.
						</li>
					</ul>
				</section>
				<section className=' flex flex-col items-center justify-center gap-8'>
					<h2 className='text-4xl font-bold text-center'>
						Why Choose GymBuddy4U
					</h2>
					<p className='text-xl'>
						Join a community driven by passion and commitment to a healthier
						lifestyle. Our user-friendly interface, backed by cutting-edge
						technology, ensures a seamless experience on your fitness journey.
						Ready to break a sweat and break the limits? Let&apos;s get started
						together!
					</p>
				</section>
				<footer>
					All Rights Reserved <span>GymBuddy4U 2023</span>. Desaigne and
					Developed by{' '}
					<a href='mailto:mkwebdeveloper69@gmail.com'>mkwebdeveloper69</a>
				</footer>
			</main>
		</>
	);
}
