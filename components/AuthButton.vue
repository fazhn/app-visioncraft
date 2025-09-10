<template>
  <div class="flex items-center gap-2 md:gap-4">
    <!-- Custom Google Sign-In Button -->
    <div v-if="!isSignedIn" class="relative">
      <!-- Desktop Button -->
      <button 
        @click="triggerGoogleSignIn"
        class="hidden md:flex items-center gap-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-full px-6 py-3 text-gray-700 font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 google-signin-animate google-signin-hover"
      >
        <div class="w-5 h-5">
          <svg viewBox="0 0 24 24" class="w-full h-full">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        </div>
        <span>Continuar con Google</span>
      </button>

      <!-- Mobile Button -->
      <button 
        @click="triggerGoogleSignIn"
        class="flex md:hidden items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-full px-4 py-2.5 text-gray-700 font-medium transition-all duration-200 hover:shadow-lg active:scale-95 text-sm google-signin-animate"
      >
        <div class="w-4 h-4">
          <svg viewBox="0 0 24 24" class="w-full h-full">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        </div>
        <span class="hidden sm:inline">Google</span>
        <UIcon name="i-heroicons-arrow-right" class="w-3 h-3 sm:hidden" />
      </button>

      <!-- Hidden GoogleSignInButton for functionality -->
      <div class="hidden">
        <GoogleSignInButton 
          @success="handleLoginSuccess" 
          @error="handleLoginError"
          ref="googleSignInRef"
        />
      </div>
    </div>

    <!-- User Menu - Responsive Implementation -->
    <div v-else-if="user" class="relative">
      <!-- Desktop User Button -->
      <button 
        @click="toggleDropdown"
        class="hidden md:flex items-center gap-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 rounded-full px-4 py-2 text-white transition-all duration-200 hover:shadow-lg backdrop-blur-sm"
      >
        <UAvatar 
          :src="user?.picture || ''"
          :alt="user?.name || 'Usuario'"
          size="xs"
          class="ring-2 ring-white/20"
        />
        <span class="text-sm font-medium truncate max-w-32">{{ user?.name || 'Usuario' }}</span>
        <UIcon name="i-heroicons-chevron-down" class="h-4 w-4 text-gray-300" />
      </button>

      <!-- Mobile User Button -->
      <button 
        @click="toggleDropdown"
        class="flex md:hidden items-center justify-center bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 rounded-full p-2 text-white transition-all duration-200 hover:shadow-lg backdrop-blur-sm"
      >
        <UAvatar 
          :src="user?.picture || ''"
          :alt="user?.name || 'Usuario'"
          size="sm"
          class="ring-2 ring-white/20"
        />
      </button>

      <!-- Responsive Dropdown -->
      <div 
        v-if="showDropdown" 
        class="absolute right-0 mt-2 w-80 md:w-80 sm:w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 backdrop-blur-sm dropdown-animate"
        @click.stop
      >
        <div class="py-2">
          <!-- User Info Header -->
          <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center space-x-3">
              <UAvatar 
                :src="user?.picture || ''"
                :alt="user?.name || 'Usuario'"
                size="md"
              />
              <div>
                <p class="font-medium text-gray-900 dark:text-white">{{ user?.name }}</p>
                <p class="text-sm text-gray-500">{{ user?.email }}</p>
              </div>
            </div>
          </div>
          
          <!-- Detailed User Information -->
          <div class="px-4 py-3 space-y-2">
            <div class="text-xs text-gray-400 uppercase tracking-wide">Información de la cuenta</div>
            
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-300">ID de Usuario:</span>
                <span class="text-gray-900 dark:text-white font-mono text-xs">{{ user?.id?.slice(0, 12) }}...</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-300">Email Verificado:</span>
                <span :class="user?.email_verified ? 'text-green-600' : 'text-red-600'">
                  {{ user?.email_verified ? '✓ Sí' : '✗ No' }}
                </span>
              </div>
              
              <div class="flex justify-between" v-if="user?.locale">
                <span class="text-gray-600 dark:text-gray-300">Idioma:</span>
                <span class="text-gray-900 dark:text-white">{{ user?.locale }}</span>
              </div>
              
              <div class="flex justify-between" v-if="user?.given_name">
                <span class="text-gray-600 dark:text-gray-300">Nombre:</span>
                <span class="text-gray-900 dark:text-white">{{ user?.given_name }}</span>
              </div>
              
              <div class="flex justify-between" v-if="user?.family_name">
                <span class="text-gray-600 dark:text-gray-300">Apellido:</span>
                <span class="text-gray-900 dark:text-white">{{ user?.family_name }}</span>
              </div>
            </div>
          </div>
          
          <!-- Actions -->
          <div class="px-4 py-2 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <button 
              @click="showUserData"
              class="w-full flex items-center px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-md transition-colors"
            >
              <UIcon name="i-heroicons-information-circle" class="h-4 w-4 mr-2" />
              Ver datos completos
            </button>
            
            <button 
              @click="handleLogout"
              class="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-md transition-colors"
            >
              <UIcon name="i-heroicons-arrow-right-on-rectangle" class="h-4 w-4 mr-2" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GoogleSignInButton } from 'vue3-google-signin'

