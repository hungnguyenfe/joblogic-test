import type { Config } from 'tailwindcss'

export default {
	content: ['./index.html', './src/**/*.{js,ts,vue,html,css}'],
	theme: {
		extend: {
			maxWidth: {
				container: '700px',
				title: '300px'
			},
			width: {
				'related-combination-color': '80px'
			},
			height: {
				cover: '500px',
				'combination-color-section': '200px',
				'combination-color': '100px',
				'related-combination-color': '80px'
			}
		}
	},
	plugins: []
} satisfies Config
