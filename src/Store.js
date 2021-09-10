import Vuex from 'vuex'

export const store = new Vuex.Store({
    state: {
        toggleMobileMenu: false,
        toggleSortByModal: false,
        sortCategory: 'All',
        sortBy: 'Most Upvotes'
    },
    mutations: {
        toggleMobileMenu (state) {
            state.toggleMobileMenu = !state.toggleMobileMenu
        },
        toggleSortByModal (state) {
            state.toggleSortByModal = !state.toggleSortByModal
        },
        setSortCategory (state, value) {
            state.sortCategory = value
        },
        setSortBy (state, value) {
            state.sortBy = value
        }
    }
});