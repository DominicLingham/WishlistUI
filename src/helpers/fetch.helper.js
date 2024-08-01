import { getAuthHeader, handleAuthResponse } from '@/helpers/auth.helper'

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
}

function request(method) {
  return async (url, body) => {
    const authHeader = getAuthHeader() // Get the authHeader function
    const requestOptions = {
      method,
      headers: authHeader(url) // Use the authHeader function
    }
    if (body) {
      requestOptions.headers['Content-Type'] = 'application/json'
      requestOptions.body = JSON.stringify(body)
    }
    return fetch(url, requestOptions).then(handleAuthResponse) // Use handleAuthResponse function
  }
}
