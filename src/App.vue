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
    const res = await fetch(Url)
    .catch((err) => console.log(err));
    if (!res) {
      this.$store.commit('setData', ['error']);
    } else {
      const data = await res.json();
      this.$store.commit('setData', data);
      setTimeout(() => {
        this.$store.commit('setList');
      }, 2000)
    }
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
</style>
