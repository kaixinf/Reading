<template>
  <div id="app">
    <Tab></Tab>
    <router-view/>
    <Footer></Footer>
  </div>
</template>
<script>
import Tab from './components/Tab'
import Footer from './components/Footer'
export default {
  components:{
    Tab,
    Footer
  }
}
</script>
