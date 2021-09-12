import Vuex from 'vuex'

export const Url = 'https://raw.githubusercontent.com/ChrisP1108/product-feedback-app/main/data.json';

export const store = new Vuex.Store({
    state: {
        toggleMobileMenu: false,
        toggleSortByModal: false,
        sortCategory: 'All',
        sortBy: 'Most Upvotes',
        data: ['loading']
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
        },
        setData (state, value) {
            state.data = value
        }
    }
});
