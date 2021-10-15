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
    const items = [...store.state.data.productRequests];
    if (items.length > 1) {
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
    } else {
        return items
    }
}

const roadmapSet = (list) => {
    const tallyUp = (type) => {
        const data = list.filter(item => item.status === type);
        return data.length;
    }
    store.state.roadmap = {
        planned: tallyUp('planned'),
        inProgress: tallyUp('in-progress'),
        live: tallyUp('live')
    }
}

export const store = new Vuex.Store({
    state: {
        toggleMobileMenu: false,
        toggleSortByDropdown: false,
        sortCategory: 'all',
        sortBy: 'Most Upvotes',
        data: ['loading'],
        list: [],
        feedbackSelect: [],
        roadmap: {
            planned: 0,
            inProgress: 0,
            live: 0
        }
    },
    mutations: {
        toggleMobileMenu (state) {
            state.toggleMobileMenu = !state.toggleMobileMenu
        },
        toggleSortByDropdown (state, value) {
            state.toggleSortByDropdown = value
        },
        setSortCategory (state, value) {
            state.sortCategory = value;
        },
        setSortBy (state, value) {
            state.sortBy = value
        },
        setData (state, value) {
            state.data = value;
            const SavedList = JSON.stringify(value);
            localStorage.setItem("FeedbackList", SavedList);
            console.log('Data Updated');
            roadmapSet(value.productRequests);
        },
        setList (state) {
            state.list = outputList()
        },
        setFeedbackSelect (state, value) {
            state.feedbackSelect = value;
        }
    }
});