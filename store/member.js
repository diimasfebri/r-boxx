// deklarasi variabel global
export const state = () => {
  return {
    NIK: '',
    name: '',
    rewards: null,
  }
}

// ambil data ke variabel
export const getters = {
  NIK(state) {
    return state.nik
  },
  name(state) {
    return state.name
  },
  rewards(state) {
    return state.rewards
  },
}

// modifikasi atau merubah data
export const mutations = {
  SET_NIK(state, nik) {
    state.nik = nik
  },
  SET_NAME(state, name) {
    state.name = name
  },
  SET_REWARDS(state, rewards) {
    state.rewards = rewards
  },
}

// memberi aksi pada variabel fungsi, parameter "commit" untuk memanggil mutations & parameter "getters" demikian pula
export const actions = {
  setNIK({ commit }, nik) {
    commit('SET_NIK', nik)
  },
  setName({ commit }, name) {
    commit('SET_NAME', name)
  },
  setRewards({ commit }, rewards) {
    commit('SET_REWARDS', rewards)
  },

<<<<<<< HEAD
  async daftar({ dispatch }, { name, nik }) {
=======
  async daftar({ dispatch }, { name, NIK, rewards }) {
>>>>>>> 0d9c3a64e5dc1fc65289dd48b1fb1ce6ae09eacc
    try {
      const { data } = await this.$axios.post(
        'http://localhost:8000/members/newmember',
        {
          name,
<<<<<<< HEAD
          nik,
=======
          NIK,
          rewards,
>>>>>>> 0d9c3a64e5dc1fc65289dd48b1fb1ce6ae09eacc
        }
      )
      if (data.message !== 'SUCCESS') throw new Error(data.message)
      dispatch('setnik', data.nik)
      dispatch('setNAME', data.name)
      return { message: 'SUCCESS' }
    } catch (e) {
      return { message: e.message }
    }
  },

  async masuk({ dispatch }, { nik }) {
    try {
      const { data } = await this.$axios.post(
        'http://localhost:8000/members/memberinput',
        {
          nik,
        }
      )
      if (data.message !== 'SUCCESS') throw new Error(data.message)
      console.log(data)
      // dispatch('setNIK', data.NIK)
      return { message: 'SUCCESS' }
    } catch (e) {
      return { message: e.message }
    }
  },

  logout({ commit }) {
    commit('SET_ID_USER', '')
    commit('SET_AVATAR', '')
    commit('SET_NAME', '')
  },
}
