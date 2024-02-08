import Image from 'next/image';

export default function UserPage(): React.ReactElement {
	return (
		<article className='grid grid-cols-1fr,2fr h-full gap-4'>
			<Image
				src='/img-svg/img/FULL1.png'
				alt='Posture of the man with highlighted muscels'
				width={'300'}
				height={'400'}
				priority={true}
				style={{ height: 'auto', width: '300' }}
			/>
		</article>
	);
}
