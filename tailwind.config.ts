import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: {
					light: '#B3D9FF', // Light Sky Blue
					DEFAULT: '#7FAFFF', // Soft Baby Blue
					dark: '#4C7BDF' // Slate Blue
				},
				secondary: {
					light: '#ffb4e1', // Lightened Soft Pink
					DEFAULT: '#F1A7DB', // Lighter Lavender Pink
					dark: '#dc83a5' // Lighter Dusty Lavender
				},
				accent: {
					light: '#FF99E6', // Lightened Light Lilac
					DEFAULT: '#FF8BA0', // Lighter Blush Pink
					dark: '#D1668B' // Stronger Dusty Rose
				},
				background: {
					light: '#f4effd', // Brighter Very Light Lilac
					DEFAULT: '#F0D3D2', // Warm Off-White with more contrast
					dark: '#E2C6B2' // Richer Beige
				},
				neutral: {
					light: '#EAEAEA', // Slightly darker Soft Gray
					DEFAULT: '#CFCFCF', // Stronger Muted Gray
					dark: '#AFAFAF' // Darker Mid Gray
				},
				highlight: {
					softYellow: '#FFE1A1', // More vibrant Soft Butter Yellow
					mintGreen: '#d9ffe2', // Brighter Light Mint Green
					peach: '#FFC4B4' // More vivid Soft Peach
				}
			},
			fontFamily: {
				sans: ['"Poppins"', 'sans-serif'],
				display: ['"Quicksand"', 'sans-serif'], // Rounded font for headers
				body: ['"Nunito"', 'sans-serif'] // Clean font for body text
			},
			boxShadow: {
				pastel: '0 2px 10px rgba(160, 196, 255, 0.5)', // Slightly stronger pastel shadow
				softPink: '0 2px 8px rgba(255, 203, 242, 0.5)',
				softBlue: '0 4px 10px rgba(189, 224, 254, 0.5)'
			}
		}
	},

	plugins: [typography, forms]
} satisfies Config;
