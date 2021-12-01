import API from '~/core/api'

export const state = () => ({
  people: [],
  currentPeople: undefined
})

export const getters = {
  getPeople: (state) => state.people,
  getCurrentPeople: (state) => state.currentPeople
}

export const mutations = {
  SET_FILMS(state, payload) {
    state.people = payload
  },
  SET_CURRENT_PEOPLE(state, payload) {
    state.currentPeople = payload
  }
}

export const actions = {
  async fetchPeople({ commit }) {
    await API.people.get('people').then(( { data } ) => {
      commit('SET_PEOPLE', data.results)
    })
  },
  async getFilmsBySlug({ commit }, slug) {
    await API.people.get(`people/${slug}`).then(( { data } ) => {
      commit('SET_CURRENT_PEOPLE', data)
    })
  },
}
