<template>
    <div class="createoredit-container">
        <div :class="[isNew ? 'new-icon' : 'edit-icon', 'icon-position']"></div>
        <h1>{{isNew ? 'Create New Feedback' : 'Edit Feedback'}}</h1>
        <h2>Feedback Title</h2>
        <p>Add a short, descriptive headline</p>
        <input type="text" @keyup="(e) => titleTyping(e)" 
            :value="feedbackData.title" class="text-bottom-margin text-field">
        <h2>Category</h2>
        <p>Choose a category for your feedback</p>
        <DropdownSelect :list="categoryChoices" />
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
                feedbackData: {
                    id: null,
                    title: '',
                    category: 'Feature',
                    upvotes: 0,
                    status: 'Suggestion',
                    description: '',
                    comments: []
                },
                categoryChoices: [
                    {
                        text: 'Feature',
                        selected: false
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
                updateStatusCHoices: [
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
        created() {
            if (this.route === '/feedback/new') {
                this.isNew = true;
                let idTally = 0;
                this.productData.forEach(() => {
                    idTally++;
                });
                this.feedbackData.id = idTally + 1;
                console.log(this.feedbackData);
            }     
        },
        methods: {
            titleTyping(e) {
                const input = e.target.value;
                this.characters = input.length;
                this.limit = 250 - this.characters;
                this.feedbackData.title = input;
            }
        }
    }
</script>

<style scoped>
    .createoredit-container {
        padding: 3rem 1.75rem 1.5rem 1.5rem;
        margin: 3.75rem 1.5rem 1.5rem 1.5rem;
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
        margin: 0 0 1.875rem!important;
        transition: 0.25s;
    }
    h2 {
        font-size: 0.8125rem;
        color: var(--g);
        font-weight: 700;
        letter-spacing: -0.0112rem;
        margin-bottom: 0.5rem!important;
        transition: 0.25s;
    }
    p {
        font-size: 0.8125rem;
        margin: 0.75re 0 0.75rem 0;
        color: var(--h);
    }
    .text-bottom-margin {
        margin-bottom: 1.75rem;
    }
</style>