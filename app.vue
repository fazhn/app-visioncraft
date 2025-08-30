<template>
	<UApp class="w-full">
		<VitePwaManifest />
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
    
	</UApp>
</template>
<script lang="ts" setup>
useHead({
	title: 'VisionCraft IA',
});

</script>
<style lang="css">
html,
body,
#__nuxt,
#__layout {
	height: 100% !important;
	width: 100% !important;
}
</style>
