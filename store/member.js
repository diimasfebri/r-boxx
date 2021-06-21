// deklarasi variabel global
export const state = () => {
  return {
    NIK: '',
    name: '',
  }
}

// ambil data ke variabel
export const getters = {
  NIK(state) {
    return state.NIK
  },
  name(state) {
    return state.name
  },
}

// modifikasi atau merubah data
export const mutations = {
  SET_NIK(state, NIK) {
    state.NIK = NIK
  },
  SET_NAME(state, name) {
    state.name = name
  },
}

// memberi aksi pada variabel fungsi, parameter "commit" untuk memanggil mutations & parameter "getters" demikian pula
export const actions = {
  setNIK({ commit }, NIK) {
    commit('SET_NIK', NIK)
  },
  setName({ commit }, name) {
    commit('SET_NAME', name)
  },

  async daftar({ dispatch }, { name, NIK }) {
    try {
      const { data } = await this.$axios.post(
        'http://localhost:8000/members/newmember',
        {
          NIK,
          name,
        }
      )
      if (data.message !== 'SUCCESS') throw new Error(data.message)
      console.log(data)
      return { message: 'SUCCESS' }
    } catch (e) {
      return { message: e.message }
    }
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
      console.log(data)
      dispatch('setIdUser', data.user)
      dispatch('setAvatar', data.avatar)
      dispatch('setName', data.name)
      return { message: 'SUCCESS' }
    } catch (e) {
      console.log(e)
      return { message: e.message }
    }
  },

  logout({ commit }) {
    commit('SET_ID_USER', '')
    commit('SET_AVATAR', '')
    commit('SET_NAME', '')
  },
}
