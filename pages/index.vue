<template>
  <div class="min-h-screen bg-black text-white relative">
    
    
    <!-- Particles starfield background -->
    <div class="fixed inset-0 z-0">
      <vue-particles 
        id="tsparticles"
        :options="particlesConfig"
        class="absolute inset-0"
      />
    </div>
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
    <div class="flex flex-col items-center justify-center pt-8 md:pt-16 pb-4 md:pb-6 px-4 relative z-10">
      <!-- Auth Button - Top Right - Responsive -->
      <div class="absolute top-3 right-3 md:top-4 md:right-4 z-40">
        <AuthButton />
      </div>
      
      <h1 class="text-3xl md:text-4xl font-normal text-white mb-4 md:mb-6">VisionCraft IA</h1>
      
      <!-- Description and Examples -->
      <div class="text-center mb-4 md:mb-6 max-w-3xl mx-auto px-4">
        <p class="text-gray-300 text-base md:text-lg mb-6 md:mb-8">
          Crea, analiza y edita imágenes con inteligencia artificial
        </p>
        
        <!-- Example Prompts -->
        <div class="space-y-3 mb-4 md:mb-6">
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
    </div>

    <!-- Main Interface -->
    <div class="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        <!-- Input Section -->
        <div class="relative mb-6 md:mb-8">
          <div class="group relative">
            <!-- Glass morphism container with glow -->
            <div class="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-yellow-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div class="relative bg-gray-900/70 backdrop-blur-xl border border-gray-700/50 rounded-2xl px-4 md:px-6 py-4 md:py-5 hover:border-gray-600/50 focus-within:border-orange-500/50 transition-all duration-300 shadow-lg">
              <div class="flex items-center">
                <!-- Enhanced textarea -->
                <textarea 
                  v-model="mainPrompt" 
                  @input="autoResize"
                  @keydown.enter="handleEnter"
                  rows="1"
                  :placeholder="conversationHistory.length > 0 ? 'Continúa editando con IA...' : selectedFiles.length > 0 ? `Edita ${selectedFiles.length} imagen${selectedFiles.length > 1 ? 'es' : ''} con IA...` : 'Describe tu imagen perfecta... (Enter para generar)'"
                  class="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm md:text-base resize-none overflow-hidden font-medium leading-relaxed"
                ></textarea>
                
                <!-- Enhanced action buttons -->
                <div class="flex items-center space-x-2 ml-3">
                  <!-- Upload Button -->
                  <button 
                    @click="fileInput?.click()"
                    :class="[
                      'relative transition-all duration-200 p-2.5 rounded-xl group/btn',
                      selectedFiles.length > 0 
                        ? 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 hover:text-orange-300 hover:scale-105' 
                        : 'bg-gray-700/50 text-gray-400 hover:bg-orange-500/20 hover:text-orange-400 hover:scale-105'
                    ]"
                    :title="selectedFiles.length > 0 ? `${selectedFiles.length} imagen${selectedFiles.length > 1 ? 'es' : ''} seleccionada${selectedFiles.length > 1 ? 's' : ''}` : 'Subir imágenes'"
                  >
                    <UIcon 
                      :name="selectedFiles.length > 0 ? 'i-heroicons-photo' : 'i-heroicons-plus'" 
                      class="h-4 w-4 transition-transform group-hover/btn:scale-110" 
                    />
                    <span v-if="selectedFiles.length > 0" class="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">
                      {{ selectedFiles.length }}
                    </span>
                  </button>
                  
                  <!-- Generate Button -->
                  <button
                    @click="executePrompt"
                    :disabled="!mainPrompt.trim()"
                    :class="[
                      'relative transition-all duration-200 p-2.5 rounded-xl group/send overflow-hidden',
                      !mainPrompt.trim() 
                        ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed opacity-50' 
                        : 'bg-gradient-to-r from-orange-500 to-yellow-500 text-black hover:from-orange-400 hover:to-yellow-400 hover:scale-105 shadow-lg hover:shadow-orange-500/25'
                    ]"
                    :title="!mainPrompt.trim() ? 'Escribe algo para generar' : 'Generar con IA'"
                  >
                    <UIcon 
                      name="i-heroicons-paper-airplane" 
                      :class="[
                        'h-4 w-4 transition-all duration-200',
                        !mainPrompt.trim() ? '' : 'group-hover/send:scale-110 group-hover/send:translate-x-0.5'
                      ]"
                    />
                    <!-- Shimmer effect -->
                    <div v-if="mainPrompt.trim()" class="absolute inset-0 -top-[2px] -left-[100px] bg-gradient-to-r from-transparent via-white/20 to-transparent w-[100px] transform rotate-12 group-hover/send:animate-shimmer"></div>
                  </button>
                </div>
              </div>
            </div>
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
                class="text-gray-400 hover:text-red-400"
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
                class="text-gray-400 hover:text-red-400"
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
        
        <!-- AI Response Display -->
        <div v-if="aiResponse || generatedImages.length > 0" class="bg-gray-800/30 border border-gray-600 rounded-2xl p-4 md:p-6 mb-6 md:mb-8">
          <div class="flex items-center mb-4">
            <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
              <UIcon name="i-heroicons-sparkles" class="h-4 w-4 text-white" />
            </div>
            <span class="text-gray-300 text-sm font-medium">Resultado Generado</span>
          </div>
          
          <!-- Text Response -->
          <div v-if="aiResponse" class="text-gray-100 whitespace-pre-wrap leading-relaxed mb-6">{{ aiResponse }}</div>
          
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
      </div>
      
      <!-- Testimonials Section -->
      <div class="max-w-6xl mx-auto px-4 md:px-6 py-16 relative z-10">
        <div class="text-center mb-12">
          <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">Lo que dicen nuestros usuarios</h2>
          <p class="text-gray-400 text-lg">Descubre cómo VisionCraft AI está transformando la creatividad</p>
        </div>
        
        <!-- Infinite Moving Cards -->
        <div class="relative overflow-hidden">
          <div class="flex animate-scroll-left">
            <!-- First set of testimonials -->
            <div 
              v-for="(testimonial, index) in testimonials" 
              :key="index"
              class="flex-shrink-0 w-80 mx-4"
            >
              <CardSpotlight class="h-full">
                <div class="flex items-center mb-4">
                  <div class="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {{ testimonial.avatar }}
                  </div>
                  <div class="ml-3">
                    <h4 class="text-white font-medium">{{ testimonial.name }}</h4>
                    <p class="text-gray-400 text-sm">{{ testimonial.role }}</p>
                  </div>
                </div>
                <p class="text-gray-300 text-sm leading-relaxed mb-4">{{ testimonial.comment }}</p>
                <div class="flex text-yellow-400">
                  <UIcon v-for="i in testimonial.rating" :key="i" name="i-heroicons-star-solid" class="h-4 w-4" />
                </div>
              </CardSpotlight>
            </div>
            
            <!-- Duplicate set for seamless loop -->
            <div 
              v-for="(testimonial, index) in testimonials" 
              :key="'duplicate-' + index"
              class="flex-shrink-0 w-80 mx-4"
            >
              <CardSpotlight class="h-full">
                <div class="flex items-center mb-4">
                  <div class="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {{ testimonial.avatar }}
                  </div>
                  <div class="ml-3">
                    <h4 class="text-white font-medium">{{ testimonial.name }}</h4>
                    <p class="text-gray-400 text-sm">{{ testimonial.role }}</p>
                  </div>
                </div>
                <p class="text-gray-300 text-sm leading-relaxed mb-4">{{ testimonial.comment }}</p>
                <div class="flex text-yellow-400">
                  <UIcon v-for="i in testimonial.rating" :key="i" name="i-heroicons-star-solid" class="h-4 w-4" />
                </div>
              </CardSpotlight>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <footer class="relative mt-20 overflow-hidden">
        <!-- Gradient background -->
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent"></div>
        
        <!-- Content -->
        <div class="relative z-10 py-12 px-4 md:px-6">
          <div class="max-w-6xl mx-auto">
            
            <!-- Main footer content -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              
              <!-- Brand section -->
              <div class="text-center md:text-left">
                <h3 class="text-xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2">
                  VisionCraft AI
                </h3>
                <p class="text-gray-400 text-sm leading-relaxed">
                  Transformando ideas en imágenes extraordinarias con el poder de la inteligencia artificial.
                </p>
                <div class="flex justify-center md:justify-start mt-4 space-x-4">
                  <div class="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style="animation-delay: 0.5s;"></div>
                  <div class="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style="animation-delay: 1s;"></div>
                </div>
              </div>
              
              <!-- Features -->
              <div class="text-center md:text-left">
                <h4 class="text-white font-semibold mb-3">Características</h4>
                <ul class="space-y-2 text-sm text-gray-400">
                  <li class="flex items-center justify-center md:justify-start">
                    <UIcon name="i-heroicons-sparkles" class="h-3 w-3 text-yellow-400 mr-2" />
                    Generación con IA
                  </li>
                  <li class="flex items-center justify-center md:justify-start">
                    <UIcon name="i-heroicons-photo" class="h-3 w-3 text-orange-400 mr-2" />
                    Edición avanzada
                  </li>
                  <li class="flex items-center justify-center md:justify-start">
                    <UIcon name="i-heroicons-eye" class="h-3 w-3 text-yellow-400 mr-2" />
                    Análisis de imágenes
                  </li>
                  <li class="flex items-center justify-center md:justify-start">
                    <UIcon name="i-heroicons-bolt" class="h-3 w-3 text-orange-400 mr-2" />
                    Resultados instantáneos
                  </li>
                </ul>
              </div>
              
              <!-- Contact & Social -->
              <div class="text-center md:text-left">
                <h4 class="text-white font-semibold mb-3">Conecta con nosotros</h4>
                <div class="space-y-2 text-sm text-gray-400">
                  <div class="flex items-center justify-center md:justify-start">
                    <UIcon name="i-heroicons-envelope" class="h-3 w-3 text-orange-400 mr-2" />
                    hello@visioncraft.ai
                  </div>
                  <div class="flex items-center justify-center md:justify-start">
                    <UIcon name="i-heroicons-globe-alt" class="h-3 w-3 text-yellow-400 mr-2" />
                    www.visioncraft.ai
                  </div>
                </div>
                
                <!-- Social links placeholder -->
                <div class="flex justify-center md:justify-start space-x-3 mt-4">
                  <div class="w-8 h-8 bg-gray-700/50 rounded-full flex items-center justify-center hover:bg-orange-500/20 transition-colors cursor-pointer">
                    <UIcon name="i-heroicons-heart" class="h-4 w-4 text-gray-400 hover:text-orange-400" />
                  </div>
                  <div class="w-8 h-8 bg-gray-700/50 rounded-full flex items-center justify-center hover:bg-yellow-500/20 transition-colors cursor-pointer">
                    <UIcon name="i-heroicons-star" class="h-4 w-4 text-gray-400 hover:text-yellow-400" />
                  </div>
                  <div class="w-8 h-8 bg-gray-700/50 rounded-full flex items-center justify-center hover:bg-orange-500/20 transition-colors cursor-pointer">
                    <UIcon name="i-heroicons-fire" class="h-4 w-4 text-gray-400 hover:text-orange-400" />
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Separator -->
            <div class="border-t border-gray-800 pt-6">
              
              <!-- Made with love section -->
              <div class="flex flex-col md:flex-row items-center justify-between">
                
                <!-- Love message -->
                <div class="flex items-center space-x-2 mb-4 md:mb-0">
                  <span class="text-sm text-gray-400">Hecho con</span>
                  <div class="relative">
                    <div class="text-red-500 text-lg animate-pulse">❤️</div>
                    <div class="absolute inset-0 text-red-500 text-lg animate-ping opacity-20">❤️</div>
                  </div>
              
                  <span class="text-sm text-gray-400">en España</span>

                </div>
                
                <!-- Copyright -->
                <div class="text-center md:text-right">
                  <p class="text-xs text-white">
                    © 2025 VisionCraft AI. Todos los derechos reservados.
                  </p>
                  <p class="text-xs text-white mt-1">
                    Creando el futuro de la imagen digital
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Decorative elements -->
            <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-50"></div>
          </div>
        </div>
        
        <!-- Background decoration -->
        <div class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        
        <!-- Floating particles -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            v-for="i in 8" 
            :key="i"
            class="absolute w-1 h-1 bg-orange-400/30 rounded-full animate-pulse"
            :style="{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              animationDuration: (Math.random() * 2 + 2) + 's'
            }"
          ></div>
        </div>
      </footer>
  </div>
