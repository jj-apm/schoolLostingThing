import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
    SET_AUTHENTICATED: 'SET_AUTHENTICATED',
    SET_USER: 'SET_USER'
}

const state = {
    isAuthenticated: false,
    user: {},
    count: 0
}

const getters = {
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user,
    count: state => state.count

}

const mutations = {
    [types.SET_AUTHENTICATED](state, isAuthenticated) {
        if (isAuthenticated) state.isAuthenticated = isAuthenticated
        else state.isAuthenticated = false
    },
    [types.SET_USER](state, user) {
        if (user) state.user = user
        else state.user = false
    },
    editCount(state, num) {
        state.count += num
    }
}

const actions = {
    setAuthenticated: ({ commit }, isAuthenticated) => {
        commit(types.SET_AUTHENTICATED, isAuthenticated)
    },
    setUser: ({ commit }, user) => {
        commit(types.SET_USER, user)
    },
    clearCurrentState: ({ commit }) => {
        commit(types.SET_AUTHENTICATED, false)
        commit(types.SET_USER, null)
    },
    getCount(context, num) {
        context.commit('editCount', num)
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
})