import API from '~/core/api'

export const state = () => ({
  starships: [],
  currentStarship: undefined
})

export const getters = {
  getStarships: (state) => state.films,
  getCurrentStarship: (state) => state.currentStarship
}

export const mutations = {
  SET_STARSHIPS(state, payload) {
    state.starships = payload
  },
  SET_CURRENT_STARSHIP(state, payload) {
    state.currentPlanet = payload
  }
}

export const actions = {
  async fetchStarships({ commit }) {
    await API.starships.get('starships').then(( { data } ) => {
      commit('SET_STARSHIPS', data.results)
    })
  },
  async getFilmsBySlug({ commit }, slug) {
    await API.starships.get(`starships/${slug}`).then(( { data } ) => {
      commit('SET_CURRENT_STARSHIP', data)
    })
  },
}
