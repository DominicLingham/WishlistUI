// src/helpers/auth.helper.js

import { useAuthStore } from '@/stores/auth.store'

export function getAuthHeader() {
  const authStore = useAuthStore()
  const token = authStore.token
  const isLoggedIn = !!token
  const isApiUrl = (url) => url.startsWith(import.meta.env.VITE_API_URL)

  return (url) => {
    if (isLoggedIn && isApiUrl(url)) {
      return { Authorization: `Bearer ${token}` }
    } else {
      return {}
    }
  }
}

export async function handleAuthResponse(response) {
  const isJson = response.headers?.get('content-type')?.includes('application/json')
  const data = isJson ? await response.json() : null

  if (!response.ok) {
    const authStore = useAuthStore()
    if ([401, 403].includes(response.status) && authStore.user) {
      authStore.logout()
    }

    const error = (data && data.message) || response.status
    return Promise.reject(error)
  }

  return data
}
