<template>
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
    <!-- Generate Image Button -->
    <UButton
      size="md"
      variant="soft"
      color="primary"
      class="h-16 flex-col gap-1.5 hover:scale-105 transition-all duration-200 group rounded-xl"
      @click="scrollToSection('generate')"
    >
      <UIcon 
        name="i-heroicons-sparkles" 
        class="text-lg group-hover:scale-110 transition-transform duration-200" 
      />
      <span class="text-xs font-medium">Generate</span>
    </UButton>

    <!-- Upload & Analyze Button -->
    <UButton
      size="md"
      variant="soft"
      color="success"
      class="h-16 flex-col gap-1.5 hover:scale-105 transition-all duration-200 group rounded-xl"
      @click="scrollToSection('upload')"
    >
      <UIcon 
        name="i-heroicons-arrow-up-tray" 
        class="text-lg group-hover:scale-110 transition-transform duration-200" 
      />
      <span class="text-xs font-medium">Upload</span>
    </UButton>
    
    <!-- Edit Image Button -->
    <UButton
      size="md"
      variant="soft"
      color="warning"
      class="h-16 flex-col gap-1.5 hover:scale-105 transition-all duration-200 group rounded-xl"
      @click="scrollToSection('edit')"
    >
      <UIcon 
        name="i-heroicons-pencil" 
        class="text-lg group-hover:scale-110 transition-transform duration-200" 
      />
      <span class="text-xs font-medium">Edit</span>
    </UButton>

    <!-- Canvas Button -->
    <UButton
      size="md"
      variant="soft"
      color="neutral"
      class="h-16 flex-col gap-1.5 hover:scale-105 transition-all duration-200 group rounded-xl"
      @click="scrollToSection('canvas')"
    >
      <UIcon 
        name="i-heroicons-photo" 
        class="text-lg group-hover:scale-110 transition-transform duration-200" 
      />
      <span class="text-xs font-medium">Canvas</span>
    </UButton>
  </div>
</template>

<script setup lang="ts">
const scrollToSection = (sectionId: string) => {
  const element = document.querySelector(`[data-section="${sectionId}"]`) || 
                  document.querySelector(`h2:has-text("${sectionId}"), h3:has-text("${sectionId}")`);
  
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  } else {
    // Fallback: scroll to approximate sections based on order
    const sections = {
      'canvas': 0.2,
      'generate': 0.4,
      'upload': 0.4,
      'edit': 0.6
    };
    
    const targetPosition = window.innerHeight * (sections[sectionId as keyof typeof sections] || 0.5);
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
};
</script>