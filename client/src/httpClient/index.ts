import axios from 'axios'

const httpClientInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
  },
  timeout: 30000,
})

httpClientInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // if (error.response.status === 401) {
    //   if (window.location.pathname !== LOGIN) {
    //     localStorage.removeItem(STORAGE_TOKEN_KEY);
    //     window.location.replace(LOGIN);
    //   }
    // }
    console.log(error)
    return Promise.reject(error)
  }
)

export const setApiClientAuthToken = (t: string) => {
  httpClientInstance.defaults.headers.common.Authorization = `Bearer ${t}`
}

export default httpClientInstance
