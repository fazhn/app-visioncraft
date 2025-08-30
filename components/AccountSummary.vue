<template>
  <div class="relative">
    <!-- Main AI Stats Card -->
    <div class="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl text-white relative overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 opacity-30">
        <div class="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-xl -translate-y-20 translate-x-20 animate-pulse"></div>
        <div class="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-lg translate-y-16 -translate-x-16 animate-pulse delay-1000"></div>
        <div class="absolute top-1/2 left-1/2 w-24 h-24 bg-white/5 rounded-full blur-md -translate-x-12 -translate-y-12 animate-pulse delay-500"></div>
      </div>
      
      <div class="relative z-10">
        <!-- Header with Actions -->
        <div class="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8">
          <div>
            <div class="flex items-center gap-2 sm:gap-3 mb-2">
              <div class="p-1.5 sm:p-2 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
                <UIcon name="i-heroicons-sparkles" class="text-lg sm:text-xl lg:text-2xl" />
              </div>
              <div class="min-w-0 flex-1">
                <h3 class="text-base sm:text-lg lg:text-xl font-bold truncate">AI Creative Stats</h3>
                <p class="text-xs sm:text-sm text-purple-100 truncate">Your creative journey</p>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-1 sm:gap-2">
            <UButton 
              icon="i-heroicons-arrow-path" 
              size="xs" 
              color="neutral" 
              variant="ghost" 
              class="text-white hover:bg-white/20 sm:size-sm"
              @click="refreshStats"
              :loading="isRefreshing"
            />
            <UDropdown :items="menuItems" :popper="{ placement: 'bottom-end' }">
              <UButton 
                icon="i-heroicons-ellipsis-vertical" 
                size="xs" 
                color="neutral" 
                variant="ghost" 
                class="text-white hover:bg-white/20 sm:size-sm"
              />
            </UDropdown>
          </div>
        </div>

        <!-- Main Stats Display -->
        <div class="text-center mb-4 sm:mb-6 lg:mb-8">
          <div class="mb-3 sm:mb-4">
            <div class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mb-2 tracking-tight break-words" :class="{ 'animate-pulse': isRefreshing }">
              {{ imagesCreated }}
            </div>
            <div class="flex items-center justify-center gap-1 sm:gap-2 text-purple-100">
              <UIcon name="i-heroicons-photo" class="text-xs sm:text-sm" />
              <span class="text-xs sm:text-sm truncate">Images Created</span>
            </div>
          </div>
          
          <!-- Stats Grid -->
          <div class="grid grid-cols-3 gap-2 sm:gap-4 mt-6">
            <div class="text-center">
              <div class="text-lg sm:text-xl lg:text-2xl font-bold text-white">{{ promptsUsed }}</div>
              <div class="text-xs sm:text-sm text-purple-200">Prompts</div>
            </div>
            <div class="text-center">
              <div class="text-lg sm:text-xl lg:text-2xl font-bold text-white">{{ editsCompleted }}</div>
              <div class="text-xs sm:text-sm text-purple-200">Edits</div>
            </div>
            <div class="text-center">
              <div class="text-lg sm:text-xl lg:text-2xl font-bold text-white">{{ analysisCount }}</div>
              <div class="text-xs sm:text-sm text-purple-200">Analysis</div>
            </div>
          </div>
          
          <!-- Activity Indicator -->
          <div class="flex items-center justify-center gap-1 sm:gap-2 flex-wrap mt-4">
            <div class="flex items-center gap-1 px-2 sm:px-3 py-1 bg-green-500/20 rounded-full">
              <UIcon name="i-heroicons-fire" class="text-xs sm:text-sm text-orange-300" />
              <span class="text-xs sm:text-sm font-medium text-orange-300">{{ creativityStreak }} day streak</span>
            </div>
            <span class="text-xs text-purple-200 whitespace-nowrap">stay creative!</span>
          </div>
        </div>

      </div>
      
      <!-- Subtle gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/5 pointer-events-none"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const toast = useToast();

// Reactive data
const imagesCreated = ref(47);
const promptsUsed = ref(156);
const editsCompleted = ref(23);
const analysisCount = ref(34);
const creativityStreak = ref(7);
const isRefreshing = ref(false);

// Menu items for dropdown
const menuItems = [
  [{
    label: 'View Gallery',
    icon: 'i-heroicons-photo',
    click: () => handleViewGallery()
  }],
  [{
    label: 'Export Creations',
    icon: 'i-heroicons-arrow-down-tray',
    click: () => handleExportCreations()
  }, {
    label: 'AI Settings',
    icon: 'i-heroicons-cog-6-tooth',
    click: () => handleAISettings()
  }]
];

// Methods
const refreshStats = async () => {
  isRefreshing.value = true;
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Add some random variation to simulate real data
  imagesCreated.value += Math.floor(Math.random() * 3);
  promptsUsed.value += Math.floor(Math.random() * 5);
  
  isRefreshing.value = false;
  
  toast.add({
    title: 'Stats updated',
    description: 'Your creative progress synced',
    color: 'success',
    icon: 'i-heroicons-check-circle'
  });
};

const handleViewGallery = () => {
  toast.add({
    title: 'Image Gallery',
    description: 'Coming soon: view all your AI creations',
    color: 'info'
  });
};

const handleExportCreations = () => {
  toast.add({
    title: 'Export Creations',
    description: 'Coming soon: download your image collection',
    color: 'info'
  });
};

const handleAISettings = () => {
  toast.add({
    title: 'AI Settings',
    description: 'Coming soon: customize AI preferences',
    color: 'info'
  });
};
</script>