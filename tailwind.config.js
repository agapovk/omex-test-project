/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {},
		screens: {
			sm: '320px',
			md: '768px',
			lg: '1120px',
			xl: '1440px',
		},
		fontFamily: {
			sans: ['Gilroy', 'ui-sans-serif', 'system-ui'],
			serif: ['Nekst', 'ui-serif', 'Georgia'],
		},
	},
	plugins: [require('prettier-plugin-tailwindcss')],
};
