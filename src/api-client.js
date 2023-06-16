import axios from 'axios'


const address = 'https://fabcal.eu.pythonanywhere.com'

class Client {
  constructor() {
    this.token = null
    this.username = null
    this.pk = null
  }

  isLoggedIn() {
    return !!this.token && !!this.username
  }

  setUserData(data) {
    this.token = data?.token
    this.username = data?.username
    this.pk = data?.pk
  }

}

export const client = new Client();


export async function loginApi(data) {
  let response = await axios.post(`${address}/dj-rest-auth/login/`, {
      username: data.username,
      password: data.password,
    }, 
  ) .then(async login_res => {
    let user_res = await axios.get(`${address}/dj-rest-auth/user/`, {
      headers: {
        Authorization: `Token ${login_res.data.key}`
      }
    })
    .then(user_res => {
      client.setUserData({
        token: login_res.data.key,
        username: user_res.data.username,
        pk:  user_res.data.pk
      })
      return user_res
    }) .catch(err => {
      return err.response
    })
    return user_res
  }) .catch(err => {
    return err.response
  })

  return await response
}


export async function registrationApi(data) {

  let response = await axios.post(`${address}/dj-rest-auth/registration/`, {
      username: data.username,
      password1: data.password1,
      password2: data.password2,
    }, 
  ) .then(async reg_res => {
      return reg_res
    })
    .catch(err => {
    return err.response
  })

  return await response
}


 export async function logoutApi() {
  let response = await axios.post(`${address}/dj-rest-auth/logout/`, {}, 
  { 
    withCredentials: true, 
  })
  .then((res) => {
    client.setUserData({
      token: null,
      username: null,
      pk: null,
    })
    return res
  })
  .catch(err => {
    console.log(err.response.data)
    return err.response
  })
  return response
}

 export function addEventApi({token, data}) {
  return axios.post(`${address}/events/`, data, {
    headers: {
      Authorization: `Token ${token}`
    },   
  })
}

export function updateEventApi({token, username, id, data}) {
  return axios.put(`${address}/events/${username}/${id}/`, data, {
    headers: {
      Authorization: `Token ${token}`
    },   
  })
}

export function deleteEventApi({token, username, id}) {
  console.info(token)
  return axios.delete(`${address}/events/${username}/${id}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },   
  })
}

export function getEventsApi(username, token) {
  return axios.get(`${address}/events/${username}`, {
    headers: {
      Authorization: `Token ${token}`
    },
  })
}

