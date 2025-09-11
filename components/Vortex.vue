<template>
  <div 
    class="relative w-full h-full flex items-center justify-center overflow-hidden"
    :class="containerClass"
  >
    <!-- Vortex background -->
    <div class="absolute inset-0 z-0">
      <canvas
        ref="canvasRef"
        class="w-full h-full"
        :width="canvasWidth"
        :height="canvasHeight"
      />
    </div>
    
    <!-- Content overlay -->
    <div class="relative z-10">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface VortexProps {
  backgroundColor?: string
  rangeY?: number
  rangeX?: number
  baseHue?: number
  particleCount?: number
  baseSpeed?: number
  containerClass?: string
}

const props = withDefaults(defineProps<VortexProps>(), {
  backgroundColor: 'transparent',
  rangeY: 400,
  rangeX: 400,
  baseHue: 120,
  particleCount: 600,
  baseSpeed: 0.1,
  containerClass: ''
})

const canvasRef = ref<HTMLCanvasElement>()
const canvasWidth = ref(800)
const canvasHeight = ref(800)
let animationId: number
let particles: Particle[] = []

class Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  hue: number
  
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.vx = (Math.random() - 0.5) * 0.5
    this.vy = (Math.random() - 0.5) * 0.5
    this.life = 0
    this.maxLife = Math.random() * 300 + 300
    this.hue = props.baseHue + Math.random() * 60 - 30
  }

  update(centerX: number, centerY: number) {
    const dx = centerX - this.x
    const dy = centerY - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    if (distance > 0) {
      const force = (1 / distance) * 40000
      const angle = Math.atan2(dy, dx)
      
      this.vx += Math.cos(angle) * force * props.baseSpeed
      this.vy += Math.sin(angle) * force * props.baseSpeed
      
      // Add spiral motion
      const spiralForce = 0.02
      this.vx += -Math.sin(angle) * spiralForce
      this.vy += Math.cos(angle) * spiralForce
    }
    
    this.vx *= 0.99
    this.vy *= 0.99
    
    this.x += this.vx
    this.y += this.vy
    this.life++
  }

  draw(ctx: CanvasRenderingContext2D) {
    const alpha = 1 - (this.life / this.maxLife)
    if (alpha <= 0) return
    
    ctx.save()
    ctx.globalCompositeOperation = 'lighter'
    ctx.beginPath()
    
    const size = alpha * 2
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, size)
    gradient.addColorStop(0, `hsla(${this.hue}, 100%, 60%, ${alpha})`)
    gradient.addColorStop(1, `hsla(${this.hue}, 100%, 60%, 0)`)
    
    ctx.fillStyle = gradient
    ctx.arc(this.x, this.y, size, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  isDead() {
    return this.life >= this.maxLife
  }
}

const initCanvas = () => {
  if (!canvasRef.value) return
  
  const canvas = canvasRef.value
  const rect = canvas.getBoundingClientRect()
  
  canvasWidth.value = rect.width
  canvasHeight.value = rect.height
  
  canvas.width = canvasWidth.value
  canvas.height = canvasHeight.value
}

const createParticle = () => {
  const angle = Math.random() * Math.PI * 2
  const radius = Math.random() * props.rangeY + 100
  const x = canvasWidth.value / 2 + Math.cos(angle) * radius
  const y = canvasHeight.value / 2 + Math.sin(angle) * radius
  
  return new Particle(x, y)
}

const animate = () => {
  if (!canvasRef.value) return
  
  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return
  
  ctx.fillStyle = props.backgroundColor
  ctx.fillRect(0, 0, canvasWidth.value, canvasHeight.value)
  
  const centerX = canvasWidth.value / 2
  const centerY = canvasHeight.value / 2
  
  // Add new particles
  for (let i = 0; i < 3; i++) {
    if (particles.length < props.particleCount) {
      particles.push(createParticle())
    }
  }
  
  // Update and draw particles
  particles = particles.filter(particle => {
    particle.update(centerX, centerY)
    particle.draw(ctx)
    return !particle.isDead()
  })
  
  animationId = requestAnimationFrame(animate)
}

const startAnimation = () => {
  stopAnimation()
  animate()
}

const stopAnimation = () => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
}

const handleResize = () => {
  initCanvas()
}

onMounted(() => {
  initCanvas()
  startAnimation()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  stopAnimation()
  window.removeEventListener('resize', handleResize)
})
</script>