<template>
  <div class="min-h-screen bg-black text-white">
    <!-- Intro Animation -->
    <Transition name="intro" mode="out-in">
      <div v-if="showIntro" class="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div class="text-center">
          <!-- Logo Animation -->
          <div class="relative mb-8">
            <div 
              :class="[
                'transition-all duration-1000 ease-out',
                introStep >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              ]"
            >
              <div class="relative">
                <h1 class="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
                  VisionCraft
                </h1>
                <div class="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
          
          <!-- IA Badge Animation -->
          <div 
            :class="[
              'transition-all duration-1000 ease-out delay-500',
              introStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            ]"
          >
            <div class="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-full px-6 py-2 mb-8">
              <UIcon name="i-heroicons-sparkles" class="h-5 w-5 text-white mr-2 animate-spin" />
              <span class="text-white font-medium">IA</span>
              <UIcon name="i-heroicons-sparkles" class="h-5 w-5 text-white ml-2 animate-spin" style="animation-direction: reverse;" />
            </div>
          </div>
          
          <!-- Tagline Animation -->
          <div 
            :class="[
              'transition-all duration-1000 ease-out delay-1000',
              introStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            ]"
          >
            <p class="text-xl md:text-2xl text-gray-300 mb-8 animate-pulse">
              Crea, analiza y edita imágenes con inteligencia artificial
            </p>
          </div>
          
          <!-- Loading Bars Animation -->
          <div 
            :class="[
              'transition-all duration-1000 ease-out delay-1500',
              introStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            ]"
          >
            <div class="flex justify-center space-x-2 mb-8">
              <div class="w-2 h-8 bg-yellow-400 rounded-full animate-bounce" style="animation-delay: 0s;"></div>
              <div class="w-2 h-8 bg-orange-500 rounded-full animate-bounce" style="animation-delay: 0.1s;"></div>
              <div class="w-2 h-8 bg-red-500 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
              <div class="w-2 h-8 bg-purple-600 rounded-full animate-bounce" style="animation-delay: 0.3s;"></div>
              <div class="w-2 h-8 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0.4s;"></div>
            </div>
            <p class="text-gray-400 text-sm animate-pulse">Inicializando IA...</p>
          </div>
        </div>
        
        <!-- Particle Background -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            v-for="i in 50" 
            :key="i"
            class="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-ping"
            :style="{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              animationDuration: (Math.random() * 3 + 2) + 's'
            }"
          ></div>
        </div>
      </div>
    </Transition>
    
    <!-- Header Section -->
    <div class="flex flex-col items-center justify-center pt-8 md:pt-20 pb-8 md:pb-12 px-4">
      <!-- Auth Button - Top Right - Responsive -->
      <div class="absolute top-3 right-3 md:top-4 md:right-4 z-40">
        <AuthButton />
      </div>
      
      <h1 class="text-3xl md:text-4xl font-normal text-white mb-4 md:mb-6">VisionCraft IA</h1>
      
      <!-- Description and Examples -->
      <div class="text-center mb-8 md:mb-12 max-w-3xl mx-auto px-4">
        <p class="text-gray-300 text-base md:text-lg mb-6 md:mb-8">
          Crea, analiza y edita imágenes con inteligencia artificial
        </p>
        
        <!-- Example Prompts -->
        <div class="space-y-3 mb-6 md:mb-8">
          <p class="text-gray-400 text-xs md:text-sm font-medium">Ejemplos de prompts:</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 text-xs md:text-sm">
            <button 
              @click="setExamplePrompt(`Crea una imagen del hombre que te subí`)"
              class="bg-gray-800/50 border border-gray-700 rounded-lg p-2 md:p-3 text-left text-gray-300 hover:bg-gray-700/50 hover:border-gray-600 transition-colors"
            >
              "Crea una imagen del hombre agregale una gorra roja y cambia su color de camisa"
            </button>
            <button 
              @click="setExamplePrompt(`Una ciudad futurista con rascacielos de cristal y autos voladores`)"
              class="bg-gray-800/50 border border-gray-700 rounded-lg p-2 md:p-3 text-left text-gray-300 hover:bg-gray-700/50 hover:border-gray-600 transition-colors"
            >
              "Una ciudad futurista con rascacielos de cristal y autos voladores"
            </button>
            <button 
              @click="setExamplePrompt(`Un bosque mágico con árboles brillantes y criaturas fantasía`)"
              class="hidden md:block bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-left text-gray-300 hover:bg-gray-700/50 hover:border-gray-600 transition-colors"
            >
              "Un bosque mágico con árboles brillantes y criaturas fantasía"
            </button>
            <button 
              @click="setExamplePrompt(`Una playa tropical al atardecer con palmeras y agua cristalina`)"
              class="hidden md:block bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-left text-gray-300 hover:bg-gray-700/50 hover:border-gray-600 transition-colors"
            >
              "Una playa tropical al atardecer con palmeras y agua cristalina"
            </button>
          </div>
        </div>
      </div>

      <!-- Main Interface -->
      <div class="max-w-4xl mx-auto px-4 md:px-6">
        <!-- Input Section -->
        <div class="relative mb-6 md:mb-8">
          <div class="flex items-center bg-gray-800 border border-gray-700 rounded-full px-4 md:px-6 py-3 md:py-4 hover:border-gray-600 focus-within:border-gray-500 transition-colors">
            <UIcon name="i-heroicons-question-mark-circle" class="text-gray-400 mr-3 md:mr-4 h-4 md:h-5 w-4 md:w-5" />
            <input 
              v-model="mainPrompt" 
              @keyup.enter="executePrompt"
