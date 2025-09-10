// Global authentication state
export const useAuth = () => {
  const isLoggedIn = useState('auth.isLoggedIn', () => false)
  const user = useState('auth.user', () => null)

  const checkAuth = () => {
    if (process.client) {
      const savedUser = localStorage.getItem('googleUser')
      const savedSignedIn = localStorage.getItem('isSignedIn')
      
      if (savedUser && savedUser !== 'undefined' && savedSignedIn === 'true') {
        try {
          const parsedUser = JSON.parse(savedUser)
          if (parsedUser && typeof parsedUser === 'object') {
            user.value = parsedUser
            isLoggedIn.value = true
            return true
          }
        } catch (error) {
          console.error('Error parsing saved user:', error)
          localStorage.removeItem('googleUser')
          localStorage.removeItem('isSignedIn')
        }
      }
    }
    return false
  }

  const setAuth = (userData: any) => {
    user.value = userData
    isLoggedIn.value = true
  }

  const clearAuth = () => {
    user.value = null
    isLoggedIn.value = false
  }

  return {
    isLoggedIn: readonly(isLoggedIn),
    user: readonly(user),
    checkAuth,
    setAuth,
    clearAuth
  }
}