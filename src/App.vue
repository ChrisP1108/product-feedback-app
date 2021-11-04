<template>
  <div id="nav">
    <!-- <router-link to="/"></router-link>
    <router-link to="/feedback/"></router-link> -->
  </div>
  <router-view/>
</template>

<script>
import { Url } from './Store'

export default {
  name: 'App',
  async created() { // Data Fetch Request
    const storedList = JSON.parse(localStorage.getItem("FeedbackList"));
    let data;
    const res = await fetch(Url)
    .catch((err) => console.log(err));
    const randomError = Math.ceil(Math.random() * 5);
    if (!res || res.url.includes(undefined) || randomError === 5) {
      this.$store.commit('setData', ['error']);
    } else {
      data = await res.json();
    } 
    setTimeout(() => {
      if (this.$store.state.data[0] !== 'error') {
        this.$store.commit('setData', storedList.productRequests.length !== 0 ? storedList 
          : data ? data : ['error']);
      }
    }, 2000)
  }
  
}

</script>


<style>
* {
  /* border: 1px red solid; */
}
  /* Font */

  /* font-family: 'Jost', sans-serif; */

    @import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');


  /* Colors */
    :root {
      --a: #AD1FEA;
      --b: #4661E6;
      --c: #373F68;
      --d: #FFFFFF;
      --e: #F2F4FF;
      --f: #F7F8FD;
      --g: #3A4374;
      --h: #647196;
      --i: #F49F85;
      --j: #62BCFA;
      --k: #E84D70;
      --l: #A337F6;
      --m: #28A7ED;
      --n: #79d8fb80;
      --o: #fbb47980;
      --p: #F2F4FE;
      --q: #C75AF6;
      --r: #F2F2F2;
      --s: #CFD7FF;
      --t: #8397F8;
      --u: #7C91F9;
      --v: #8C92B3;
      --w: #D73737;
      --x: #656EA3;
      --y: #E98888;
      --z: #3A437435;
      --aa: #FBB57A;
      --bb: #DEE6FF;
      --halfTrans: #00000083;
    }
  body {
    margin: 0;
    font-family: 'Jost', sans-serif!important;
    width: 100%!important;
    height: 100%!important;
  }
  #nav {
    height: 0%;
  }
  h1, h2 {
    margin: 0!important;
    padding: 0!important;
  }
  .pointer {
    cursor: pointer!important;
  }
  .ns {
    margin: 0!important;
    padding: 0!important;
  }
  .feedback-container {
    z-index: 1;
    background: var(--f);
    padding-top: 1.5rem;
    padding-bottom: 5.5rem;
    height: 100%;
    min-height: 41.6875rem!important;
  }
  .createoredit-main-container {
    z-index: 1;
    background: var(--f);
    height: 100%;
    min-height: 41.6875rem!important;
    padding-top: 1.5rem;
    padding-bottom: 4.8125rem;
  }
  .section-container {
    padding: 1.6875rem 1.75rem 1.5rem 1.5rem;
    margin: 1.5rem;
    background: var(--d);
    border-radius: 0.625rem;
    margin-bottom: 1rem;
  }
  .suggestion-item-container {
    padding: 1.6875rem 1.75rem 1.5rem 1.5rem;
    background: var(--d);
    border-radius: 0.625rem;
    margin-bottom: 1rem;
  }
  .text-field {
    width: 100%;
    border-radius: 0.3125rem;
    background: var(--f);
    border: 0;
    padding: 1rem 1.25rem;
    font-size: 0.8125rem;
    font-weight: 400;
    color: var(--g);
    height: 3rem;
  }
  .text-field:focus {
      outline: none!important;
      border: 1px var(--b) solid;
  }
  .text-area {
    height: 5rem;
  }
  .red-highlight {
    color: var(--w);
  }
  .red-border {
    border: 0.0625rem var(--w) solid;
  }
  .button-format {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    height: 2.5rem;
    border-radius: 0.625rem;
    cursor: pointer;
    transition: 0.25s;
  }
  .button-text {
    font-size: 0.8125rem;
    color: var(--p);
    font-weight: 700;
  }
  .add-feedback-button {
    background: var(--a);
  }
  .add-feedback-button:hover {
    background: var(--q);
  }
  .visible {
    visibility: visible;
  }
  .invisible {
    visibility: hidden;
  }
  .trans-fade {
    animation-name: trans-in;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }
  @keyframes trans-in {
      from {transform: translateY(4rem); opacity: 0}
      to {transform: translateY(0rem); opacity: 1}
  }
  .fade-text {
    animation-name: text-in;
    animation-duration: 0.25s;
    animation-fill-mode: forwards;
  }
  @keyframes text-in {
      from {opacity: 0}
      to {opacity: 1}
  }
  @media(min-width: 768px) {
    .button-format {
      height: 2.75rem;
      width: 9.875rem;
    }
    .button-text {
      font-size: 0.875rem!important;
    }
    .suggestion-item-container {
      padding: 1.75rem 2rem 0;
      height: 9.4375rem;
    }
    .section-container {
      padding: 1.75rem 2rem;
    }
    .feedback-container {
      padding-top: 3.5rem;
      padding-bottom: 7.5rem;
    }
    .createoredit-main-container {
      padding: 3.5rem 7.125rem 7.625rem;
    }
    .text-field {
      font-size: 0.9375rem;
    }
  }
</style>
