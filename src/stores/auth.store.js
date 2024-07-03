import { defineStore } from 'pinia'
import { fetchWrapper } from '@/helpers/fetch.helper'
import router from '@/router'

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    token: localStorage.getItem('token'),
    returnUrl: null
  }),
  actions: {
    async register(username, password) {
      try {
        const response = await fetchWrapper.post(`${baseUrl}/register`, { username, password })

        console.log(response)

        const { user } = response

        if (user) {
          await this.login(username, password)
        }
      } catch (error) {
        console.error(error)
      }
    },
    async login(username, password) {
      const response = await fetchWrapper.post(`${baseUrl}/login`, { username, password })

      const { user, token } = response

      this.user = user
      this.token = token

      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)

      router.push(this.returnUrl || '/')
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
