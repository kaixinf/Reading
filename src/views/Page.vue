<template>
 <div>
    <nav aria-label="Page navigation">
    <ul class="pagination">
      <li v-for="(num,index) in 7" :key="index" :class="{active:page==num}"  @click="getPage(num)">
        {{num}} 
      </li>
      <li @click="nextPage">下一页</li>
    </ul>
  </nav>
 </div>
</template>
<script>
export default {
  data(){
   return {
      page:1
   }
  },
  methods:{
    getPage(n){
       this.page=n //控制颜色变化
      //  this.$store.state.num=n
       this.$emit('sendPage',n) //传递值给父组件 (lists)
    },
    nextPage(){
      this.page=this.page+1
      this.getPage(this.page)
    }
  }


}
</script>>
<style>
nav{
  text-align: center;
  margin-top: 40px;
}
nav .pagination{
  margin: 0 auto;
}
.pagination>li{
  padding: 10px 10px;
  cursor: default;
}
.pagination>li>a{
    color: #B6B6B6;
    background-color: #fff;
    border: none;
    background: #f6f6f6;
}
.pagination>li.active{
  color: #c33!important;
}

</style>