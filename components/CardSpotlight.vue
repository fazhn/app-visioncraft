<template>
  <div 
    ref="cardRef"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    class="relative overflow-hidden rounded-xl bg-gray-900/50 border border-gray-700 p-6 backdrop-blur-sm group"
    :style="{ '--mouse-x': mouseX + 'px', '--mouse-y': mouseY + 'px' }"
  >
    <!-- Spotlight effect -->
    <div 
      class="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      :style="{
        background: `radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.1), transparent 80%)`
      }"
    ></div>
    
    <!-- Border glow effect -->
    <div 
      class="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      :style="{
        background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.1), transparent 40%)`
      }"
    ></div>
    
    <!-- Card content -->
    <div class="relative z-10">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const cardRef = ref<HTMLElement>()
const mouseX = ref(0)
const mouseY = ref(0)

const handleMouseMove = (e: MouseEvent) => {
  if (!cardRef.value) return
  
  const rect = cardRef.value.getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
}

const handleMouseLeave = () => {
  mouseX.value = 0
  mouseY.value = 0
}
</script>