// deklarasi variabel global
export const state = () => {
  return {
    members: null,
    NIK: null,
    name: null,
    rewards: null,
    transaction: null,
  }
}

// ambil data ke variabel
export const getters = {
  members(state) {
    return state.members
  },
  NIK(state) {
    return state.nik
  },
  name(state) {
    return state.name
  },
  rewards(state) {
    return state.rewards
  },
  transaction(state) {
    return state.transaction
  },
}

// modifikasi atau merubah data
export const mutations = {
  SET_MEMBERS(state, members) {
    state.members = members
  },
  PUSH_MEMBERS(state, data) {
    const { members } = state
    const newMembers = JSON.parse(JSON.stringify(members))
    newMembers.push(...data)
    state.members = newMembers
  },
  SET_NIK(state, nik) {
    state.nik = nik
  },
  SET_NAME(state, name) {
    state.name = name
  },
  SET_REWARDS(state, rewards) {
    state.rewards = rewards
  },
  SET_TRANSACTION(state, transaction) {
    state.transaction = transaction
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

  async load({ commit }, { reset }) {
    try {
      const { $axios } = this
      const { data } = await $axios.get(`http://localhost:8000/members/`)
      if (data.message !== 'SUCCESS') throw new Error(data.message)
      const {
        payload: { members },
      } = data
      if (reset) commit('SET_MEMBERS', members)
      else commit('PUSH_MEMBERS', members)
      commit(
        'SET_NIK',
        NIK.map((a) => a._id)
      )
      commit(
        'SET_NAME',
        name.filter((a) => a._id).map((a) => a._id)
      )
      commit(
        'SET_REWARDS',
        rewards.filter((a) => a._id).map((a) => a._id)
      )
      commit(
        'SET_TRANSACTION',
        transaction.filter((a) => a._id).map((a) => a._id)
      )
      return { message: 'SUCCESS' }
    } catch (e) {
      return { message: e.message }
    }
  },

  // bikin member baru
  async daftar({ dispatch }, { name, NIK }) {
    try {
      const { data } = await this.$axios.post(
        'http://localhost:8000/members/newmember',
        {
          name,
          NIK,
        }
      )
      if (data.message !== 'SUCCESS') throw new Error(data.message)
      dispatch('setNIK', data.nik)
      dispatch('setNAME', data.name)
      return { message: 'SUCCESS' }
    } catch (e) {
      return { message: e.message }
    }
  },

  // cari member
  async cari({ dispatch }, { nik }) {
    try {
      const { data } = await this.$axios.post(
        `http://localhost:8000/members/memberinput`,
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

  // edit member
  async sunting(member) {
    const { data } = await this.$axios.put(
      `http://localhost:8000/members/memberedit`,
      member
    )
    if (data.message === 'SUCCESS') {
      console.log(data)
    }
  },

  // hapus member
  async delete({ dispatch }, id) {
    try {
      const { $axios, $config } = this
      const { data } = await $axios.delete(`${$config.apiURL}/${id}`)
      if (data.message !== 'SUCCESS') throw new Error(data.message)
      dispatch(
        'alerts/add',
        {
          type: 'success',
          message: 'Data berhasil dihapus!',
        },
        { root: true }
      )
      return { message: 'SUCCESS' }
    } catch (e) {
      dispatch(
        'alerts/add',
        {
          type: 'error',
          message: e.message,
        },
        {
          root: true,
        }
      )
      return { message: e.message }
    }
  },

  logout({ commit }) {
    commit('SET_ID_USER', '')
    commit('SET_AVATAR', '')
    commit('SET_NAME', '')
  },
}
