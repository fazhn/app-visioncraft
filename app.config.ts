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
		notifications: {
			position: 'top-0 bottom-auto'
		},
		notification: {
			background: 'bg-gray-800 dark:bg-gray-800',
			ring: 'ring-1 ring-gray-700 dark:ring-gray-700',
			title: 'text-gray-100 dark:text-gray-100',
			description: 'text-gray-300 dark:text-gray-300',
			icon: {
				base: 'w-5 h-5 flex-shrink-0'
			},
			default: {
				closeButton: {
					icon: 'i-heroicons-x-mark-20-solid',
					color: 'gray',
					variant: 'link',
					padded: false
				}
			}
		}
	},
});
