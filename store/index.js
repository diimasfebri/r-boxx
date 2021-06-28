import Cookies from 'js-cookie'

// deklarasi variabel global
export const state = () => {
  return {
    idUser: null,
    name: null,
    token: null,
    role: null,
  }
}

// ambil data ke variabel
export const getters = {
  token(state) {
    return state.token
  },
  role(state) {
    return state.role
  },
  name(state) {
    return state.name
  },
  idUser(state) {
    return state.idUser
  },
}

// modifikasi atau merubah data
export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_ID_USER(state, newidUser) {
    state.idUser = newidUser
  },
  SET_ROLE(state, role) {
    state.role = role
  },
  SET_NAME(state, name) {
    state.name = name
  },
}

// memberi aksi pada variabel fungsi, parameter "commit" untuk memanggil mutations & parameter "getters" demikian pula
export const actions = {
  setIdUser({ commit }, idUser) {
    commit('SET_ID_USER', idUser)
  },
  setRole({ commit }, role) {
    commit('SET_ROLE', role)
  },
  setName({ commit }, name) {
    commit('SET_NAME', name)
  },
  setToken({ commit }, token) {
    commit('SET_TOKEN', token)
  },
  async refreshToken({ commit, dispatch, getters }) {
    try {
      const { token } = getters
      const { $axios, $config } = this
      const { data } = await $axios.post(
        `${$config.apiURL}/users/refresh-token`,
        { token }
      )
      if (data.message !== 'SUCCESS') throw new Error(data)
      const { token: newToken, role, username } = data
      commit('SET_TOKEN', newToken)
      commit('SET_ROLE', role)
      commit('SET_USERNAME', username)
      Cookies.set('token', newToken)
      return { message: 'SUCCESS' }
    } catch (e) {
      dispatch('logout')
      dispatch(
        'alerts/add',
        {
          type: 'error',
          message: 'Logged out',
        },
        {
          root: true,
        }
      )
    }
  },

  async login({ commit }, { username, password }) {
    try {
      const { data } = await this.$axios.post(
        'http://localhost:8000/users/signin',
        {
          username,
          password,
        }
      )
      if (data.message !== 'SUCCESS') throw new Error(data.message)
      const { role, token, name } = data
      commit('setToken', token)
      commit('setName', name)
      commit('setRole', role)
      Cookies.set('token', token)
      return { message: 'SUCCESS' }
    } catch (e) {
      console.log(e)
      return { message: e.message }
    }
  },

  async signup({ dispatch }, { name, username, password, role }) {
    try {
      const { data } = await this.$axios.post(
        'http://localhost:8000/users/signup',
        {
          name,
          username,
          password,
          role,
        }
      )
      if (data.message !== 'SUCCESS') throw new Error(data.message)
      return { message: 'SUCCESS' }
    } catch (e) {
      return { message: e.message }
    }
  },

  logout({ commit }) {
    Cookies.remove('token')
    commit('SET_TOKEN', null)
    commit('SET_ID_USER', '')
    commit('SET_ROLE', '')
    commit('SET_NAME', '')
  },
}
