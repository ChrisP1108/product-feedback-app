<template>
    <div class="createoredit-container">
        <div :class="[isNew ? 'new-icon' : 'edit-icon']"></div>
        <h1>{{isNew ? 'Create New Feedback' : 'Edit Feedback'}}</h1>
        <h2>Feedback Title</h2>
        <p>Add a short, descriptive headline</p>
        <div>
            <input type="text" @keyup="(e) => titleTyping(e)" maxlength="50"
                :value="feedbackData.title" :class="[titleEmpty && 'red-border', 
                'text-field']">
            <h4 v-if="titleEmpty">Can't be empty</h4>
        </div>
        <h2>Category</h2>
        <p>Choose a category for your feedback</p>
        <div @click="toggleCategoryDropdown()" 
            class="category-option-container">
                <div class="text-field category-option">
                    <span>{{ capitalizer(feedbackData.category) }}</span>
                    <div :class="[categoryToggle && 'category-arrow-icon-active', 
                    'category-arrow-icon']"></div>
                </div>
                <div class="category-dropdown">
                    <DropdownSelect @loaded="categorySelected" v-if="categoryToggle" :list="categoryChoices" />
                </div>
        </div>
        <div v-if="!isNew">
            <h2>Update Status</h2>
            <p>Change feature state</p>
            <div v-if="!isNew" @click="toggleUpdateStatusDropdown()" 
                class="category-option-container">
                    <div class="text-field category-option">
                        <span>{{ capitalizer(feedbackData.status) }}</span>
                        <div :class="[updateStatusToggle && 'category-arrow-icon-active', 
                        'category-arrow-icon']"></div>
                    </div>
                    <div class="category-dropdown">
                        <DropdownSelect @loaded="updateStatusSelected" v-if="updateStatusToggle" :list="updateStatusChoices" />
                    </div>
            </div>
        </div>
        <h2>Feedback Detail</h2>
        <p>Include any specific comments on what should be improved,
            added, etc.
        </p>
        <div>
            <textarea @keyup="(e) => descriptionTyping(e)" 
                maxlength="250" :value="feedbackData.description" 
                :class="[descriptionEmpty && 'red-border', 
                'text-field text-area']">
            </textarea>
            <h4 v-if="descriptionEmpty">Can't be empty</h4>
        </div>
        <div v-if="modified" @click="isNew ? createFeedback() : changeFeedback('update')"
            class="button-format add-feedback-button button-margin-top">
                <h3>{{isNew ? 'Add Feedback' : 'Save Changes'}}</h3>
        </div>
        <div @click="goBack()"
            class="button-format cancel-button">
                <h3>Cancel</h3>
        </div>
        <div v-if="!isNew" @click="changeFeedback('delete')"
            class="button-format delete-button">
                <h3>Delete</h3>
        </div>
    </div> 
</template>

