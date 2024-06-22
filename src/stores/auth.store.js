import { defineStore } from 'pinia'
import { fetchWrapper } from '@/helpers/fetch.helper'

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    returnUrl: null
  }),
  actions: {
    async register(username, password) {
      try {
        const user = await fetchWrapper.post(`${baseUrl}/register`, { username, password })
      } catch (error) {
        console.log(error)
      }
    },
    async login(username, password) {
      try {
        const user = await fetchWrapper.post(`${baseUrl}/login`, { username, password })

        this.user = user

        localStorage.setItem('user', JSON.stringify(user))
      } catch (error) {
        console.log(error)
      }
    }
  }
})
