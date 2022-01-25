<template>
  <!-- <Login/> -->
  <Home/>
</template>

<script>
import Home from './views/Home.vue'
import Login from './views/Login.vue'

export default {
  name: 'App',
  components: {
    Login,
    Home
  }
}
</script>
