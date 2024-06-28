import { defineStore } from 'pinia'
import { fetchWrapper } from '@/helpers/fetch.helper'
import router from '@/router'

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    token: null,
    returnUrl: null
  }),
  actions: {
    async register(username, password) {
      try {
        const response = await fetchWrapper.post(`${baseUrl}/register`, { username, password })

        const { user, token } = response

        this.user = user
        this.token = token

        // Store user and token in local storage
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)

        // Redirect to home or intended page
        router.push(this.returnUrl || '/')
      } catch (error) {
        console.error(error)
      }
    },
    async logout() {
      this.user = null
      this.token = null

      localStorage.removeItem('user')
      localStorage.removeItem('token')

      router.push('/login')
    }
  }
})
