import httpClientInstance from '../httpClient'

class userApi {
  getAllUser = () => httpClientInstance.get('/users')

  deleteUser = (email: string) => httpClientInstance.delete(`/user/${email}`)

  getProfile = () => httpClientInstance.get('/profile')
}

export default new userApi()