:placeholder="conversationHistory.length > 0 ? 'Continúa editando...' : selectedFiles.length > 0 ? `Edita ${selectedFiles.length} imagen${selectedFiles.length > 1 ? 'es' : ''}...` : 'Describe la imagen...'"
              class="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm md:text-base"
            />
            <button 
              @click="fileInput?.click()"
              :class="[
                'mr-2 md:mr-3 transition-colors p-1 rounded-full relative',
                selectedFiles.length > 0 
                  ? 'text-green-400 hover:text-green-300 bg-green-400/10 hover:bg-green-400/20' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              ]"
              :title="selectedFiles.length > 0 ? `${selectedFiles.length} imagen${selectedFiles.length > 1 ? 'es' : ''} seleccionada${selectedFiles.length > 1 ? 's' : ''}` : 'Subir imágenes'"
            >
              <UIcon :name="selectedFiles.length > 0 ? 'i-heroicons-photo' : 'i-heroicons-plus'" class="h-4 md:h-5 w-4 md:w-5" />
              <span v-if="selectedFiles.length > 0" class="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {{ selectedFiles.length }}
              </span>
            </button>
            <UIcon name="i-heroicons-arrow-right" class="text-gray-400 ml-1 h-4 md:h-5 w-4 md:w-5" />
          </div>
        </div>
        
        <!-- Selected Images Preview -->
        <div v-if="selectedFiles.length > 0" class="mb-4 md:mb-6">
          <div class="bg-gray-800/30 border border-gray-600 rounded-xl p-4">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center">
                <UIcon name="i-heroicons-photo" class="h-4 w-4 text-green-400 mr-2" />
                <span class="text-gray-300 text-sm font-medium">
                  {{ selectedFiles.length }} imagen{{ selectedFiles.length > 1 ? 'es' : '' }} seleccionada{{ selectedFiles.length > 1 ? 's' : '' }}
                </span>
              </div>
              <UButton 
                @click="clearSelectedImages"
                size="xs"
                variant="ghost"
                color="neutral"
                class="text-gray-400 hover:text-white"
              >
                <UIcon name="i-heroicons-x-mark" class="h-3 w-3 mr-1" />
                Limpiar
              </UButton>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              <div 
                v-for="(file, index) in selectedFiles" 
                :key="index"
                class="relative group aspect-square bg-gray-700 rounded-lg overflow-hidden border-2 border-gray-600 hover:border-yellow-400 transition-colors"
              >
                <img 
                  :src="getImagePreview(file)" 
                  :alt="`Imagen ${index + 1}`"
                  class="w-full h-full object-cover"
                />
                <button 
                  @click="removeImage(index)"
                  class="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow-lg touch-manipulation"
                >
                  <UIcon name="i-heroicons-x-mark" class="h-4 w-4" />
                </button>
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white text-xs p-2">
                  <div class="truncate font-medium">{{ file.name }}</div>
                  <div class="text-gray-300">{{ (file.size / 1024 / 1024).toFixed(1) }}MB</div>
                </div>
                <div class="absolute top-1 left-1 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">
                  {{ index + 1 }}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Context Indicator -->
        <div v-if="conversationHistory.length > 0" class="mb-4 md:mb-6">
          <div class="bg-gray-800/30 border border-gray-600 rounded-xl p-4">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center">
                <UIcon name="i-heroicons-clock" class="h-4 w-4 text-yellow-400 mr-2" />
                <span class="text-gray-300 text-sm font-medium">Contexto activo</span>
                <span v-if="selectedFiles.length > 0" class="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  {{ selectedFiles.length }} img
                </span>
              </div>
              <UButton 
                @click="resetContext"
                size="xs"
                variant="ghost"
                color="neutral"
                class="text-gray-400 hover:text-white"
              >
                <UIcon name="i-heroicons-arrow-path" class="h-3 w-3 mr-1" />
                Reiniciar
              </UButton>
            </div>
            <div class="text-gray-400 text-xs">
              <span class="font-mono bg-gray-900/50 px-2 py-1 rounded">
                {{ conversationHistory.slice(-2).join(' → ') }}
              </span>
            </div>
            <p class="text-gray-500 text-xs mt-2">
              Las próximas ediciones mantendrán este contexto automáticamente
            </p>
          </div>
        </div>
        
        <!-- Action Button -->
        <div class="flex justify-center mb-8 md:mb-12">
          <UButton 
            @click="executePrompt"
            :loading="isProcessing"
            class="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 md:px-8 py-3 rounded-full transition-colors text-sm md:text-base"
            size="lg"
          >
            <template #leading>
              <span class="text-sm">↵</span>
            </template>
            {{ isProcessing ? 'Generando...' : 'Generar' }}
          </UButton>
        </div>
        
        <!-- Loading Animation -->
        <div v-if="isProcessing" class="flex flex-col items-center mb-8 p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700">
          <div class="flex items-center mb-4">
            <div class="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-3 animate-spin">
              <UIcon name="i-heroicons-sparkles" class="h-4 w-4 text-black" />
            </div>
            <div class="flex space-x-1">
              <div class="w-2 h-2 bg-yellow-400 rounded-full thinking-dot" style="animation: thinking 1.5s infinite;"></div>
              <div class="w-2 h-2 bg-yellow-400 rounded-full thinking-dot" style="animation: thinking 1.5s infinite;"></div>
              <div class="w-2 h-2 bg-yellow-400 rounded-full thinking-dot" style="animation: thinking 1.5s infinite;"></div>
            </div>
          </div>
          <p class="text-gray-200 text-sm font-medium mb-2">
            {{ selectedFiles.length > 0 ? `Procesando ${selectedFiles.length} imagen${selectedFiles.length > 1 ? 'es' : ''} con IA` : 'Generando con IA' }}
          </p>
          <p class="text-gray-400 text-xs">Esto puede tomar unos segundos...</p>
        </div>

        <!-- File Upload (Hidden) -->
        <input 
          ref="fileInput"
          type="file"
          accept="image/*"
          multiple
          @change="handleImageUpload"
          class="hidden"
        />
        
        <!-- Upload Area -->
        <div 
          @click="fileInput?.click()"
          @drop="handleDrop"
          @dragover.prevent
          @dragenter.prevent
          class="border-2 border-dashed border-gray-700 rounded-2xl p-8 md:p-12 text-center hover:border-gray-600 transition-colors cursor-pointer mb-6 md:mb-8"
        >
          <UIcon name="i-heroicons-arrow-up-tray" class="h-8 md:h-12 w-8 md:w-12 text-gray-500 mx-auto mb-3 md:mb-4" />
          <p class="text-gray-400 text-base md:text-lg">Haz clic para subir o arrastra imágenes aquí</p>
          <p class="text-gray-500 text-xs md:text-sm mt-2">Soporta JPG, PNG, GIF, WebP • Múltiples archivos permitidos</p>
        </div>

        <!-- AI Response Display -->
        <div v-if="aiResponse || generatedImages.length > 0" class="bg-gray-900 border border-gray-700 rounded-2xl p-4 md:p-6 mb-6 md:mb-8">
          <div class="flex items-center mb-4">
            <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
              <UIcon name="i-heroicons-sparkles" class="h-4 w-4 text-white" />
            </div>
            <span class="text-gray-300 text-sm font-medium">Respuesta IA</span>
          </div>
          
          <!-- Generated Images -->
          <div v-if="generatedImages.length > 0" class="mb-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="(imageUrl, index) in generatedImages" :key="index" class="relative group">
                <img 
                  :src="imageUrl" 
                  :alt="`Imagen generada ${index + 1}`"
                  class="w-full rounded-lg border border-gray-600 hover:border-gray-500 transition-colors"
                />
                <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <UButton 
                    @click="downloadImage(imageUrl, index)"
                    icon="i-heroicons-arrow-down-tray"
                    size="xs"
                    color="primary"
                    variant="solid"
                    class="backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <!-- Text Response -->
          <div v-if="aiResponse" class="text-gray-100 whitespace-pre-wrap leading-relaxed">{{ aiResponse }}</div>
        </div>
        
        <!-- Action Buttons -->
        <div v-if="aiResponse || generatedImages.length > 0" class="flex justify-center gap-4 mb-6 md:mb-8">
          <button 
            @click="clearAll"
            class="group flex items-center px-4 md:px-6 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-gray-400 hover:text-red-400 hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-200 text-sm md:text-base"
          >
            <UIcon name="i-heroicons-trash" class="h-4 w-4 mr-2 group-hover:animate-pulse" />
            <span class="hidden sm:inline">Limpiar Todo</span>
            <span class="sm:hidden">Limpiar</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PWAInstallButton from '~/components/PWAInstallButton.vue';