<script>
    import DropdownSelect from './DropdownSelect';

    export default {
        name: 'CreateOrEditFeedback',
        components: {
            DropdownSelect
        },
        computed: {
            route() {
                return this.$router.currentRoute.value.fullPath
            },
            productData() {
                return (this.$store.state.data.productRequests)
            },
            feedbackSelect() {
                return this.$store.state.feedbackSelect;
            }
        },
        data() {
            return {
                isNew: false,
                titleEmpty: false,
                descriptionEmpty: false,
                categoryToggle: false,
                updateStatusToggle: false,
                modified: false,
                feedbackData: {
                    id: null,
                    title: '',
                    category: 'feature',
                    upvotes: 0,
                    status: 'suggestion',
                    description: ''
                },
                categoryChoices: [
                    {
                        text: 'feature',
                        selected: true
                    },
                    {
                        text: 'ui',
                        selected: false
                    },
                    {
                        text: 'ux',
                        selected: false
                    },
                    {
                        text: 'enhancement',
                        selected: false
                    },
                    {
                        text: 'bug',
                        selected: false
                    }
                ],
                updateStatusChoices: [
                    {
                        text: 'suggestion',
                        selected: false
                    },
                    {
                        text: 'planned',
                        selected: false
                    },
                    {
                        text: 'in-progress',
                        selected: false
                    },
                    {
                        text: 'live',
                        selected: false
                    }
                ]
            }
        },
        methods: {
            capitalizer(item) {
                if (item === 'ux' || item === 'ui') {
                    return item.toUpperCase();
                } else {
                    return item.charAt(0).toUpperCase() + item.slice(1);
                }
            },
            titleTyping(e) {
                if (this.feedbackData.title) {
                    this.titleEmpty = false;
                }
                this.modified = true;
                const input = e.target.value;
                this.feedbackData.title = input;
            },
            descriptionTyping(e) {
                if (this.feedbackData.description) {
                    this.descriptionEmpty = false;
                }
                this.modified = true;
                const input = e.target.value;
                this.feedbackData.description = input;
            },
            toggleCategoryDropdown() {
                this.categoryToggle = !this.categoryToggle;
                if (this.updateStatusToggle) {
                    this.updateStatusToggle = !this.updateStatusToggle;
                }
                this.modified = true;
            },
            toggleUpdateStatusDropdown() {
                this.updateStatusToggle = !this.updateStatusToggle;
                if (this.categoryToggle) {
                    this.categoryToggle = !this.categoryToggle;
                }
                this.modified = true; 
            },
            categorySelected(type) {
                this.feedbackData.category = type;
                for (let i = 0; i < this.categoryChoices.length; i++) {
                    if (this.categoryChoices[i].text === type) {
                        this.categoryChoices[i].selected = true;
                    } else {
                        this.categoryChoices[i].selected = false;
                    }
                }
            },
            updateStatusSelected(type) {
                this.feedbackData.status = type;
                for (let i = 0; i < this.updateStatusChoices.length; i++) {
                    if (this.updateStatusChoices[i].text === type) {
                        this.updateStatusChoices[i].selected = true;
                    } else {
                        this.updateStatusChoices[i].selected = false;
                    }
                }
            },
            goBack() {
                this.$router.go(-1);
            },
            createFeedback() {
                if (!this.feedbackData.title && !this.feedbackData.description) {
                    this.titleEmpty = true;
                    this.descriptionEmpty = true;
                    return
                }
                if (!this.feedbackData.title) {
                    this.titleEmpty = true;
                    return
                }
                if (!this.feedbackData.description) {
                    this.descriptionEmpty = true;
                    return
                }
                const data = {...this.$store.state.data}
                data.productRequests.push(this.feedbackData);
                this.$store.commit('setData', data);
                this.$store.commit('setList');
                this.goBack();
            },
            changeFeedback(type) {
                const data = {...this.$store.state.data};
                const index = data.productRequests.findIndex(i => i.id === this.feedbackData.id);
                if (type === 'update') {
                    data.productRequests.splice(index, 1, this.feedbackData);
                } else {
                    data.productRequests.splice(index, 1);
                }
                this.$store.commit('setFeedbackSelect', this.feedbackData);
                this.$store.commit('setData', data);
                this.$store.commit('setList');
                if (type === 'update') {
                    this.goBack();
                } else {
                    this.$router.push('/');
                }
            },
        },
        created() {
            if (this.route === '/feedback/new') {
                this.isNew = true;
                let idTally = 0;
                this.productData.forEach(() => {
                    idTally++;
                });
                this.feedbackData.id = idTally + 1;
                this.categorySelected('feature');  
            } else {
                this.feedbackData = this.feedbackSelect;
                this.updateStatusSelected(this.feedbackData.status);
            }
        }
    }
</script>

<style scoped>
    .createoredit-container {
        padding: 3rem 1.75rem 1.5rem 1.5rem;
        margin: 2.5rem 1.5rem 1.5rem 1.5rem;
        background: var(--d);
        border-radius: 0.625rem;
        margin-bottom: 1rem;
        position: relative;
    }
    .new-icon {
        position: absolute;
        top: -1.75rem;
        left: 0.95rem;
        transform: scale(0.71428);
        height: 3.5rem;
        width: 3.5rem;
        background-image: url('../assets/shared/icon-new-feedback.svg');
    }
    .edit-icon {
        position: absolute;
        top: -1.25rem;
        left: 1.5rem;
        height: 2.5rem;
        width: 2.5rem;
        background-image: url('../assets/shared/icon-edit-feedback.svg');
    }
    h1 {
        font-size: 1.125rem;
        color: var(--g);
        font-weight: 700;
        letter-spacing: -0.0112rem;
        margin: 0;
        transition: 0.25s;
    }
    h2 {
        font-size: 0.8125rem;
        color: var(--g);
        font-weight: 700;
        letter-spacing: -0.0112rem;
        margin: 1.75rem 0 0.5rem!important;
        transition: 0.25s;
    }
    h3 {
        font-size: 0.8125rem;
        color: var(--p);
        font-weight: 700;
        margin: 0;
    }
    h4 {
        font-size: 0.8125rem;
        font-weight: 400;
        margin: 0.5rem 0 0;
        color: var(--w);
        position: absolute;
        z-index: 0;
    }
    p {
        font-size: 0.8125rem;
        margin: 0.75re 0 0.75rem 0;
        color: var(--h);
    }
    .category-option-container {
        cursor: pointer;
        position: relative;
        width: 100%;
    }
    .category-option {
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .category-dropdown {
        width: 100%;
        position: absolute;
        top: -0.5rem;
    }
    .category-arrow-icon {
        background-image: url('../assets/shared/icon-arrow-down.svg');
        width: 0.625rem;
        height: 0.4375rem;
        margin-left: 0.4375rem;
        transition: 0.5s;
    }
    .category-arrow-icon-active {
        transform: rotateX(-180deg);
    }
    .button-margin-top {
        margin-top: 2.5rem!important;
    }
    .cancel-button {
        margin-top: 1rem;
        background: var(--g);
    }
    .cancel-button:hover {
        background: var(--x);
    }
    .delete-button {
        margin-top: 1rem;
        background: var(--w);
    }
    .delete-button:hover {
        background: var(--y);
    }
    textarea {
        margin-bottom: -7px;
    }
    .hidden {
        z-index: -1;
        transition: 1s;
    }
</style>