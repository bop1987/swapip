import API from '~/core/api'

export const state = () => ({
  planets: [],
  currentPlanet: undefined
})

export const getters = {
  getFilms: (state) => state.planets,
  getCurrentPlanet: (state) => state.currentPlanet
}

export const mutations = {
  SET_PLANETS(state, payload) {
    state.planets = payload
  },
  SET_CURRENT_PLANET(state, payload) {
    state.currentPlanet = payload
  }
}

export const actions = {
  async fetchPlanets({ commit }) {
    await API.planets.get('planets').then(( { data } ) => {
      commit('SET_PLANETS', data.results)
    })
  },
  async getFilmsBySlug({ commit }, slug) {
    await API.planets.get(`planets/${slug}`).then(( { data } ) => {
      commit('SET_CURRENT_PLANET', data)
    })
  },
}