const toast = useToast()
const { isLoggedIn, user: globalUser, setAuth, clearAuth, checkAuth } = useAuth()

// User state
const isSignedIn = ref(false)
const user = ref<any>(null)
const showDropdown = ref(false)
const googleSignInRef = ref(null)

// Trigger Google Sign-In programmatically
const triggerGoogleSignIn = () => {
  try {
    // Try to trigger the hidden Google Sign-In button
    const button = document.querySelector('[data-testid="google-signin-button"]') || 
                   document.querySelector('div[role="button"]') ||
                   googleSignInRef.value?.$el?.querySelector('button')
    
    if (button) {
      button.click()
    } else {
      // Fallback: show a loading state and redirect
      toast.add({
        title: '🔄 Iniciando Google OAuth...',
        description: 'Redirigiendo a Google para autenticación',
        color: 'info'
      })
      
      // Alternative: Direct OAuth flow
      const clientId = '48314305915-8mr1q5nf0aiqlpa8t2d0uiuf6cfrhokv.apps.googleusercontent.com'
      const redirectUri = window.location.origin
      const scope = 'openid email profile'
      const responseType = 'id_token'
      const nonce = Math.random().toString(36).substring(2, 15)
      
      const authUrl = `https://accounts.google.com/oauth/v2/auth?` +
        `client_id=${clientId}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `scope=${encodeURIComponent(scope)}&` +
        `response_type=${responseType}&` +
        `nonce=${nonce}`
      
      window.location.href = authUrl
    }
  } catch (error) {
    console.error('Error triggering Google Sign-In:', error)
    handleLoginError(error)
  }
}

// Decode JWT token
const decodeJWTPayload = (token: string) => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('Error decoding JWT:', error)
    return null
  }
}

// Handle successful login
const handleLoginSuccess = (response: any) => {
  console.log('🎉 Login Success - Full Response:', response)
  
  try {
    // Google now sends data in JWT credential token
    let userData = null
    
    if (response.credential) {
      // Decode the JWT token to get user data
      const decodedToken = decodeJWTPayload(response.credential)
      console.log('🔓 Decoded JWT Token:', decodedToken)
      
      if (decodedToken) {
        // Map JWT fields to our user object
        userData = {
          id: decodedToken.sub,
          name: decodedToken.name,
          email: decodedToken.email,
          picture: decodedToken.picture,
          given_name: decodedToken.given_name,
          family_name: decodedToken.family_name,
          email_verified: decodedToken.email_verified,
          locale: decodedToken.locale,
          aud: decodedToken.aud,
          azp: decodedToken.azp,
          iss: decodedToken.iss
        }
        
        console.log('👤 Processed User Data:', userData)
      }
    } else if (response.user) {
      // Fallback for old format
      userData = response.user
    }
    
    if (userData) {
      // Store user data locally
      user.value = userData
      isSignedIn.value = true
      
      // Store in global state
      setAuth(userData)
      
      // Store in localStorage for persistence
      if (process.client) {
        localStorage.setItem('googleUser', JSON.stringify(userData))
        localStorage.setItem('googleCredential', response.credential || '')
        localStorage.setItem('isSignedIn', 'true')
      }
      
      // Show detailed user info in toast
      toast.add({
        title: '✅ Login exitoso',
        description: `¡Bienvenido ${userData.name || 'Usuario'}! Email: ${userData.email}`,
        color: 'success',
        timeout: 5000
      })

      // Show user info in console for debugging
      console.table({
        'Nombre Completo': userData.name,
        'Primer Nombre': userData.given_name,
        'Apellido': userData.family_name,
        'Email': userData.email,
        'ID Google': userData.id,
        'Foto': userData.picture,
        'Email Verificado': userData.email_verified,
        'Idioma/Locale': userData.locale,
        'Audiencia': userData.aud,
        'Cliente Autorizado': userData.azp,
        'Emisor': userData.iss
      })
    } else {
      throw new Error('No se pudieron extraer los datos del usuario')
    }
    
  } catch (error) {
    console.error('Error handling login success:', error)
    toast.add({
      title: '⚠️ Error de autenticación',
      description: 'Hubo un problema al procesar el login',
      color: 'warning'
    })
  }
}

// Handle login error
const handleLoginError = (error: any) => {
  console.error('Login Error:', error)
  toast.add({
    title: '❌ Error de login',
    description: 'No se pudo iniciar sesión con Google',
    color: 'error'
  })
}

// Toggle dropdown
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// Close dropdown when clicking outside
const closeDropdown = () => {
  showDropdown.value = false
}

// Show complete user data
const showUserData = () => {
  closeDropdown() // Close dropdown after clicking
  if (user.value) {
    console.log('🔍 DATOS COMPLETOS DEL USUARIO:')
    console.log('================================')
    console.table(user.value)
    
    // Also show JWT credential if available
    if (process.client) {
      const credential = localStorage.getItem('googleCredential')
      if (credential) {
        console.log('🎫 JWT CREDENTIAL (Raw):')
        console.log(credential)
        
        console.log('\n🔓 JWT DECODED PAYLOAD:')
        const decoded = decodeJWTPayload(credential)
        console.table(decoded)
        
        console.log('\n📊 JWT TOKEN INFO:')
        console.log('• Tipo:', decoded?.typ || 'JWT')
        console.log('• Algoritmo:', 'RS256 (según header)')
        console.log('• Emisor:', decoded?.iss)
        console.log('• Audiencia:', decoded?.aud)
        console.log('• ID Usuario:', decoded?.sub)
        console.log('• Emitido en:', new Date((decoded?.iat || 0) * 1000).toLocaleString())
        console.log('• Expira en:', new Date((decoded?.exp || 0) * 1000).toLocaleString())
        console.log('• Client ID:', decoded?.azp)
      }
    }
    
    toast.add({
      title: '📋 Datos mostrados',
      description: 'Revisa la consola del navegador (F12) para ver todos los datos',
      color: 'info',
      timeout: 4000
    })
  }
}

// Handle logout
const handleLogout = () => {
  closeDropdown() // Close dropdown after clicking
  try {
    // Clear user data locally
    user.value = null
    isSignedIn.value = false
    
    // Clear global state
    clearAuth()
    
    // Clear localStorage
    if (process.client) {
      localStorage.removeItem('googleUser')
      localStorage.removeItem('googleCredential')
      localStorage.removeItem('isSignedIn')
    }
    
    toast.add({
      title: '👋 Sesión cerrada',
      description: 'Has cerrado sesión correctamente',
      color: 'info'
    })
  } catch (error) {
    console.error('Error during logout:', error)
  }
}

// Initialize component
onMounted(() => {
  if (process.client) {
    // Restore session
    if (checkAuth()) {
      user.value = globalUser.value
      isSignedIn.value = true
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement
      if (!target.closest('.relative')) {
        showDropdown.value = false
      }
    })

    // Add CSS animations
    const style = document.createElement('style')
    style.textContent = `
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(-10px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      
      @keyframes googlePulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.02);
        }
      }
      
      .google-signin-animate {
        animation: slideIn 0.3s ease-out;
      }
      
      .google-signin-hover:hover {
        animation: googlePulse 2s ease-in-out infinite;
      }
      
      .dropdown-animate {
        animation: slideIn 0.2s ease-out;
      }
    `
    document.head.appendChild(style)
  }

  // Clean up event listener
  onUnmounted(() => {
    if (process.client) {
      document.removeEventListener('click', closeDropdown)
    }
  })
})
</script>