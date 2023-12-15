import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				noise: "url('/noise.svg')",
				arrow: "url('/arrow-next.svg')",
			},
			animation: {
				'fade-in-bottom': 'fade-in-bottom 1s ease-out both',
				'fade-in': 'fade-in .5s ease-out both',
			},
			keyframes: {
				'fade-in-bottom': {
					from: {
						transform: 'translateY(2rem)',
						opacity: '0',
					},
					to: {
						transform: 'translateY(0)',
						opacity: '1',
					},
				},
				'fade-in': {
					from: {
						opacity: '0.5',
					},
					to: {
						opacity: '1',
					},
				},
			},
		},
	},
	plugins: [],
};
export default config;
