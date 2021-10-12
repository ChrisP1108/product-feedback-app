<template>
    <div class="createoredit-container">
        <div :class="[isNew ? 'new-icon' : 'edit-icon', 'icon-position']"></div>
        <h1>{{isNew ? 'Create New Feedback' : 'Edit Feedback'}}</h1>
        <h2>Feedback Title</h2>
        <p>Add a short, descriptive headline</p>
        <input type="text" @keyup="(e) => titleTyping(e)" maxlength="50"
            :value="feedbackData.title" :class="[titleEmpty && 'red-border', 
            'text-field']">
        <h4 v-if="titleEmpty">Can't be empty</h4>
        <h2>Category</h2>
        <p>Choose a category for your feedback</p>
        <div @click="toggleCategoryDropdown()" 
            class="category-option-container">
                <div class="text-field category-option">
                    <span>{{ feedbackData.category }}</span>
                    <div :class="[categoryToggle && 'category-arrow-icon-active', 
                    'category-arrow-icon']"></div>
                </div>
                <div class="category-dropdown">
                    <DropdownSelect @loaded="categorySelected" v-if="categoryToggle" :list="categoryChoices" />
                </div>
        </div>
        <h2>Feedback Detail</h2>
        <p>Include any specific comments on what should be improved,
            added, etc.
        </p>
        <textarea @keyup="(e) => descriptionTyping(e)" 
            maxlength="250" :value="feedbackData.description" 
            :class="[descriptionEmpty && 'red-border', 
            'text-field text-area']">
        </textarea>
        <h4 v-if="descriptionEmpty">Can't be empty</h4>
        <div @click="createFeedback()"
            class="add-feedback-button button-margin-top">
                <h3>Add Feedback</h3>
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
        props: {
            type: String
        },
        computed: {
            route() {
                return this.$router.currentRoute.value.fullPath
            },
            productData() {
                return (this.$store.state.data.productRequests)
            }
        },
        data() {
            return {
                isNew: false,
                titleEmpty: false,
                descriptionEmpty: false,
                categoryToggle: false,
                feedbackData: {
                    id: null,
                    title: '',
                    category: 'Feature',
                    upvotes: 0,
                    status: 'Suggestion',
                    description: ''
                },
                categoryChoices: [
                    {
                        text: 'Feature',
                        selected: true
                    },
                    {
                        text: 'UI',
                        selected: false
                    },
                    {
                        text: 'UX',
                        selected: false
                    },
                    {
                        text: 'Enhancement',
                        selected: false
                    },
                    {
                        text: 'Bug',
                        selected: false
                    }
                ],
                updateStatusChoices: [
                    {
                        text: 'Suggestion',
                        selected: false
                    },
                    {
                        text: 'Planned',
                        selected: false
                    },
                    {
                        text: 'In-Progress',
                        selected: false
                    },
                    {
                        text: 'Live',
                        selected: false
                    }
                ]
            }
        },
        methods: {
            titleTyping(e) {
                if (this.feedbackData.title) {
                    this.titleEmpty = false;
                }
                const input = e.target.value;
                this.feedbackData.title = input;
                console.log(this.feedbackData);
            },
            descriptionTyping(e) {
                if (this.feedbackData.description) {
                    this.descriptionEmpty = false;
                }
                const input = e.target.value;
                this.feedbackData.description = input;
                console.log(this.feedbackData)
            },
            toggleCategoryDropdown() {
                this.categoryToggle = !this.categoryToggle;
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
                console.log('Post Successful')
            }
        },
        created() {
            if (this.route === '/feedback/new') {
                this.isNew = true;
                let idTally = 0;
                this.productData.forEach(() => {
                    idTally++;
                });
                this.feedbackData.id = idTally + 1;
                this.categorySelected('Feature');  
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
        background-image: url('../assets/shared/icon-new-feedback.svg');
    }
    .edit-icon {
        background-image: url('../assets/shared/icon-edit-feedback.svg');
    }
    .icon-position {
        position: absolute;
        top: -1.75rem;
        left: 0.95rem;
        transform: scale(0.71428);
        height: 3.5rem;
        width: 3.5rem;
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
        margin-top: 2.5rem!important
    }
</style>