const { $gemini } = useNuxtApp();
const toast = useToast();
const { isLoggedIn, user: authUser } = useAuth();

// State
const mainPrompt = ref('');
const selectedFiles = ref<File[]>([]);
const aiResponse = ref('');
const generatedImages = ref<string[]>([]);

// Context persistence
const conversationHistory = ref<string[]>([]);
const currentImageContext = ref<string>('');


// Loading states
const isProcessing = ref(false);

// Intro animation state
const showIntro = ref(true);
const introStep = ref(0);

// File input reference
const fileInput = ref<HTMLInputElement>();


// Set example prompt
const setExamplePrompt = (prompt: string) => {
  mainPrompt.value = prompt;
  toast.add({ 
    title: '✨ Ejemplo cargado', 
    description: 'Haz clic en Generar para crear tu imagen', 
    color: 'warning',
    actions: [{
      label: 'Generar ahora',
      click: () => executePrompt()
    }]
  });
};

// Execute main prompt action
const executePrompt = async () => {
  // Check authentication first
  if (!isLoggedIn.value) {
    toast.add({ 
      title: '🔐 Inicia sesión requerido', 
      description: 'Debes iniciar sesión con Google para generar imágenes',
      color: 'warning',
      timeout: 5000,
      actions: [{
        label: 'Iniciar sesión',
        click: () => {
          // Scroll to the auth button
          document.querySelector('.absolute.top-4.right-4')?.scrollIntoView({ behavior: 'smooth' });
        }
      }]
    });
    return;
  }

  if (!mainPrompt.value.trim()) {
    toast.add({ 
      title: '⚠️ Campo vacío', 
      description: 'Por favor ingresa un prompt para continuar',
      color: 'warning'
    });
    return;
  }

  isProcessing.value = true;
  try {
    let response;
    let contextualPrompt = mainPrompt.value;
    
    // Build contextual prompt if there's conversation history
    if (conversationHistory.value.length > 0) {
      const context = conversationHistory.value.join(' -> ');
      contextualPrompt = `Contexto previo: ${context}. Ahora: ${mainPrompt.value}`;
    }
    
    // Determine action based on context
    if (selectedFiles.value.length > 0) {
      // If there are uploaded files, analyze all of them
      response = await $gemini.analyzeImage(selectedFiles.value, contextualPrompt);
    } else {
      // Otherwise, generate image concept
      response = await $gemini.generateImage(contextualPrompt);
    }
    
    // Add current prompt to conversation history
    conversationHistory.value.push(mainPrompt.value);
    
    // Limit history to last 5 interactions to avoid very long prompts
    if (conversationHistory.value.length > 5) {
      conversationHistory.value = conversationHistory.value.slice(-5);
    }
    
    // Update current context
    currentImageContext.value = mainPrompt.value;
    
    // Handle response with both text and images
    aiResponse.value = response.text;
    
    // Store generated images for display in AI Response section
    if (response.images && response.images.length > 0) {
      generatedImages.value = response.images;
      toast.add({ 
        title: `🎨 ¡${response.images.length} imagen${response.images.length > 1 ? 'es' : ''} generada${response.images.length > 1 ? 's' : ''}!`, 
        description: 'Tu creación está lista. Puedes continuar editando',
        color: 'success',
        actions: [{
          label: 'Ver resultado',
          click: () => {
            document.querySelector('.bg-gray-900.border.border-gray-700')?.scrollIntoView({ behavior: 'smooth' });
          }
        }]
      });
    } else {
      generatedImages.value = [];
      toast.add({ 
        title: '🤖 ¡Respuesta de IA lista!', 
        description: 'Tu análisis está completo. Puedes continuar editando',
        color: 'info',
        actions: [{
          label: 'Ver respuesta',
          click: () => {
            document.querySelector('.bg-gray-900.border.border-gray-700')?.scrollIntoView({ behavior: 'smooth' });
          }
        }]
      });
    }
    
    // Clear the input for next edit
    mainPrompt.value = '';
    
  } catch (error) {
    console.error('Error processing prompt:', error);
    toast.add({ 
      title: '❌ Error de procesamiento', 
      description: 'Ocurrió un problema al procesar tu solicitud. Intenta nuevamente.',
      color: 'error',
      actions: [{
        label: 'Reintentar',
        click: () => executePrompt()
      }]
    });
  } finally {
    isProcessing.value = false;
  }
};

