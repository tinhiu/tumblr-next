import Image from 'next/image';

import logo from '../../public/tumblr-logo.png'
import github from '../../public/github-mark.svg'
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { TumblrBlog } from '@/server/tumblr';

type Props = {
	setData: Dispatch<SetStateAction<TumblrBlog | null>>
	setBlogName: Dispatch<SetStateAction<string>>
}
export default function Navbar(props: Props) {
	const handleClickLogo = () => {
		props.setData(null);
		props.setBlogName('');
	}
	return (
		<>
			{<div className="w-full">
				<span className="absolute -z-50  w-full bg-gradient-radial rounded-sm from-indigo-950 to-neutral-300 opacity-70 aspect-square blur-3xl filter md:bottom-[calc(100%-600px)]"
				/>
			</div>}
			<header className="sticky px-6 py-6 md:py-4 top-0 z-50 backdrop-blur bg-transparent md:backdrop-blur-none">
				<nav className="flex items-center justify-between space-x-3 ">
					<button onClick={handleClickLogo}>
						<Image src={logo} alt='logo' style={{ width: '26px', height: '26px' }} />
					</button>
					<Link href={'https://github.com/tinhiu/tumblr-next'} target='_blank'>
						<Image src={github} alt='github' style={{ width: '26px', height: '26px' }} />
					</Link>
				</nav>
			</header>
		</>
	);
}
