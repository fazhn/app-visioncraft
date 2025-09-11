<template>
  <div 
    ref="containerRef"
    class="relative inline-block overflow-hidden"
    @click="createRipple"
  >
    <!-- Background ripple effects -->
    <div 
      v-for="(ripple, index) in ripples" 
      :key="ripple.id"
      class="absolute pointer-events-none rounded-full"
      :style="{
        left: ripple.x + 'px',
        top: ripple.y + 'px',
        width: ripple.size + 'px',
        height: ripple.size + 'px',
        transform: `translate(-50%, -50%) scale(${ripple.scale})`,
        opacity: ripple.opacity,
        background: `radial-gradient(circle, ${ripple.color} 0%, transparent 70%)`,
        animation: `ripple-expand ${ripple.duration}ms ease-out forwards`
      }"
    />
    
    <!-- Content slot -->
    <div class="relative z-10">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface RippleProps {
  color?: string
  duration?: number
  size?: number
}

const props = withDefaults(defineProps<RippleProps>(), {
  color: 'rgba(255, 193, 7, 0.3)',
  duration: 1000,
  size: 100
})

const containerRef = ref<HTMLElement>()
const ripples = ref<Array<{
  id: number
  x: number
  y: number
  size: number
  scale: number
  opacity: number
  color: string
  duration: number
}>>([])

let rippleId = 0

const createRipple = (event?: MouseEvent) => {
  if (!containerRef.value) return

  const rect = containerRef.value.getBoundingClientRect()
  
  let x: number, y: number
  
  if (event) {
    x = event.clientX - rect.left
    y = event.clientY - rect.top
  } else {
    // If no event (auto ripple), create at random position
    x = Math.random() * rect.width
    y = Math.random() * rect.height
  }

  const newRipple = {
    id: rippleId++,
    x,
    y,
    size: props.size,
    scale: 0,
    opacity: 1,
    color: props.color,
    duration: props.duration
  }

  ripples.value.push(newRipple)

  // Animate ripple
  setTimeout(() => {
    const ripple = ripples.value.find(r => r.id === newRipple.id)
    if (ripple) {
      ripple.scale = 4
      ripple.opacity = 0
    }
  }, 10)

  // Remove ripple after animation
  setTimeout(() => {
    const index = ripples.value.findIndex(r => r.id === newRipple.id)
    if (index > -1) {
      ripples.value.splice(index, 1)
    }
  }, props.duration)
}

// Auto ripple effect
const startAutoRipple = () => {
  setInterval(() => {
    if (Math.random() > 0.7) { // 30% chance every interval
      createRipple()
    }
  }, 2000)
}

onMounted(() => {
  startAutoRipple()
})

// Expose method to create ripple programmatically
defineExpose({
  createRipple
})
</script>

<style scoped>
@keyframes ripple-expand {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(4);
    opacity: 0;
  }
}
</style>