// Handle file upload
const handleImageUpload = (event: Event) => {
  // Check authentication first
  if (!isLoggedIn.value) {
    toast.add({ 
      title: '🔐 Inicia sesión requerido', 
      description: 'Debes iniciar sesión con Google para subir imágenes',
      color: 'warning',
      timeout: 5000,
      actions: [{
        label: 'Iniciar sesión',
        click: () => {
          document.querySelector('.absolute.top-4.right-4')?.scrollIntoView({ behavior: 'smooth' });
        }
      }]
    });
    return;
  }

  const target = event.target as HTMLInputElement;
  const files = Array.from(target.files || []);
  
  if (files.length === 0) return;
  
  const validFiles = files.filter(file => file.type.startsWith('image/'));
  const invalidCount = files.length - validFiles.length;
  
  if (validFiles.length > 0) {
    processFiles(validFiles);
  }
  
  if (invalidCount > 0) {
    toast.add({ 
      title: '⚠️ Algunos archivos ignorados', 
      description: `${invalidCount} archivo${invalidCount > 1 ? 's' : ''} no ${invalidCount > 1 ? 'son' : 'es'} imagen${invalidCount > 1 ? 'es' : ''} válida${invalidCount > 1 ? 's' : ''}`,
      color: 'warning'
    });
  }
};