</template>

<script setup lang="ts">
import PWAInstallButton from '~/components/PWAInstallButton.vue';
import BackgroundLines from '~/components/BackgroundLines.vue';
import CardSpotlight from '~/components/CardSpotlight.vue';

const { $gemini } = useNuxtApp();
const toast = useToast();
const { isLoggedIn, user: authUser } = useAuth();

// Particles configuration
const particlesConfig = {
  background: {
    color: {
      value: "transparent",
    },
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: false,
      },
      onHover: {
        enable: false,
      },
      resize: true,
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "out",
      },
      random: true,
      speed: 0.1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 120,
    },
    opacity: {
      value: 0.3,
      random: true,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 0.5, max: 1.5 },
    },
  },
  detectRetina: true,
};

// State
const mainPrompt = ref('');
const selectedFiles = ref<File[]>([]);
const aiResponse = ref('');
const generatedImages = ref<string[]>([]);

// Context persistence
const conversationHistory = ref<string[]>([]);
const currentImageContext = ref<string>('');

// Testimonials data
const testimonials = ref([
  {
    name: "Ana García",
    role: "Diseñadora Gráfica",
    avatar: "AG",
    rating: 5,
    comment: "VisionCraft AI ha revolucionado mi flujo de trabajo. Puedo crear imágenes increíbles en segundos y editarlas con precisión."
  },
  {
    name: "Carlos Mendez",
    role: "Content Creator",
    avatar: "CM",
    rating: 5,
    comment: "La calidad de las imágenes generadas es sorprendente. Es como tener un diseñador profesional disponible 24/7."
  },
  {
    name: "María Rodriguez",
    role: "Marketing Manager",
    avatar: "MR",
    rating: 5,
    comment: "Desde que uso VisionCraft, nuestras campañas visuales han mejorado enormemente. La IA entiende exactamente lo que necesito."
  },
  {
    name: "David Chen",
    role: "Fotógrafo",
    avatar: "DC",
    rating: 5,
    comment: "Increíble cómo puede mejorar y editar mis fotos. Es como tener un asistente de edición que nunca se cansa."
  },
  {
    name: "Laura Vásquez",
    role: "Artista Digital",
    avatar: "LV",
    rating: 5,
    comment: "La precisión en las ediciones es impresionante. Puedo describir cambios complejos y los hace perfectamente."
  },
  {
    name: "Roberto Silva",
    role: "Desarrollador Web",
    avatar: "RS",
    rating: 5,
    comment: "Perfecto para crear assets para mis proyectos. La interfaz es súper intuitiva y los resultados son profesionales."
  },
  {
    name: "Elena Morales",
    role: "Social Media Manager",
    avatar: "EM",
    rating: 5,
    comment: "Genero contenido visual único para todas mis redes sociales. Cada imagen sale exactamente como la imagino."
  },
  {
    name: "Javier López",
    role: "Empresario",
    avatar: "JL",
    rating: 5,
    comment: "No tengo conocimientos de diseño, pero con VisionCraft puedo crear imágenes profesionales para mi negocio."
  },
  {
    name: "María López",
    role: "Marketing Digital",
    avatar: "ML",
    rating: 5,
    comment: "Perfecto para crear contenido para redes sociales. La IA entiende exactamente lo que necesito y lo entrega perfectamente."
  },
  {
    name: "David Torres",
    role: "Freelancer",
    avatar: "DT",
    rating: 4,
    comment: "Como freelancer, VisionCraft me ahorra horas de trabajo. Puedo ofrecer más servicios a mis clientes en menos tiempo."
  },
  {
    name: "Andrés Peña",
    role: "YouTuber",
    avatar: "AP",
    rating: 5,
    comment: "Mis thumbnails ahora tienen un nivel profesional increíble. VisionCraft entiende mi estilo y lo mejora cada vez."
  },
  {
    name: "Carmen Flores",
    role: "Ilustradora",
    avatar: "CF",
    rating: 5,
    comment: "Como ilustradora, pensé que la IA sería mi competencia, pero VisionCraft es mi mejor herramienta de trabajo."
  },
  {
    name: "Miguel Santos",
    role: "Agencia Publicitaria",
    avatar: "MS",
    rating: 5,
    comment: "Hemos reducido los tiempos de producción en un 80%. Nuestros clientes están impresionados con la calidad."
  },
  {
    name: "Isabel Herrera",
    role: "Blogger",
    avatar: "IH",
    rating: 5,
    comment: "Cada post de mi blog ahora tiene imágenes únicas y llamativas. Mi engagement ha subido considerablemente."
  },
  {
    name: "Fernando Castro",
    role: "E-commerce Owner",
    avatar: "FC",
    rating: 5,
    comment: "Las fotos de productos que genero se ven tan profesionales que mis ventas han aumentado un 40%."
  },
  {
    name: "Lucia Mendoza",
    role: "Community Manager",
    avatar: "LM",
    rating: 5,
    comment: "Gestiono 15 cuentas diferentes y VisionCraft me ayuda a mantener contenido fresco y original en todas."
  },
  {
    name: "Sofia Ruiz",
    role: "Arquitecta",
    avatar: "SR",
    rating: 5,
    comment: "Uso VisionCraft para visualizar conceptos arquitectónicos. La precisión y calidad de las imágenes es excepcional."
  },
  {
    name: "Miguel Santos",
    role: "YouTuber",
    avatar: "MS",
    rating: 4,
    comment: "Genial para crear thumbnails y gráficos para mis videos. La interfaz es súper intuitiva y fácil de usar."
  }
]);


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
};

const autoResize = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement;
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
};

const handleEnter = (event: KeyboardEvent) => {
  if (!event.shiftKey && mainPrompt.value.trim()) {
    event.preventDefault();
    executePrompt();
  }
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
    } else {
      generatedImages.value = [];
    }
    
    // Clear the input for next edit
    mainPrompt.value = '';
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.height = 'auto';
    }
    
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

/* Shimmer animation for send button */
@keyframes shimmer {
  0% { transform: translateX(-100px) rotate(12deg); }
  100% { transform: translateX(400px) rotate(12deg); }
}

.animate-shimmer {
  animation: shimmer 0.8s ease-out;
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


/* Infinite scroll animation for testimonials */
@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll-left {
  animation: scroll-left 40s linear infinite;
  will-change: transform;
}

/* Faster animation on mobile */
@media (max-width: 768px) {
  .animate-scroll-left {
    animation: scroll-left 25s linear infinite;
  }
}

/* Pause animation on hover */
.animate-scroll-left:hover {
  animation-play-state: paused;
}

</style>