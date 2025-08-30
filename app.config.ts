export default defineAppConfig({
	ui: {
		colors: {
			primary: 'yellow',
			neutral: 'gray',
		},
		container: {
			base: 'max-w-full mx-0',
		},
		icons: {
			dynamic: true,
		},
		avatar: {
			size: {
				'4xl': 'h-24 w-24 text-3xl',
				'5xl': 'h-28 w-28 text-3xl',
			},
		},
		input: {
			slots: {
				root: 'w-full',
			},
		},
		select: {
			slots: {
				root: 'w-full',
			},
		},
		selectMenu: {
			slots: {
				root: 'w-full',
			},
		},
		textarea: {
			slots: {
				root: 'w-full',
			},
		},
	},
});