// Handle drag and drop
const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  
  // Check authentication first
  if (!isLoggedIn.value) {
    toast.add({ 
      title: '🔐 Inicia sesión requerido', 
      description: 'Debes iniciar sesión con Google para subir imágenes',
      color: 'warning',
      timeout: 5000,
      actions: [{
        label: 'Iniciar sesión',
        click: () => {
          document.querySelector('.absolute.top-4.right-4')?.scrollIntoView({ behavior: 'smooth' });
        }
      }]
    });
    return;
  }

  const files = Array.from(event.dataTransfer?.files || []);
  
  if (files.length === 0) return;
  
  const validFiles = files.filter(file => file.type.startsWith('image/'));
  const invalidCount = files.length - validFiles.length;
  
  if (validFiles.length > 0) {
    processFiles(validFiles);
  }
  
  if (invalidCount > 0) {
    toast.add({ 
      title: '⚠️ Algunos archivos ignorados', 
      description: `${invalidCount} archivo${invalidCount > 1 ? 's' : ''} no ${invalidCount > 1 ? 'son' : 'es'} imagen${invalidCount > 1 ? 'es' : ''} válida${invalidCount > 1 ? 's' : ''}`,
      color: 'warning'
    });
  }
};

// Process uploaded files
const processFiles = (files: File[]) => {
  selectedFiles.value = [...selectedFiles.value, ...files];
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  
  toast.add({ 
    title: `📸 ${files.length} imagen${files.length > 1 ? 'es' : ''} cargada${files.length > 1 ? 's' : ''}`, 
    description: `Total: ${(totalSize / 1024 / 1024).toFixed(2)}MB. Listo${files.length > 1 ? 's' : ''} para procesar`,
    color: 'success',
    actions: [{
      label: 'Analizar ahora',
      click: () => {
        if (!mainPrompt.value.trim()) {
          mainPrompt.value = files.length > 1 ? 'Describe estas imágenes en detalle' : 'Describe esta imagen en detalle';
        }
        executePrompt();
      }
    }]
  });
};

