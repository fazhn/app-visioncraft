<template>
  <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <!-- Top Left Corner -->
    <div class="absolute top-0 left-0 w-96 h-96 opacity-60">
      <svg 
        v-if="mounted"
        class="absolute inset-0 w-full h-full" 
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMin meet"
      >
        <defs>
          <pattern 
            id="grid-top-left" 
            :width="gridSize" 
            :height="gridSize" 
            patternUnits="userSpaceOnUse"
          >
            <path 
              :d="`M ${gridSize} 0 L 0 0 0 ${gridSize}`" 
              fill="none" 
              stroke="rgba(156, 163, 175, 0.1)" 
              stroke-width="1"
            />
          </pattern>
          
          <!-- Gradients for moving lines -->
          <linearGradient id="lineGradient-top-left" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color: rgba(255, 193, 7, 0); stop-opacity: 0" />
            <stop offset="50%" style="stop-color: rgba(255, 193, 7, 0.6); stop-opacity: 1" />
            <stop offset="100%" style="stop-color: rgba(255, 193, 7, 0); stop-opacity: 0" />
          </linearGradient>
          
          <mask id="fadeCorner-top-left">
            <defs>
              <radialGradient id="cornerFade-top-left" cx="0%" cy="0%" r="100%">
                <stop offset="0%" style="stop-color: white; stop-opacity: 1" />
                <stop offset="70%" style="stop-color: white; stop-opacity: 0.8" />
                <stop offset="100%" style="stop-color: white; stop-opacity: 0" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#cornerFade-top-left)" />
          </mask>
        </defs>
        
        <!-- Grid background -->
        <rect width="100%" height="100%" fill="url(#grid-top-left)" mask="url(#fadeCorner-top-left)" />
        
        <!-- Moving lines -->
        <g v-for="line in topLines" :key="line.id" mask="url(#fadeCorner-top-left)">
          <line
            :x1="line.x1"
            :y1="line.y1"
            :x2="line.x2"
            :y2="line.y2"
            stroke="url(#lineGradient-top-left)"
            :stroke-width="line.width"
            class="moving-line"
            :style="{
              opacity: line.opacity,
              transform: `translateX(${line.translateX}px)`
            }"
          />
        </g>
      </svg>
    </div>

    <!-- Top Right Corner -->
    <div class="absolute top-0 right-0 w-96 h-96 opacity-60">
      <svg 
        v-if="mounted"
        class="absolute inset-0 w-full h-full" 
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMaxYMin meet"
      >
        <defs>
          <pattern 
            id="grid-top-right" 
            :width="gridSize" 
            :height="gridSize" 
            patternUnits="userSpaceOnUse"
          >
            <path 
              :d="`M ${gridSize} 0 L 0 0 0 ${gridSize}`" 
              fill="none" 
              stroke="rgba(156, 163, 175, 0.1)" 
              stroke-width="1"
            />
          </pattern>
          
          <!-- Gradients for moving lines -->
          <linearGradient id="lineGradient-top-right" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color: rgba(255, 193, 7, 0); stop-opacity: 0" />
            <stop offset="50%" style="stop-color: rgba(255, 193, 7, 0.6); stop-opacity: 1" />
            <stop offset="100%" style="stop-color: rgba(255, 193, 7, 0); stop-opacity: 0" />
          </linearGradient>
          
          <mask id="fadeCorner-top-right">
            <defs>
              <radialGradient id="cornerFade-top-right" cx="100%" cy="0%" r="100%">
                <stop offset="0%" style="stop-color: white; stop-opacity: 1" />
                <stop offset="70%" style="stop-color: white; stop-opacity: 0.8" />
                <stop offset="100%" style="stop-color: white; stop-opacity: 0" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#cornerFade-top-right)" />
          </mask>
        </defs>
        
        <!-- Grid background -->
        <rect width="100%" height="100%" fill="url(#grid-top-right)" mask="url(#fadeCorner-top-right)" />
        
        <!-- Moving lines -->
        <g v-for="line in topRightLines" :key="line.id" mask="url(#fadeCorner-top-right)">
          <line
            :x1="line.x1"
            :y1="line.y1"
            :x2="line.x2"
            :y2="line.y2"
            stroke="url(#lineGradient-top-right)"
            :stroke-width="line.width"
            class="moving-line"
            :style="{
              opacity: line.opacity,
              transform: `translateX(${line.translateX}px)`
            }"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Line {
  id: number
  x1: number
  y1: number
  x2: number
  y2: number
  width: number
  opacity: number
  translateX: number
  speed: number
  direction: 'horizontal' | 'vertical'
}

const mounted = ref(false)
const canvasWidth = ref(400)
const canvasHeight = ref(400)
const gridSize = ref(40)
const topLines = ref<Line[]>([])
const topRightLines = ref<Line[]>([])

let lineId = 0
let animationId: number

const createLines = () => {
  if (typeof window === 'undefined') return
  
  const createLineSet = () => {
    const newLines: Line[] = []
    const lineCount = 6
    
    for (let i = 0; i < lineCount; i++) {
      const isHorizontal = Math.random() > 0.5
      
      if (isHorizontal) {
        // Horizontal line
        newLines.push({
          id: lineId++,
          x1: -50,
          y1: Math.random() * canvasHeight.value,
          x2: canvasWidth.value + 50,
          y2: Math.random() * canvasHeight.value,
          width: Math.random() * 1.5 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          translateX: -canvasWidth.value,
          speed: Math.random() * 0.8 + 0.4,
          direction: 'horizontal'
        })
      } else {
        // Vertical line
        newLines.push({
          id: lineId++,
          x1: Math.random() * canvasWidth.value,
          y1: -50,
          x2: Math.random() * canvasWidth.value,
          y2: canvasHeight.value + 50,
          width: Math.random() * 1.5 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          translateX: 0,
          speed: Math.random() * 0.8 + 0.4,
          direction: 'vertical'
        })
      }
    }
    
    return newLines
  }
  
  topLines.value = createLineSet()
  topRightLines.value = createLineSet()
}

const animateLineSet = (lineSet: Line[]) => {
  lineSet.forEach(line => {
    if (line.direction === 'horizontal') {
      line.translateX += line.speed
      
      // Reset when line goes off screen
      if (line.translateX > canvasWidth.value * 2) {
        line.translateX = -canvasWidth.value
        line.y1 = Math.random() * canvasHeight.value
        line.y2 = Math.random() * canvasHeight.value
      }
    } else {
      // For vertical lines, animate them moving down
      line.y1 += line.speed
      line.y2 += line.speed
      
      // Reset when line goes off screen
      if (line.y1 > canvasHeight.value + 50) {
        line.y1 = -50
        line.y2 = canvasHeight.value + 50
        line.x1 = Math.random() * canvasWidth.value
        line.x2 = Math.random() * canvasWidth.value
      }
    }
  })
}

const animateLines = () => {
  animateLineSet(topLines.value)
  animateLineSet(topRightLines.value)
  
  animationId = requestAnimationFrame(animateLines)
}

onMounted(() => {
  mounted.value = true
  createLines()
  animateLines()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
.moving-line {
  transition: opacity 0.3s ease;
}
</style>