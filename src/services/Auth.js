import axios from 'axios'

export default class AuthService {

  constructor() {
    axios.defaults.baseURL = 'http//localhost:8000/api/'
    this.setAuthorizationHeader()
  }

  logout() {
    localStorage.removeItem('token')
    // delete axios.defaults.headers.common['Authorization']
  }

  login(email, password) {
    return axios.post('auth/login', {
      email, password
    }).then((response) => {
      // console.log(response.data.access_token)
      window.localStorage.setItem('token', response.data.access_token)
      this.setAuthorizationHeader()
    })
  }

  setAuthorizationHeader() {
    const token = window.localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  
  isAuthenticated() {
    return localStorage.getItem('token')
  }
}

export const authService = new AuthService()

// login(email, password) {
//   return axios.post('http://localhost:8000/api/login', {
//     email, password
//   }).then(data => {
//     window.localStorage.setItem('loginToken', data.data.token)
//     this.setAxiosDefaultAuthorizationHeader()
//   })
// }

// setAxiosDefaultAuthorizationHeader() {
//   const TOKEN = window.localStorage.getItem('loginToken')
//   axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`
// }

// logout() {
//   window.localStorage.removeItem('loginToken')
//   delete axios.defaults.headers.common['Authorization']
// }

// isAuthenticated() {
//   return !!window.localStorage.getItem('loginToken')
// }
