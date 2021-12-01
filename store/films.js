import API from '~/core/api'

export const state = () => ({
  films: [],
  currentFilms: undefined
})

export const getters = {
  getFilms: (state) => state.films,
  getCurrentFilm: (state) => state.currentFilms
}

export const mutations = {
  SET_FILMS(state, payload) {
    state.films = payload
  },
  SET_CURRENT_FILMS(state, payload) {
    state.currentFilms = payload
  },
  DELETE_CURRENT_FILMS(state, payload) {
    state.currentFilms = undefined
  }
}

export const actions = {
  async fetchFilms({ commit }) {
    await API.films.get('films').then(( { data } ) => {
      commit('SET_FILMS', data.results)
    })
  },
  async getFilmsBySlug({ commit }, slug) {
    await API.films.get(`films/${slug}`).then(( { data } ) => {
      commit('SET_CURRENT_FILMS', data)
    })
  },
}
