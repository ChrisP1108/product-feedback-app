import Vuex from 'vuex'

export const Url = 'https://raw.githubusercontent.com/ChrisP1108/product-feedback-app/main/data.json';

const commentCounter = (comment) => {
    let tally = 0;
    if (!comment) {
        return 0;
    }
    comment.forEach((item) => {
        tally++;
        if ('replies' in item) {
            item.replies.forEach(() => {
                tally++;
            });
        }
    });
    return tally;
}

const outputList = () => {
    const items = store.state.data.productRequests.slice();
    const sorted = items.sort((a,b) => {
        if (store.state.sortBy === 'Most Upvotes') {
            return b.upvotes - a.upvotes
        }
        if (store.state.sortBy === 'Least Upvotes') {
            return a.upvotes - b.upvotes
        }
        if (store.state.sortBy === 'Most Comments') {
            return commentCounter(b.comments) - commentCounter(a.comments)
        }
        if (store.state.sortBy === 'Least Comments') {
            return commentCounter(a.comments) - commentCounter(b.comments)
        }
    });
    const output = store.state.sortCategory === 'all' 
        ? sorted : sorted.filter(item => 
        item.category === store.state.sortCategory
    );
    return output
}

export const store = new Vuex.Store({
    state: {
        toggleMobileMenu: false,
        toggleSortByModal: false,
        sortCategory: 'all',
        sortBy: 'Most Upvotes',
        data: ['loading'],
        list: []
    },
    mutations: {
        toggleMobileMenu (state) {
            state.toggleMobileMenu = !state.toggleMobileMenu
        },
        toggleSortByModal (state) {
            state.toggleSortByModal = !state.toggleSortByModal
        },
        setSortCategory (state, value) {
            state.sortCategory = value;
        },
        setSortBy (state, value) {
            state.sortBy = value
        },
        setData (state, value) {
            state.data = value
        },
        setList (state) {
            state.list = outputList()
        }
    }
});