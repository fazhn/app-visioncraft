<template>
  <div class="image-canvas-container">
    <div class="canvas-wrapper bg-gray-800 rounded-lg p-4 min-h-96 border-2 border-dashed border-gray-600 relative overflow-hidden">
      <!-- Canvas Element -->
      <canvas
        ref="canvasRef"
        :width="canvasSize.width"
        :height="canvasSize.height"
        class="border border-gray-600 rounded cursor-crosshair bg-gray-900"
        @click="handleCanvasClick"
        @mousedown="startDrag"
        @mousemove="drag"
        @mouseup="endDrag"
      ></canvas>
      
      <!-- Image Preview Grid -->
      <div v-if="images.length > 0" class="mt-4 grid grid-cols-4 gap-2">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="relative cursor-pointer hover:scale-105 transition-transform"
          @click="addImageToCanvas(image, index)"
        >
          <img
            :src="image"
            :alt="`Image ${index + 1}`"
            class="w-full h-16 object-cover rounded border-2"
            :class="selectedImageIndex === index ? 'border-blue-500' : 'border-gray-300'"
          />
        </div>
      </div>
      
      <!-- Drop Zone -->
      <div v-if="images.length === 0" class="absolute inset-4 flex items-center justify-center">
        <div class="text-center text-gray-400">
          <UIcon name="i-heroicons-photo" class="text-4xl mb-2" />
          <p class="text-sm">Upload images to start editing</p>
          <p class="text-xs">Images will appear here for canvas editing</p>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
// Props
interface Props {
  images: string[];
}

const props = defineProps<Props>();

// Emits
const emit = defineEmits<{
  'image-selected': [imageUrl: string];
}>();

// Refs
const canvasRef = ref<HTMLCanvasElement | null>(null);

// Canvas configuration
const canvasSize = ref({
  width: 800,
  height: 600,
});

// State
interface CanvasImage {
  img: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  id: string;
}

const canvasImages = ref<CanvasImage[]>([]);
const selectedImageIndex = ref<number | null>(null);
const selectedCanvasImageIndex = ref<number | null>(null);
const isDragging = ref(false);
const dragStart = ref({ x: 0, y: 0 });
const dragImageIndex = ref<number | null>(null);

// Watch for new images
watch(() => props.images, (newImages) => {
  // Auto-add new images to canvas
  newImages.forEach((imageUrl, index) => {
    if (!canvasImages.value.find(ci => ci.src === imageUrl)) {
      addImageToCanvas(imageUrl, index);
    }
  });
}, { deep: true });

// Add image to canvas
const addImageToCanvas = (imageUrl: string, index: number) => {
  selectedImageIndex.value = index;
  
  // Check if image already exists on canvas
  if (canvasImages.value.find(ci => ci.src === imageUrl)) {
    return;
  }
  
  const img = new Image();
  img.onload = () => {
    // Calculate scaled size to fit nicely on canvas
    const maxSize = 200;
    const scale = Math.min(maxSize / img.width, maxSize / img.height);
    
    const canvasImage: CanvasImage = {
      img,
      x: 50 + (canvasImages.value.length * 50), // Offset each image
      y: 50 + (canvasImages.value.length * 30),
      width: img.width * scale,
      height: img.height * scale,
      src: imageUrl,
      id: `img_${Date.now()}_${index}`
    };
    
    canvasImages.value.push(canvasImage);
    drawCanvas();
    
    // Emit selection
    emit('image-selected', imageUrl);
  };
  img.src = imageUrl;
};

// Draw canvas
const drawCanvas = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw all images
  canvasImages.value.forEach((canvasImage, index) => {
    ctx.drawImage(
      canvasImage.img,
      canvasImage.x,
      canvasImage.y,
      canvasImage.width,
      canvasImage.height
    );
    
    // Draw selection border if selected
    if (selectedCanvasImageIndex.value === index) {
      ctx.strokeStyle = '#4A90E2';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(
        canvasImage.x - 2,
        canvasImage.y - 2,
        canvasImage.width + 4,
        canvasImage.height + 4
      );
      ctx.setLineDash([]);
    }
  });
};

