import API from '~/core/api'

export const state = () => ({
  searchAll: [],
  result: undefined
})

export const getters = {
  getSearchAll: (state) => state.searchAll,
  getResult: (state) => state.result,
}

export const mutations = {
  SET_FILMS(state, payload) {
    state.searchAll = [...state.searchAll, ...payload]
  },

  SET_STARSHIPS(state, payload) {
    state.searchAll = [...state.searchAll, ...payload]
  },

  SET_PEOPLE(state, payload) {
    state.searchAll = [...state.searchAll, ...payload]
  },

  SET_PLANETS(state, payload) {
    state.searchAll = [...state.searchAll, ...payload]
  },

  SET_RESULT(state, payload) {
    state.result = payload
  }

}

export const actions = {
  async fetchAllInfo({ commit }) {

    await API.starships.get('starships').then(( { data } ) => {
      const formatedArray = [];
      data.results.map((item) => {
        const list = {
          value: item.name,
          link: item.url
        }
        return formatedArray.push(list)
      })
      commit('SET_STARSHIPS', formatedArray)
    })

    await API.people.get('people').then(( { data } ) => {
      const formatedArray = [];
      data.results.map((item) => {
        const list = {
          value: item.name,
          link: item.url
        }
        return formatedArray.push(list)
      })
      commit('SET_PEOPLE', formatedArray)
    })

    await API.planets.get('planets').then(( { data } ) => {
      const formatedArray = [];
      data.results.map((item) => {
        const list = {
          value: item.name,
          link: item.url
        }
        return formatedArray.push(list)
      })
      commit('SET_PLANETS', formatedArray)
    })

    await API.films.get('films').then(( { data } ) => {
      const formatedArray = [];
      data.results.map((item) => {
        const list = {
          value: item.title,
          link: item.url
        }
        return formatedArray.push(list)
      })
      commit('SET_FILMS', formatedArray)
    })
  },

  async fetchInfoAfterSearch({ commit }, { slug }) {
    await API.search.get(slug).then(( { data } ) => {
      commit('SET_RESULT', data)
    })
  }
}
