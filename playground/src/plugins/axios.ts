import axios from 'axios'
import { mockHandler } from '../mock/server'

export const api = axios.create({
  baseURL: '/api',
})

// Interceptor que captura requests e retorna dados mock
api.interceptors.request.use((config) => {
  const mockResponse = mockHandler(config)
  if (mockResponse) {
    return Promise.reject({ __MOCK__: true, data: mockResponse })
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.__MOCK__) {
      return { data: error.data, status: 200, statusText: 'OK', headers: {}, config: {} }
    }
    return Promise.reject(error)
  },
)
