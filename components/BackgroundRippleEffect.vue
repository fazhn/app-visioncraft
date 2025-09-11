<template>
  <div v-if="mounted" class="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
    <!-- Grid of interactive boxes -->
    <div 
      v-for="(box, index) in boxes" 
      :key="index"
      :class="[
        'absolute bg-gray-700/12 border border-gray-500/20 rounded-lg transition-all duration-500 hover:bg-yellow-400/25 hover:border-yellow-400/80 hover:scale-110 cursor-pointer pointer-events-auto box-disintegration',
        index % 3 === 0 ? 'cell-ripple-box' : ''
      ]"
      :style="{
        left: box.x + 'px',
        top: box.y + 'px',
        width: box.size + 'px',
        height: box.size + 'px'
      }"
      @click="createRipple(box, $event)"
      @mouseenter="onBoxHover(box)"
    >
      <!-- Ripple effect for this box -->
      <div 
        v-for="ripple in box.ripples" 
        :key="ripple.id"
        class="absolute rounded-full pointer-events-none ripple-animation"
        :style="{
          left: '50%',
          top: '50%',
          width: ripple.size + 'px',
          height: ripple.size + 'px',
          transform: `translate(-50%, -50%) scale(${ripple.scale})`,
          opacity: ripple.opacity,
          background: `radial-gradient(circle, ${ripple.color} 0%, transparent 70%)`
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Box {
  id: number
  x: number
  y: number
  size: number
  ripples: Ripple[]
}

interface Ripple {
  id: number
  size: number
  scale: number
  opacity: number
  color: string
}

const mounted = ref(false)
const boxes = ref<Box[]>([])
let rippleId = 0

const createBoxes = () => {
  if (typeof window === 'undefined') return
  
  const boxCount = 50
  const newBoxes: Box[] = []
  
  for (let i = 0; i < boxCount; i++) {
    newBoxes.push({
      id: i,
      x: Math.random() * (window.innerWidth - 200), // Leave space for movement
      y: Math.random() * (window.innerHeight - 60),
      size: Math.random() * 40 + 20,
      ripples: []
    })
  }
  
  boxes.value = newBoxes
}

const createRipple = (box: Box, event?: MouseEvent) => {
  const ripple: Ripple = {
    id: rippleId++,
    size: box.size * 3,
    scale: 0,
    opacity: 0.8,
    color: 'rgba(255, 193, 7, 0.6)'
  }
  
  box.ripples.push(ripple)
  
  // Animate ripple
  setTimeout(() => {
    ripple.scale = 4
    ripple.opacity = 0
  }, 50)
  
  // Remove ripple after animation
  setTimeout(() => {
    const index = box.ripples.findIndex(r => r.id === ripple.id)
    if (index > -1) {
      box.ripples.splice(index, 1)
    }
  }, 1000)
}

const onBoxHover = (box: Box) => {
  if (Math.random() > 0.7) {
    createRipple(box)
  }
}

// Auto ripple effect
const startAutoRipple = () => {
  setInterval(() => {
    if (boxes.value.length > 0) {
      const randomBox = boxes.value[Math.floor(Math.random() * boxes.value.length)]
      if (Math.random() > 0.8) {
        createRipple(randomBox)
      }
    }
  }, 3000)
}

const handleResize = () => {
  createBoxes()
}

onMounted(() => {
  mounted.value = true
  if (typeof window !== 'undefined') {
    createBoxes()
    startAutoRipple()
    window.addEventListener('resize', handleResize)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize)
  }
})
</script>

<style scoped>
.ripple-animation {
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.8s ease-out;
}

/* Box hover effects */
.absolute:hover {
  box-shadow: 0 0 20px rgba(255, 193, 7, 0.3);
}

/* Continuous movement with disintegration effect */
@keyframes move-right {
  0% {
    opacity: 0.15;
    transform: scale(1) translateX(-100px);
    filter: blur(0px);
  }
  10% {
    opacity: 0.3;
    transform: scale(1.015) translateX(0);
    filter: blur(0px);
  }
  85% {
    opacity: 0.3;
    transform: scale(1.015) translateX(calc(100vw - 150px));
    filter: blur(0px);
  }
  95% {
    opacity: 0.1;
    transform: scale(0.8) translateX(calc(100vw + 20px));
    filter: blur(2px) brightness(1.5);
  }
  100% {
    opacity: 0;
    transform: scale(0.3) translateX(calc(100vw + 100px));
    filter: blur(5px) brightness(2) saturate(0);
  }
}

.absolute {
  animation: move-right 30s linear infinite;
  position: relative;
}

/* Disintegration particles */
.box-disintegration::before,
.box-disintegration::after {
  content: '';
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 193, 7, 0.4);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
}

.box-disintegration::before {
  top: -2px;
  right: -2px;
  animation: particle-1 30s linear infinite;
}

.box-disintegration::after {
  bottom: -2px;
  left: -2px;
  animation: particle-2 30s linear infinite;
}

/* Particle animations */
@keyframes particle-1 {
  0%, 85% {
    opacity: 0;
    transform: translateX(0) translateY(0) scale(1);
  }
  90% {
    opacity: 0.6;
    transform: translateX(10px) translateY(-10px) scale(1.2);
  }
  100% {
    opacity: 0;
    transform: translateX(30px) translateY(-30px) scale(0);
  }
}

@keyframes particle-2 {
  0%, 85% {
    opacity: 0;
    transform: translateX(0) translateY(0) scale(1);
  }
  92% {
    opacity: 0.4;
    transform: translateX(-15px) translateY(15px) scale(0.8);
  }
  100% {
    opacity: 0;
    transform: translateX(-40px) translateY(40px) scale(0);
  }
}

/* Stagger animation delays */
.absolute:nth-child(2n) {
  animation-delay: 3s;
}

.absolute:nth-child(3n) {
  animation-delay: 6s;
}

.absolute:nth-child(4n) {
  animation-delay: 9s;
}

.absolute:nth-child(5n) {
  animation-delay: 12s;
}

.absolute:nth-child(6n) {
  animation-delay: 15s;
}

.absolute:nth-child(7n) {
  animation-delay: 18s;
}

/* Cell ripple animation for some boxes */
.cell-ripple-box {
  animation: 
    move-right 30s linear infinite,
    cell-ripple 800ms ease-out infinite;
}

/* Theme inline for cell ripple effect */
@theme inline {
  --animate-cell-ripple: cell-ripple var(--duration, 200ms) ease-out none 1
    var(--delay, 0ms);
 
  @keyframes cell-ripple {
    0% {
      opacity: 0.4;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 0.4;
    }
  }
}
</style>