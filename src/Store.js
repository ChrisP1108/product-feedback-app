import Vuex from 'vuex'

export const store = new Vuex.Store({
    state: {
        toggleMobileMenu: false,
        sortCategory: 'All'
    },
    mutations: {
        toggleMobileMenu (state) {
            state.toggleMobileMenu = !state.toggleMobileMenu
        },
        setSortCategory (state, value) {
            state.sortCategory = value
        }
    }
});