// Get image preview URL
const getImagePreview = (file: File): string => {
  return URL.createObjectURL(file);
};

// Remove individual image
const removeImage = (index: number) => {
  selectedFiles.value.splice(index, 1);
  toast.add({ 
    title: '🗑️ Imagen eliminada', 
    description: 'La imagen ha sido removida de la selección',
    color: 'neutral'
  });
};

// Clear all selected images
const clearSelectedImages = () => {
  selectedFiles.value = [];
  toast.add({ 
    title: '🗑️ Imágenes limpiadas', 
    description: 'Todas las imágenes han sido removidas',
    color: 'neutral'
  });
};

// Reset conversation context
const resetContext = () => {
  conversationHistory.value = [];
  currentImageContext.value = '';
  toast.add({ 
    title: '🔄 Contexto reiniciado', 
    description: 'Nueva conversación iniciada. El historial se ha limpiado.',
    color: 'info'
  });
};

// Download generated image
const downloadImage = (imageUrl: string, index: number) => {
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = `visioncraft-generada-${index + 1}.png`;
  link.click();
  toast.add({ 
    title: '💾 Descarga iniciada', 
    description: `visioncraft-generada-${index + 1}.png se está descargando`,
    color: 'success'
  });
};

// Clear all data
const clearAll = () => {
  selectedFiles.value = [];
  aiResponse.value = '';
  generatedImages.value = [];
  mainPrompt.value = '';
  conversationHistory.value = [];
  currentImageContext.value = '';
  
  toast.add({ 
    title: '🗑️ Datos limpiados', 
    description: 'Toda la información ha sido eliminada. Puedes empezar de nuevo.',
    color: 'neutral'
  });
};

// Intro animation sequence
onMounted(() => {
  // Step 1: Show logo
  setTimeout(() => {
    introStep.value = 1;
  }, 300);
  
  // Step 2: Show IA badge
  setTimeout(() => {
    introStep.value = 2;
  }, 800);
  
  // Step 3: Show tagline
  setTimeout(() => {
    introStep.value = 3;
  }, 1300);
  
  // Step 4: Show loading bars
  setTimeout(() => {
    introStep.value = 4;
  }, 1800);
  
  // Hide intro and show main app
  setTimeout(() => {
    showIntro.value = false;
  }, 3500);
});
</script>

<style scoped>
/* Custom loading animation */
@keyframes thinking {
  0%, 20% { opacity: 0.2; }
  50% { opacity: 1; }
  100% { opacity: 0.2; }
}

.thinking-dot:nth-child(1) { animation-delay: 0s; }
.thinking-dot:nth-child(2) { animation-delay: 0.2s; }
.thinking-dot:nth-child(3) { animation-delay: 0.4s; }

/* Intro transition animations */
.intro-enter-active {
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.intro-leave-active {
  transition: all 1s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.intro-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.intro-leave-to {
  opacity: 0;
  transform: scale(1.1);
  filter: blur(10px);
}

/* Additional gradient text animation */
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.gradient-animate {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

/* Floating particles effect */
@keyframes float-up {
  0% {
    opacity: 0;
    transform: translateY(100vh) scale(0);
  }
  10% {
    opacity: 1;
    transform: translateY(90vh) scale(1);
  }
  90% {
    opacity: 1;
    transform: translateY(-10vh) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-20vh) scale(0);
  }
}

.float-particle {
  animation: float-up 4s linear infinite;
}
</style>