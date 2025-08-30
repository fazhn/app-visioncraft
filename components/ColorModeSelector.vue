<template>
	<!-- <UTooltip :text="tooltip" :popper="{ arrow: true, placement: 'bottom' }"> -->
	<UButton variant="link" size="xs" :icon="icon" @click="toggleMode" />
	<!-- </UTooltip> -->
</template>

<script lang="ts" setup>
import { ThemeMode } from '~/types';

//TODO: load prefered color mode from local storage or pinia
const colorMode = useColorMode();

const icon = computed(() => {
	switch (colorMode.value) {
		// case Mode.System:
		//   return 'mdi:theme-light-dark';
		case ThemeMode.Light:
			return 'ph:sun-fill';
		default:
			return 'ph:moon-stars-fill';
	}
});

const toggleMode = () => {
	switch (colorMode.value) {
		// case Mode.System:
		//   colorMode.value = Mode.Light;
		//   break;
		case ThemeMode.Light:
			colorMode.preference = ThemeMode.Dark;
			break;
		default:
			colorMode.preference = ThemeMode.Light;
			break;
	}
};

const tooltip = computed(() => {
	switch (colorMode.value) {
		// case Mode.System:
		//   return 'Switch to light mode';
		case ThemeMode.Light:
			return 'Switch to dark mode';
		default:
			// return 'Switch to system mode';
			return 'Switch to light mode';
	}
});
</script>