// Handle canvas click
const handleCanvasClick = (event: MouseEvent) => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  // Find clicked image
  let clickedIndex = -1;
  for (let i = canvasImages.value.length - 1; i >= 0; i--) {
    const img = canvasImages.value[i];
    if (x >= img.x && x <= img.x + img.width && y >= img.y && y <= img.y + img.height) {
      clickedIndex = i;
      break;
    }
  }
  
  if (clickedIndex >= 0) {
    selectedCanvasImageIndex.value = clickedIndex;
    emit('image-selected', canvasImages.value[clickedIndex].src);
  } else {
    selectedCanvasImageIndex.value = null;
  }
  
  drawCanvas();
};

// Drag functionality
const startDrag = (event: MouseEvent) => {
  if (selectedCanvasImageIndex.value === null) return;
  
  const canvas = canvasRef.value;
  if (!canvas) return;
  
  const rect = canvas.getBoundingClientRect();
  dragStart.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
  
  isDragging.value = true;
  dragImageIndex.value = selectedCanvasImageIndex.value;
};

const drag = (event: MouseEvent) => {
  if (!isDragging.value || dragImageIndex.value === null) return;
  
  const canvas = canvasRef.value;
  if (!canvas) return;
  
  const rect = canvas.getBoundingClientRect();
  const currentX = event.clientX - rect.left;
  const currentY = event.clientY - rect.top;
  
  const deltaX = currentX - dragStart.value.x;
  const deltaY = currentY - dragStart.value.y;
  
  const imageToMove = canvasImages.value[dragImageIndex.value];
  imageToMove.x += deltaX;
  imageToMove.y += deltaY;
  
  dragStart.value = { x: currentX, y: currentY };
  drawCanvas();
};

const endDrag = () => {
  isDragging.value = false;
  dragImageIndex.value = null;
};

// Download canvas as image
const downloadCanvas = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  
  const link = document.createElement('a');
  link.download = 'visioncraft-canvas.png';
  link.href = canvas.toDataURL();
  link.click();
};

// Delete selected image
const deleteSelectedImage = () => {
  if (selectedCanvasImageIndex.value !== null) {
    canvasImages.value.splice(selectedCanvasImageIndex.value, 1);
    selectedCanvasImageIndex.value = null;
    drawCanvas();
  }
};

// Clear canvas
const clearCanvas = () => {
  canvasImages.value = [];
  selectedCanvasImageIndex.value = null;
  selectedImageIndex.value = null;
  drawCanvas();
};

// Reset canvas view
const resetCanvas = () => {
  canvasImages.value.forEach((img, index) => {
    img.x = 50 + (index * 50);
    img.y = 50 + (index * 30);
  });
  drawCanvas();
};

// Expose clear method for parent component
defineExpose({
  clear: clearCanvas
});

// Resize canvas on mount and window resize
onMounted(() => {
  const updateCanvasSize = () => {
    const container = document.querySelector('.canvas-wrapper');
    if (container && canvasRef.value) {
      const containerWidth = container.clientWidth - 32; // account for padding
      canvasSize.value.width = Math.max(800, containerWidth);
      canvasSize.value.height = 600;
    }
  };
  
  updateCanvasSize();
  window.addEventListener('resize', updateCanvasSize);
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateCanvasSize);
  });
});

// Watch for canvas size changes and redraw
watch(canvasSize, () => {
  nextTick(() => drawCanvas());
}, { deep: true });
</script>

<style scoped>
.image-canvas-container {
  @apply w-full;
}

.canvas-wrapper {
  @apply overflow-hidden;
}

canvas {
  display: block;
  margin: 0 auto;
}
</style>