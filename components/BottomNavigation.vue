<template>
    <nav
      class="fixed bottom-0 left-0 w-full bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 flex justify-around items-center py-3 z-50 pb-1"
      role="navigation"
      aria-label="Main navigation"
    >
      <button
        v-for="item in items"
        :key="item.name"
        @click="$emit('update:modelValue', item.name)"
        :aria-label="item.label"
        class="flex flex-col items-center justify-center text-xs transition"
      >
        <div
          class="w-10 h-10 flex items-center justify-center rounded-full"
          :class="modelValue === item.name ? 'bg-[#0348CA] text-white' : 'text-gray-500'"
        >
          <UIcon :name="item.icon" class="text-xl" />
        </div>
        <span
          class="mt-0.5"
        
        >{{ item.label }}</span>
     
      </button>
    </nav>
  </template>
  
  <script setup lang="ts">
  const props = defineProps<{
    modelValue: string
  }>()
  
  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
  }>()
  
  const items = [
    { name: 'home', icon: 'i-heroicons-home', label: 'Inicio' },
    { name: 'wallet', icon: 'i-heroicons-wallet', label: 'Billetera' },
    { name: 'chart', icon: 'lucide:align-vertical-justify-end', label: 'Gráficas' },
    { name: 'settings', icon: 'lucide:settings', label: 'Ajustes' }
  ]
  </script>