// deklarasi variabel global
export const state = () => {
  return {
    name: '',
    role: '',
  }
}

// ambil data ke variabel
export const getters = {
  role(state) {
    return state.role
  },
  name(state) {
    return state.name
  },
}

// modifikasi atau merubah data
export const mutations = {
  SET_ROLE(state, role) {
    state.role = role
  },
  SET_NAME(state, name) {
    state.name = name
  },
}

// memberi aksi pada variabel fungsi, parameter "commit" untuk memanggil mutations & parameter "getters" demikian pula
export const actions = {
  setRole({ commit }, role) {
    commit('SET_ROLE', role)
  },
  setName({ commit }, name) {
    commit('SET_NAME', name)
  },

  async login({ dispatch }, { username, password }) {
    try {
      const { data } = await this.$axios.post(
        'http://localhost:8000/users/signin',
        {
          username,
          password,
        }
      )
      if (data.message !== 'SUCCESS') throw new Error(data.message)
      dispatch('setRole', data.role)
      dispatch('setName', data.name)

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
    commit('SET_ROLE', '')
    commit('SET_NAME', '')
  },
}
