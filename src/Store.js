import Vuex from 'vuex'

export const store = new Vuex.Store({
    state: {
        toggleMobileMenu: false
    },
    mutations: {
        toggleMobileMenu (state) {
            state.toggleMobileMenu = !state.toggleMobileMenu
        }
    }
});