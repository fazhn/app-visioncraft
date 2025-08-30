<template>
  <div v-if="showInstallButton" class="relative">
    <!-- Install Button -->
    <UButton
      @click="handleInstall"
      :loading="isInstalling"
      color="primary"
      variant="solid"
      size="lg"
      class="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
    >
      <UIcon 
        name="i-heroicons-arrow-down-tray" 
        class="text-lg animate-bounce" 
        :class="{ 'animate-spin': isInstalling }"
      />
      <span class="font-semibold">
        {{ isInstalling ? 'Instalando...' : 'Descargar App' }}
      </span>
      <div class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
        <span class="text-xs font-bold text-white">!</span>
      </div>
    </UButton>

    <!-- Benefits Tooltip/Popup -->
    <div 
      v-if="showBenefits" 
      class="absolute top-full left-0 right-0 mt-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-600 z-50"
    >
      <div class="mb-3">
        <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">
          💫 Ventajas de la App
        </h4>
        <ul class="text-xs text-gray-600 dark:text-gray-300 space-y-1">
          <li class="flex items-center gap-2">
            <UIcon name="i-heroicons-check-circle" class="text-green-500 text-sm" />
            Acceso rápido desde tu escritorio
          </li>
          <li class="flex items-center gap-2">
            <UIcon name="i-heroicons-check-circle" class="text-green-500 text-sm" />
            Funciona sin conexión a internet
          </li>
          <li class="flex items-center gap-2">
            <UIcon name="i-heroicons-check-circle" class="text-green-500 text-sm" />
            Notificaciones push en tiempo real
          </li>
          <li class="flex items-center gap-2">
            <UIcon name="i-heroicons-check-circle" class="text-green-500 text-sm" />
            Experiencia nativa como app móvil
          </li>
        </ul>
      </div>
      <div class="flex gap-2">
        <UButton 
          @click="handleInstall" 
          size="xs" 
          color="primary"
          class="flex-1"
          :loading="isInstalling"
        >
          Instalar Ahora
        </UButton>
        <UButton 
          @click="showBenefits = false" 
          size="xs" 
          color="neutral" 
          variant="outline"
        >
          Después
        </UButton>
      </div>
    </div>
  </div>

  <!-- Mobile Install Banner (iOS Safari specific) -->
  <div 
    v-if="showIOSInstallBanner" 
    class="fixed bottom-0 left-0 right-0 p-4 bg-blue-600 text-white z-50 sm:hidden"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
          <UIcon name="i-heroicons-device-phone-mobile" class="text-lg" />
        </div>
        <div>
          <p class="text-sm font-medium">Instalar PagoFlash</p>
          <p class="text-xs opacity-90">Toca el botón compartir y "Agregar a inicio"</p>
        </div>
      </div>
      <UButton 
        @click="showIOSInstallBanner = false" 
        size="xs" 
        color="white" 
        variant="ghost"
        icon="i-heroicons-x-mark"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const toast = useToast();

// Reactive state
const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null);
const showInstallButton = ref(false);
const isInstalling = ref(false);
const showBenefits = ref(false);
const showIOSInstallBanner = ref(false);
const installAttempts = ref(0);

// Detect if PWA is already installed
const isPWAInstalled = ref(false);

// Check installation status
onMounted(() => {
  checkPWAStatus();
  setupInstallPromptListener();
  checkIOSSafari();
});

const checkPWAStatus = () => {
  // Check if app is running in standalone mode (already installed)
  isPWAInstalled.value = window.matchMedia('(display-mode: standalone)').matches || 
                        (window.navigator as any).standalone === true;
  
  // Only show install button if not already installed
  showInstallButton.value = !isPWAInstalled.value;
};

const setupInstallPromptListener = () => {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    
    // Stash the event so it can be triggered later
    deferredPrompt.value = e as BeforeInstallPromptEvent;
    showInstallButton.value = !isPWAInstalled.value;
    
    // Show benefits popup on first visit
    if (installAttempts.value === 0) {
      setTimeout(() => {
        showBenefits.value = true;
      }, 3000);
    }
  });

  // Listen for app installed event
  window.addEventListener('appinstalled', () => {
    isPWAInstalled.value = true;
    showInstallButton.value = false;
    showBenefits.value = false;
    
    toast.add({
      title: '¡App instalada exitosamente! 🎉',
      description: 'Ahora puedes acceder desde tu escritorio',
      color: 'success',
      timeout: 5000
    });
  });
};

const checkIOSSafari = () => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isInStandaloneMode = (window.navigator as any).standalone;
  const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  
  // Show iOS install banner if on iOS Safari and not in standalone mode
  if (isIOS && isSafari && !isInStandaloneMode && !isPWAInstalled.value) {
    setTimeout(() => {
      showIOSInstallBanner.value = true;
    }, 5000);
  }
};

const handleInstall = async () => {
  if (!deferredPrompt.value) {
    // Fallback for browsers that don't support install prompt
    handleFallbackInstall();
    return;
  }

  isInstalling.value = true;
  installAttempts.value++;
  
  try {
    // Show the install prompt
    await deferredPrompt.value.prompt();
    
    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.value.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      toast.add({
        title: 'Instalando aplicación...',
        description: 'La app se está instalando en tu dispositivo',
        color: 'info'
      });
    } else {
      toast.add({
        title: 'Instalación cancelada',
        description: 'Puedes instalar la app más tarde desde el menú',
        color: 'warning'
      });
    }
    
    // Clear the deferredPrompt
    deferredPrompt.value = null;
    showBenefits.value = false;
    
  } catch (error) {
    console.error('Error during installation:', error);
    toast.add({
      title: 'Error en la instalación',
      description: 'Intenta instalar desde el menú del navegador',
      color: 'error'
    });
  } finally {
    isInstalling.value = false;
  }
};

const handleFallbackInstall = () => {
  const isChrome = /Chrome/.test(navigator.userAgent);
  const isEdge = /Edge/.test(navigator.userAgent);
  const isFirefox = /Firefox/.test(navigator.userAgent);
  const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  
  let instructions = '';
  
  if (isChrome || isEdge) {
    instructions = 'Ve al menú del navegador (⋮) > "Instalar PagoFlash"';
  } else if (isFirefox) {
    instructions = 'Ve al menú (☰) > "Instalar esta aplicación"';
  } else if (isSafari) {
    instructions = 'Toca el botón compartir 📤 > "Agregar a pantalla de inicio"';
  } else {
    instructions = 'Busca la opción "Instalar app" en el menú de tu navegador';
  }
  
  toast.add({
    title: 'Instalación manual',
    description: instructions,
    color: 'info',
    timeout: 8000
  });
};

// Auto-hide benefits popup after 10 seconds
watch(showBenefits, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      showBenefits.value = false;
    }, 10000);
  }
});

// Toggle benefits popup on button hover
const toggleBenefits = () => {
  if (!isInstalling.value) {
    showBenefits.value = !showBenefits.value;
  }
};
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>